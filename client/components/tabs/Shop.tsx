import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// placeholder for fetched deal data
const deals = [
  {
    id: '29102912910',
    title: 'Holiday Voucher',
    description: 'Limited edition, valid for one free round.',
    price: 300,
    expiresAt: '2025-07-30',
    type: 'limited'
  },
  {
    id: '29102912911',
    title: '50% Off Glove',
    description: 'Today only!',
    price: 150,
    expiresAt: null,
    type: 'permanent'
  },
  {
    id: '29102912912',
    title: 'Golf Ball Pack',
    description: 'Set of 12 premium balls.',
    price: 100,
    expiresAt: '2025-07-30',
    type: 'limited'
  },
  {
    id: '29102912913',
    title: 'Free Weekend Voucher',
    description: 'Valid for one weekend round.',
    price: 250,
    expiresAt: null,
    type: 'permanent'
  },
];

const limitedTimeDeals = deals.filter(deal => deal.type === 'limited');
const permanentDeals = deals.filter(deal => deal.type === 'permanent');

export default function Shop() {
  return (
    <View style={styles.main}>
      <Text style={styles.header}>Shop</Text>
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.sectionTitle}>⏰ Limited-Time Deals</Text>
        {limitedTimeDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}

        <Text style={styles.sectionTitle}>🏷️ Permanent Deals</Text>
        {permanentDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </ScrollView>
    </View>
  );
}

type Deal = {
  id: string;
  title: string;
  description: string;
  price: number;
  expiresAt: string;
};

const DealCard = ({ deal }: { deal: Deal }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{deal.title}</Text>
    <Text style={styles.description}>{deal.description}</Text>
    <Text style={styles.price}>Price: {deal.price} pts</Text>
    {deal.expiresAt !== null && 
        <Text>
            Expires on {deal.expiresAt}
        </Text>
    }


    <TouchableOpacity
      style={styles.redeemButton}
      onPress={() => console.log(`Redeemed ${deal.title}`)}
    >
      <Text style={styles.redeemButtonText}>Redeem</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F8F9FB',
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    fontWeight: '500',
  },
  redeemButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
