
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const userInfo = {
    name: "Gérant SuperMarché",
    email: "gerant@supermarche-local.fr",
    role: "Propriétaire",
    storeInfo: {
      name: "SuperMarché des Produits Locaux",
      address: "123 Rue de la République, 75001 Paris",
      phone: "01 23 45 67 89",
      siret: "12345678901234",
    }
  };

  const menuItems = [
    {
      id: 1,
      title: "Paramètres du Magasin",
      subtitle: "Informations générales, horaires",
      icon: "building.2.fill",
      color: colors.primary,
      action: () => Alert.alert("Paramètres", "Configuration du magasin")
    },
    {
      id: 2,
      title: "Gestion des Utilisateurs",
      subtitle: "Employés, permissions",
      icon: "person.2.fill",
      color: colors.secondary,
      action: () => Alert.alert("Utilisateurs", "Gestion des employés")
    },
    {
      id: 3,
      title: "Rapports et Analyses",
      subtitle: "Statistiques, exports",
      icon: "chart.bar.fill",
      color: colors.accent,
      action: () => Alert.alert("Rapports", "Génération de rapports")
    },
    {
      id: 4,
      title: "Fournisseurs",
      subtitle: "Contacts, commandes",
      icon: "truck.box.fill",
      color: colors.primary,
      action: () => Alert.alert("Fournisseurs", "Gestion des fournisseurs")
    },
    {
      id: 5,
      title: "Sauvegarde & Sync",
      subtitle: "Données, cloud",
      icon: "icloud.fill",
      color: colors.secondary,
      action: () => Alert.alert("Sauvegarde", "Configuration de la sauvegarde")
    },
    {
      id: 6,
      title: "Support & Aide",
      subtitle: "Documentation, contact",
      icon: "questionmark.circle.fill",
      color: colors.accent,
      action: () => Alert.alert("Support", "Centre d'aide")
    },
  ];

  const quickStats = [
    { label: "Ventes Aujourd'hui", value: "€1,250", color: colors.primary },
    { label: "Produits Actifs", value: "342", color: colors.secondary },
    { label: "Clients Fidèles", value: "89", color: colors.accent },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profil & Paramètres",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.card,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={commonStyles.content}>
          {/* Informations utilisateur */}
          <View style={[commonStyles.card, styles.userCard]}>
            <View style={styles.userAvatar}>
              <IconSymbol name="person.fill" size={40} color={colors.card} />
            </View>
            <View style={styles.userInfo}>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: 'bold' }]}>
                {userInfo.name}
              </Text>
              <Text style={commonStyles.textSecondary}>{userInfo.role}</Text>
              <Text style={commonStyles.textSecondary}>{userInfo.email}</Text>
            </View>
          </View>

          {/* Informations du magasin */}
          <View style={[commonStyles.card, styles.storeCard]}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 12 }]}>
              Informations du Magasin
            </Text>
            <View style={styles.storeInfo}>
              <View style={styles.storeInfoRow}>
                <IconSymbol name="building.2" size={16} color={colors.textSecondary} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>
                  {userInfo.storeInfo.name}
                </Text>
              </View>
              <View style={styles.storeInfoRow}>
                <IconSymbol name="location" size={16} color={colors.textSecondary} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8, flex: 1 }]}>
                  {userInfo.storeInfo.address}
                </Text>
              </View>
              <View style={styles.storeInfoRow}>
                <IconSymbol name="phone" size={16} color={colors.textSecondary} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>
                  {userInfo.storeInfo.phone}
                </Text>
              </View>
              <View style={styles.storeInfoRow}>
                <IconSymbol name="doc.text" size={16} color={colors.textSecondary} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>
                  SIRET: {userInfo.storeInfo.siret}
                </Text>
              </View>
            </View>
          </View>

          {/* Statistiques rapides */}
          <View style={styles.quickStatsContainer}>
            {quickStats.map((stat, index) => (
              <View key={index} style={[commonStyles.card, styles.statCard]}>
                <Text style={[commonStyles.metricValue, { fontSize: 20, color: stat.color }]}>
                  {stat.value}
                </Text>
                <Text style={[commonStyles.metricLabel, { textAlign: 'center' }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Menu des paramètres */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Paramètres & Outils</Text>
            {menuItems.map(item => (
              <Pressable
                key={item.id}
                style={[commonStyles.card, styles.menuItem]}
                onPress={item.action}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <IconSymbol name={item.icon as any} size={20} color={colors.card} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {item.title}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {item.subtitle}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>

          {/* Actions rapides */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Actions Rapides</Text>
            <View style={styles.quickActionsContainer}>
              <Pressable
                style={[commonStyles.card, styles.quickAction]}
                onPress={() => Alert.alert("Export", "Export des données")}
              >
                <IconSymbol name="square.and.arrow.up" size={24} color={colors.primary} />
                <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
                  Exporter Données
                </Text>
              </Pressable>
              <Pressable
                style={[commonStyles.card, styles.quickAction]}
                onPress={() => Alert.alert("Sauvegarde", "Sauvegarde manuelle")}
              >
                <IconSymbol name="icloud.and.arrow.up" size={24} color={colors.secondary} />
                <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
                  Sauvegarder
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Version et informations */}
          <View style={[commonStyles.card, styles.versionCard]}>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              SuperMarché Manager v1.0.0
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 12, marginTop: 4 }]}>
              Dernière mise à jour: 15 janvier 2024
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  storeCard: {
    marginBottom: 16,
  },
  storeInfo: {
    gap: 8,
  },
  storeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    minWidth: 120,
  },
  versionCard: {
    marginTop: 16,
    paddingVertical: 16,
  },
});
