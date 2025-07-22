import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ProfileProps = {
    userData: any; 
  };
  
  const Profile: React.FC<ProfileProps> = ({ userData }) => {
    return (
      <View>
        <Text>Welcome, {userData?.email || 'User'}!</Text>
        <Text>Your points: {userData?.points}</Text>
      </View>
    );
  };
  
  export default Profile;
  