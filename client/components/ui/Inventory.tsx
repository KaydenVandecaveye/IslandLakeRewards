import React from 'react';
import { View, Text, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';

type InventoryItem = {
    id: number;
    name: string;
    description?: string;
    quantity: number;
};

type InventoryProps = {
    items: InventoryItem[];
};

// takes in an array of InventoryItems and displays them accordingly

const Inventory: React.FC<InventoryProps> = ({ items }) => {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.qty}>Quantity: {item.quantity}</Text>
              </View>

              {/* Redeem Button */}
              <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => console.log(`Redeemed ${item.name}`)}
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        </ScrollView>
      </View>
    );
};
  
export default Inventory;
  
const styles = StyleSheet.create({
    container: { },
    list: { paddingBottom: 100 },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    name: { fontSize: 16, fontWeight: '600' },
    desc: { fontSize: 14, color: '#666', marginTop: 4 },
    qty: { fontSize: 14, color: '#444', marginTop: 6 },
    
    cardContent: {
      flexDirection: 'column',
    },
    
    textContainer: {
      marginBottom: 12,
    },
    
    redeemButton: {
      backgroundColor: '#4A90E2',
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    
    redeemButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    
});