import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Inventory from '../ui/Inventory';

type ProfileProps = {
    userData: any; 
};

// replace with fetch functionallity
const mockInventory = [
  { id: 1, name: 'Golf Ball Pack', description: 'Set of 12 balls', quantity: 2 },
  { id: 2, name: 'Free Round Voucher', description: 'Valid on weekends', quantity: 1 },
  { id: 3, name: 'Golf Glove', description: 'Size M', quantity: 1 },
];

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Profile</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userData?.email || 'N/A'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Points</Text>
          <Text style={styles.value}>{userData?.points ?? 0}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>User Number</Text>
          <Text style={styles.value}>{userData?.userNumber ?? 'N/A'}</Text>
        </View>

        <View style={{marginTop: 12}}>
          <Text style={styles.header}>Your Inventory</Text>
          <Inventory items={mockInventory}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  content: {
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});