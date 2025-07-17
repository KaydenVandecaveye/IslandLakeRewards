import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Shop() {
    return(
        <View style={styles.main}>
            <Text>Shop</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#C8C8C8',
        flex: 1
    }
})