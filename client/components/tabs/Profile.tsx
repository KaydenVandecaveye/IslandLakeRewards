import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
    return (
        <View style={styles.main}>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#C8C8C8',
        flex: 1
    }
})