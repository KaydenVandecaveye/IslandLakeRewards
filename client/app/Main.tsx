import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Profile from "../components/tabs/Profile";
import Shop from "../components/tabs/Shop";
import { auth } from '@/config/firebase';
import { getIdToken } from 'firebase/auth';

export default function Main() {
  const [currentTab, setCurrentTab] = useState<'profile' | 'shop'>('profile');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // check if user exists
        console.log("user", user);
        if (!user) {
          Alert.alert("No user is signed in.");
          return;
        }
        // generate and send id token to backend
        const token = await getIdToken(user);
        const response = await fetch('http://localhost:5002/user/info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        // capture data in response
        const data = await response.json();
        console.log("Data: ", data);
        setUserData(data)
      }
      catch(e) {
        console.error("Error fetching info:", e);
        Alert.alert("Error", "Could not load user data");
      }
      finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
  
    <View style={styles.container}>
      {/* Main content */}
      {currentTab === 'profile' ? <Profile /> : <Shop />}

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
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#F9F9F9', 
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: '#1e90ff',
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
