import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Profile from "../components/tabs/Profile";
import Shop from "../components/tabs/Shop";
import { auth, db } from '@/config/firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { getIdToken } from 'firebase/auth';

export default function Main() {
  const [currentTab, setCurrentTab] = useState<'profile' | 'shop'>('profile');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      Alert.alert("No user is signed in.");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        Alert.alert("Error", "User data does not exist");
      }
      setLoading(false);
    }, (error) => {
      console.error("onSnapshot error:", error);
      Alert.alert("Error", "Failed to load user data");
      setLoading(false);
    });

    return () => unsubscribe();

  }, [user]);

  if (loading) return <Text>Loading...</Text>;

  return (
  
    <View style={styles.container}>
      {/* Main content */}

      {currentTab === 'profile' ? <Profile userData={userData}/> : <Shop />}
      
      {/* Bottom tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, currentTab === 'profile' && styles.activeTab]}
          onPress={() => setCurrentTab('profile')}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, currentTab === 'shop' && styles.activeTab]}
          onPress={() => setCurrentTab('shop')}
        >
          <Text style={styles.tabText}>Shop</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Push content and tab bar apart
    paddingTop: 50,
    backgroundColor: '#F8F9FB'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white', 
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
