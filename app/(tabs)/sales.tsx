
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface Sale {
  id: number;
  date: string;
  time: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastVisit: string;
}

export default function SalesScreen() {
  const [activeTab, setActiveTab] = useState<'sales' | 'customers'>('sales');

  // Données simulées des ventes
  const [sales] = useState<Sale[]>([
    {
      id: 1,
      date: '2024-01-15',
      time: '10:30',
      customerName: 'Marie Dupont',
      items: [
        { name: 'Tomates Bio', quantity: 2, price: 3.50 },
        { name: 'Lait Local', quantity: 1, price: 1.50 }
      ],
      total: 8.50,
      paymentMethod: 'card'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '09:15',
      customerName: 'Jean Martin',
      items: [
        { name: 'Pâtes Barilla', quantity: 3, price: 1.80 },
        { name: 'Conserves', quantity: 2, price: 2.50 }
      ],
      total: 10.40,
      paymentMethod: 'cash'
    },
    {
      id: 3,
      date: '2024-01-15',
      time: '08:45',
      customerName: 'Sophie Bernard',
      items: [
        { name: 'Carottes Bio', quantity: 1, price: 2.80 },
        { name: 'Œufs Fermiers', quantity: 1, price: 3.20 }
      ],
      total: 6.00,
      paymentMethod: 'mobile'
    }
  ]);

  // Données simulées des clients
  const [customers] = useState<Customer[]>([
    { id: 1, name: 'Marie Dupont', email: 'marie.dupont@email.com', phone: '06 12 34 56 78', totalPurchases: 245.80, lastVisit: '2024-01-15' },
    { id: 2, name: 'Jean Martin', email: 'jean.martin@email.com', phone: '06 98 76 54 32', totalPurchases: 189.50, lastVisit: '2024-01-15' },
    { id: 3, name: 'Sophie Bernard', email: 'sophie.bernard@email.com', phone: '06 11 22 33 44', totalPurchases: 156.20, lastVisit: '2024-01-15' },
    { id: 4, name: 'Pierre Durand', email: 'pierre.durand@email.com', phone: '06 55 66 77 88', totalPurchases: 298.75, lastVisit: '2024-01-14' },
    { id: 5, name: 'Claire Moreau', email: 'claire.moreau@email.com', phone: '06 99 88 77 66', totalPurchases: 134.90, lastVisit: '2024-01-13' },
  ]);

  const todaysSales = sales.filter(sale => sale.date === '2024-01-15');
  const todaysRevenue = todaysSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageBasket = todaysRevenue / todaysSales.length || 0;

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'cash': return 'banknote';
      case 'card': return 'creditcard';
      case 'mobile': return 'phone';
      default: return 'questionmark';
    }
  };

  const getPaymentColor = (method: string) => {
    switch (method) {
      case 'cash': return colors.success;
      case 'card': return colors.accent;
      case 'mobile': return colors.secondary;
      default: return colors.textSecondary;
    }
  };

  const handleNewSale = () => {
    Alert.alert('Nouvelle Vente', 'Interface de vente à implémenter');
  };

  const handleViewSale = (saleId: number) => {
    Alert.alert('Détails Vente', `Affichage des détails de la vente ID: ${saleId}`);
  };

  const handleViewCustomer = (customerId: number) => {
    Alert.alert('Profil Client', `Affichage du profil client ID: ${customerId}`);
  };

  const handleAddCustomer = () => {
    Alert.alert('Nouveau Client', 'Formulaire d\'ajout de client à implémenter');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Gestion des Ventes",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.card,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Pressable onPress={activeTab === 'sales' ? handleNewSale : handleAddCustomer} style={{ marginRight: 16 }}>
              <IconSymbol name="plus" size={24} color={colors.card} />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={commonStyles.content}>
          {/* Onglets */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'sales' && styles.activeTab]}
              onPress={() => setActiveTab('sales')}
            >
              <Text style={[styles.tabText, activeTab === 'sales' && styles.activeTabText]}>
                Ventes
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'customers' && styles.activeTab]}
              onPress={() => setActiveTab('customers')}
            >
              <Text style={[styles.tabText, activeTab === 'customers' && styles.activeTabText]}>
                Clients
              </Text>
            </Pressable>
          </View>

          {activeTab === 'sales' ? (
            <>
              {/* Statistiques des ventes */}
              <View style={styles.statsContainer}>
                <View style={[commonStyles.card, styles.statCard]}>
                  <Text style={[commonStyles.metricValue, { fontSize: 24 }]}>€{todaysRevenue.toFixed(2)}</Text>
                  <Text style={commonStyles.metricLabel}>Chiffre d'Affaires Aujourd'hui</Text>
                </View>
                <View style={[commonStyles.card, styles.statCard]}>
                  <Text style={[commonStyles.metricValue, { fontSize: 24, color: colors.secondary }]}>
                    {todaysSales.length}
                  </Text>
                  <Text style={commonStyles.metricLabel}>Ventes Aujourd'hui</Text>
                </View>
              </View>

              <View style={[commonStyles.card, styles.statCard, { marginBottom: 24 }]}>
                <Text style={[commonStyles.metricValue, { fontSize: 20, color: colors.accent }]}>
                  €{averageBasket.toFixed(2)}
                </Text>
                <Text style={commonStyles.metricLabel}>Panier Moyen</Text>
              </View>

              {/* Liste des ventes */}
              <View style={commonStyles.section}>
                <Text style={commonStyles.subtitle}>Ventes Récentes</Text>
                {sales.map(sale => (
                  <Pressable
                    key={sale.id}
                    style={[commonStyles.card, styles.saleCard]}
                    onPress={() => handleViewSale(sale.id)}
                  >
                    <View style={styles.saleHeader}>
                      <View>
                        <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                          Vente #{sale.id.toString().padStart(4, '0')}
                        </Text>
                        <Text style={commonStyles.textSecondary}>
                          {sale.date} à {sale.time}
                        </Text>
                      </View>
                      <View style={styles.saleAmount}>
                        <Text style={[commonStyles.text, { fontSize: 18, fontWeight: 'bold', color: colors.primary }]}>
                          €{sale.total.toFixed(2)}
                        </Text>
                        <View style={[styles.paymentBadge, { backgroundColor: getPaymentColor(sale.paymentMethod) }]}>
                          <IconSymbol name={getPaymentIcon(sale.paymentMethod) as any} size={12} color={colors.card} />
                        </View>
                      </View>
                    </View>

                    <View style={styles.customerInfo}>
                      <IconSymbol name="person.fill" size={16} color={colors.textSecondary} />
                      <Text style={[commonStyles.textSecondary, { marginLeft: 6 }]}>
                        {sale.customerName}
                      </Text>
                    </View>

                    <View style={styles.itemsList}>
                      {sale.items.map((item, index) => (
                        <Text key={index} style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                          • {item.quantity}x {item.name} (€{(item.quantity * item.price).toFixed(2)})
                        </Text>
                      ))}
                    </View>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* Statistiques clients */}
              <View style={styles.statsContainer}>
                <View style={[commonStyles.card, styles.statCard]}>
                  <Text style={[commonStyles.metricValue, { fontSize: 24 }]}>{customers.length}</Text>
                  <Text style={commonStyles.metricLabel}>Total Clients</Text>
                </View>
                <View style={[commonStyles.card, styles.statCard]}>
                  <Text style={[commonStyles.metricValue, { fontSize: 24, color: colors.secondary }]}>
                    €{(customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length).toFixed(0)}
                  </Text>
                  <Text style={commonStyles.metricLabel}>Panier Moyen Client</Text>
                </View>
              </View>

              {/* Liste des clients */}
              <View style={commonStyles.section}>
                <Text style={commonStyles.subtitle}>Clients Fidèles</Text>
                {customers
                  .sort((a, b) => b.totalPurchases - a.totalPurchases)
                  .map(customer => (
                    <Pressable
                      key={customer.id}
                      style={[commonStyles.card, styles.customerCard]}
                      onPress={() => handleViewCustomer(customer.id)}
                    >
                      <View style={styles.customerHeader}>
                        <View style={styles.customerAvatar}>
                          <Text style={styles.customerInitials}>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </Text>
                        </View>
                        <View style={styles.customerInfo}>
                          <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                            {customer.name}
                          </Text>
                          <Text style={commonStyles.textSecondary}>{customer.email}</Text>
                          <Text style={commonStyles.textSecondary}>{customer.phone}</Text>
                        </View>
                        <View style={styles.customerStats}>
                          <Text style={[commonStyles.text, { fontSize: 16, fontWeight: 'bold', color: colors.primary }]}>
                            €{customer.totalPurchases.toFixed(2)}
                          </Text>
                          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                            Dernière visite: {customer.lastVisit}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.card,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 16,
  },
  saleCard: {
    marginBottom: 12,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  saleAmount: {
    alignItems: 'flex-end',
  },
  paymentBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemsList: {
    marginTop: 8,
  },
  customerCard: {
    marginBottom: 12,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  customerInitials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.card,
  },
  customerStats: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
});
