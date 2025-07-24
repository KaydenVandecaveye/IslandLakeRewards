import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type ShopProps = {
    userData: any; 
};

const Shop: React.FC<ShopProps> = ({ userData }) => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const limitedTimeDeals = deals.filter(deal => deal.type === 'limited');
    const permanentDeals = deals.filter(deal => deal.type === 'permanent');

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await fetch('http://localhost:5002/deal');
                const data = await res.json();
                console.log("Fetched deals data: ", data);
                setDeals(data);
                setLoading(false);
            }
            catch(e) {
                console.error("Error fetching deals: ", e);
            }
        };
        fetchDeals();
    }, []);

    if (loading) return <Text>Loading...</Text>;

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

// deal type
type Deal = {
  id: string;
  title: string;
  description: string;
  price: number;
  expiresAt: any;
  type: 'permanent' | 'limited';
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

export default Shop;

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
