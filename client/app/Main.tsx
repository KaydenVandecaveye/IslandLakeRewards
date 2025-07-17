import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Profile from "../components/tabs/Profile";
import Shop from "../components/tabs/Shop";

export default function Main() {
  const [currentTab, setCurrentTab] = useState<'profile' | 'shop'>('profile');

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
