import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../CartContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleOrderNow = () => {
    const itemsToCheckout = cartItems.filter((item) => selectedItems.includes(item.id));
    router.push({
      pathname: "../checkout",
      params: { selectedItems: JSON.stringify(itemsToCheckout) },
    });
  };

  const renderItem = ({ item }: { item: typeof cartItems[0] }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.cartItem, isSelected && styles.selectedCartItem]}
        activeOpacity={0.8}
        onPress={() => toggleSelect(item.id)}
      >
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemName}>{item.name}</Text>
          <Text style={styles.cartItemDetails}>
            Flavour: {item.flavour || "-"} | Qty: {item.quantity} | Total: ₱{(item.price * item.quantity).toFixed(2)}
          </Text>
          {item.toppings.length > 0 && (
            <Text style={styles.cartItemDetails}>Toppings: {item.toppings.join(", ")}</Text>
          )}
          {item.choice3 && (
            <Text style={styles.cartItemDetails}>Choice3: {item.choice3}</Text>
          )}
          {item.comments && (
            <Text style={styles.cartItemDetails}>Comments: {item.comments}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => {
            if (item.quantity > 1) {
              updateQuantity(item.id, item.quantity - 1);
            } else {
              removeFromCart(item.id);
            }
          }}
        >
          <Ionicons name="remove" size={18} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Donut Basket</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },
  cartTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5A4634",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyCart: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#5A4634",
    fontStyle: "italic",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FAF3E0",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedCartItem: {
    backgroundColor: "#E6D5B8",
  },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 16, fontWeight: "700", color: "#5A4634", marginBottom: 4 },
  cartItemDetails: { fontSize: 13, color: "#5A4634" },
  removeButton: {
    backgroundColor: "#D4A373",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  orderButton: {
    backgroundColor: "#D4A373",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  orderButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
