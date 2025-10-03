
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface Product {
  id: number;
  name: string;
  category: 'local' | 'manufactured';
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
}

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'local' | 'manufactured'>('all');

  // Données simulées des produits
  const [products] = useState<Product[]>([
    { id: 1, name: 'Tomates Bio Locales', category: 'local', price: 3.50, stock: 25, minStock: 10, supplier: 'Ferme Martin' },
    { id: 2, name: 'Pommes de Terre', category: 'local', price: 2.20, stock: 8, minStock: 15, supplier: 'Ferme Dubois' },
    { id: 3, name: 'Pâtes Barilla', category: 'manufactured', price: 1.80, stock: 45, minStock: 20, supplier: 'Grossiste ABC' },
    { id: 4, name: 'Lait Bio Local', category: 'local', price: 1.50, stock: 30, minStock: 12, supplier: 'Laiterie Locale' },
    { id: 5, name: 'Céréales Kelloggs', category: 'manufactured', price: 4.20, stock: 5, minStock: 10, supplier: 'Distributeur XYZ' },
    { id: 6, name: 'Carottes Bio', category: 'local', price: 2.80, stock: 18, minStock: 8, supplier: 'Ferme Martin' },
    { id: 7, name: 'Conserves Cassegrain', category: 'manufactured', price: 2.50, stock: 35, minStock: 15, supplier: 'Grossiste ABC' },
    { id: 8, name: 'Œufs Fermiers', category: 'local', price: 3.20, stock: 22, minStock: 10, supplier: 'Ferme Avicole' },
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(product => product.stock <= product.minStock);

  const getCategoryColor = (category: string) => {
    return category === 'local' ? colors.primary : colors.secondary;
  };

  const getStockStatus = (product: Product) => {
    if (product.stock <= product.minStock) {
      return { color: colors.error, text: 'Stock Faible' };
    } else if (product.stock <= product.minStock * 1.5) {
      return { color: colors.warning, text: 'Stock Moyen' };
    }
    return { color: colors.success, text: 'Stock OK' };
  };

  const handleAddProduct = () => {
    Alert.alert('Ajouter Produit', 'Fonctionnalité à implémenter');
  };

  const handleEditProduct = (productId: number) => {
    Alert.alert('Modifier Produit', `Modification du produit ID: ${productId}`);
  };

  const handleStockMovement = (productId: number, type: 'in' | 'out') => {
    const action = type === 'in' ? 'Entrée' : 'Sortie';
    Alert.alert(`${action} de Stock`, `${action} pour le produit ID: ${productId}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Gestion d'Inventaire",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.card,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Pressable onPress={handleAddProduct} style={{ marginRight: 16 }}>
              <IconSymbol name="plus" size={24} color={colors.card} />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={commonStyles.content}>
          {/* Alertes stock faible */}
          {lowStockProducts.length > 0 && (
            <View style={[commonStyles.card, styles.alertCard]}>
              <View style={styles.alertHeader}>
                <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.error} />
                <Text style={[commonStyles.text, { color: colors.error, fontWeight: '600', marginLeft: 8 }]}>
                  {lowStockProducts.length} produit(s) en stock faible
                </Text>
              </View>
              {lowStockProducts.slice(0, 3).map(product => (
                <Text key={product.id} style={[commonStyles.textSecondary, { marginTop: 4 }]}>
                  • {product.name} ({product.stock} restant)
                </Text>
              ))}
            </View>
          )}

          {/* Barre de recherche */}
          <View style={commonStyles.section}>
            <TextInput
              style={[commonStyles.input, styles.searchInput]}
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Filtres par catégorie */}
          <View style={styles.categoryFilters}>
            {[
              { key: 'all', label: 'Tous' },
              { key: 'local', label: 'Produits Locaux' },
              { key: 'manufactured', label: 'Manufacturés' }
            ].map(filter => (
              <Pressable
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedCategory === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory(filter.key as any)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === filter.key && styles.filterButtonTextActive
                ]}>
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Statistiques rapides */}
          <View style={styles.statsContainer}>
            <View style={[commonStyles.card, styles.statCard]}>
              <Text style={commonStyles.metricValue}>{products.length}</Text>
              <Text style={commonStyles.metricLabel}>Total Produits</Text>
            </View>
            <View style={[commonStyles.card, styles.statCard]}>
              <Text style={[commonStyles.metricValue, { color: colors.primary }]}>
                {products.filter(p => p.category === 'local').length}
              </Text>
              <Text style={commonStyles.metricLabel}>Produits Locaux</Text>
            </View>
            <View style={[commonStyles.card, styles.statCard]}>
              <Text style={[commonStyles.metricValue, { color: colors.error }]}>{lowStockProducts.length}</Text>
              <Text style={commonStyles.metricLabel}>Stock Faible</Text>
            </View>
          </View>

          {/* Liste des produits */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>
              Produits ({filteredProducts.length})
            </Text>
            {filteredProducts.map(product => {
              const stockStatus = getStockStatus(product);
              return (
                <View key={product.id} style={[commonStyles.card, styles.productCard]}>
                  <View style={styles.productHeader}>
                    <View style={styles.productInfo}>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>{product.name}</Text>
                      <View style={styles.productMeta}>
                        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(product.category) }]}>
                          <Text style={styles.categoryBadgeText}>
                            {product.category === 'local' ? 'Local' : 'Manufacturé'}
                          </Text>
                        </View>
                        <Text style={commonStyles.textSecondary}>€{product.price.toFixed(2)}</Text>
                      </View>
                    </View>
                    <Pressable onPress={() => handleEditProduct(product.id)} style={styles.editButton}>
                      <IconSymbol name="pencil" size={16} color={colors.accent} />
                    </Pressable>
                  </View>

                  <View style={styles.stockInfo}>
                    <View style={styles.stockDetails}>
                      <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600' }]}>
                        {product.stock} unités
                      </Text>
                      <Text style={[commonStyles.textSecondary, { color: stockStatus.color }]}>
                        {stockStatus.text}
                      </Text>
                    </View>
                    <View style={styles.stockActions}>
                      <Pressable
                        style={[styles.stockButton, { backgroundColor: colors.error }]}
                        onPress={() => handleStockMovement(product.id, 'out')}
                      >
                        <IconSymbol name="minus" size={16} color={colors.card} />
                      </Pressable>
                      <Pressable
                        style={[styles.stockButton, { backgroundColor: colors.success }]}
                        onPress={() => handleStockMovement(product.id, 'in')}
                      >
                        <IconSymbol name="plus" size={16} color={colors.card} />
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.supplierInfo}>
                    <IconSymbol name="building.2" size={14} color={colors.textSecondary} />
                    <Text style={[commonStyles.textSecondary, { marginLeft: 6 }]}>
                      {product.supplier}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: colors.highlight,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 0,
  },
  categoryFilters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.border,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  statsContainer: {
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
  productCard: {
    marginBottom: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: colors.card,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockDetails: {
    flex: 1,
  },
  stockActions: {
    flexDirection: 'row',
  },
  stockButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  supplierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
