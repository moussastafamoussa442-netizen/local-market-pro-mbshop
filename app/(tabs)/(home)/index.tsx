
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  // Données simulées pour le tableau de bord
  const dashboardData = {
    totalSales: 15420,
    todaySales: 1250,
    totalProducts: 342,
    lowStockItems: 12,
    totalCustomers: 89,
    newCustomers: 5,
  };

  const recentActivities = [
    { id: 1, type: 'sale', description: 'Vente de produits locaux', amount: 45.50, time: '10:30' },
    { id: 2, type: 'stock', description: 'Réapprovisionnement tomates', amount: null, time: '09:15' },
    { id: 3, type: 'customer', description: 'Nouveau client inscrit', amount: null, time: '08:45' },
    { id: 4, type: 'sale', description: 'Vente produits manufacturés', amount: 78.20, time: '08:20' },
  ];

  const quickActions = [
    { id: 1, title: 'Nouvelle Vente', icon: 'plus.circle.fill', color: colors.primary },
    { id: 2, title: 'Ajouter Produit', icon: 'bag.fill', color: colors.secondary },
    { id: 3, title: 'Inventaire', icon: 'list.clipboard.fill', color: colors.accent },
    { id: 4, title: 'Clients', icon: 'person.2.fill', color: colors.primary },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return 'cart.fill';
      case 'stock': return 'cube.box.fill';
      case 'customer': return 'person.badge.plus';
      default: return 'circle.fill';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "SuperMarché Local",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.card,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView style={[commonStyles.container]} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={commonStyles.content}>
          {/* Métriques principales */}
          <View style={styles.metricsContainer}>
            <View style={[commonStyles.card, styles.metricCard]}>
              <View style={commonStyles.metric}>
                <Text style={commonStyles.metricValue}>€{dashboardData.totalSales.toLocaleString()}</Text>
                <Text style={commonStyles.metricLabel}>Ventes Totales</Text>
              </View>
            </View>
            <View style={[commonStyles.card, styles.metricCard]}>
              <View style={commonStyles.metric}>
                <Text style={[commonStyles.metricValue, { color: colors.secondary }]}>€{dashboardData.todaySales}</Text>
                <Text style={commonStyles.metricLabel}>Ventes Aujourd'hui</Text>
              </View>
            </View>
          </View>

          <View style={styles.metricsContainer}>
            <View style={[commonStyles.card, styles.metricCard]}>
              <View style={commonStyles.metric}>
                <Text style={[commonStyles.metricValue, { color: colors.accent }]}>{dashboardData.totalProducts}</Text>
                <Text style={commonStyles.metricLabel}>Produits en Stock</Text>
              </View>
            </View>
            <View style={[commonStyles.card, styles.metricCard]}>
              <View style={commonStyles.metric}>
                <Text style={[commonStyles.metricValue, { color: colors.error }]}>{dashboardData.lowStockItems}</Text>
                <Text style={commonStyles.metricLabel}>Stock Faible</Text>
              </View>
            </View>
          </View>

          {/* Actions rapides */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Actions Rapides</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <Pressable key={action.id} style={[commonStyles.card, styles.quickActionCard]}>
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <IconSymbol name={action.icon as any} size={24} color={colors.card} />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Activités récentes */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Activités Récentes</Text>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={[commonStyles.card, styles.activityCard]}>
                <View style={styles.activityIcon}>
                  <IconSymbol name={getActivityIcon(activity.type) as any} size={20} color={colors.primary} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={commonStyles.text}>{activity.description}</Text>
                  <Text style={commonStyles.textSecondary}>{activity.time}</Text>
                </View>
                {activity.amount && (
                  <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                    €{activity.amount.toFixed(2)}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Statistiques clients */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Clients</Text>
            <View style={[commonStyles.card, styles.customerStats]}>
              <View style={commonStyles.row}>
                <View>
                  <Text style={commonStyles.text}>Total Clients</Text>
                  <Text style={[commonStyles.metricValue, { fontSize: 24 }]}>{dashboardData.totalCustomers}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={commonStyles.textSecondary}>Nouveaux aujourd'hui</Text>
                  <Text style={[commonStyles.text, { color: colors.secondary, fontWeight: '600', fontSize: 18 }]}>
                    +{dashboardData.newCustomers}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  customerStats: {
    paddingVertical: 20,
  },
});
