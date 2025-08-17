import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

type CheckoutItem = {
  id: string;
  name: string;
  flavour: string;
  toppings: string[];
  choice3: string;
  comments: string;
  quantity: number;
  price: number;
  unitPrice: number;
};

export default function Checkout() {
  const { selectedItems } = useLocalSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    if (selectedItems) {
      try {
        const parsed: CheckoutItem[] = JSON.parse(selectedItems as string);
        const merged: CheckoutItem[] = [];

        parsed.forEach((item) => {
          const existingIndex = merged.findIndex(
            (i) =>
              i.name === item.name &&
              i.flavour === item.flavour &&
              i.choice3 === item.choice3 &&
              i.comments === item.comments &&
              JSON.stringify(i.toppings.sort()) === JSON.stringify(item.toppings.sort())
          );

          if (existingIndex >= 0) {
            const existing = merged[existingIndex];
            const newQty = existing.quantity + item.quantity;
            merged[existingIndex] = {
              ...existing,
              quantity: newQty,
              price: +(existing.unitPrice * newQty).toFixed(2),
            };
          } else {
            merged.push({ ...item, unitPrice: item.unitPrice || item.price });
          }
        });

        setItems(merged);
      } catch (err) {
        console.error("Invalid selectedItems JSON:", err);
      }
    }
  }, [selectedItems]);

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      {items.length === 0 ? (
        <Text style={styles.emptyText}>No items to checkout.</Text>
      ) : (
        <ScrollView style={styles.rowsContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.itemCol}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetail}>Flavour: {item.flavour || "-"}</Text>
                <Text style={styles.itemDetail}>
                  Toppings: {item.toppings.length > 0 ? item.toppings.join(", ") : "-"}
                </Text>
                <Text style={styles.itemDetail}>Choice3: {item.choice3 || "-"}</Text>
                {item.comments ? (
                  <Text style={styles.itemDetail}>Comments: {item.comments}</Text>
                ) : null}
                <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
              </View>
              <Text style={styles.totalCol}>₱{item.price.toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {items.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.totalText}>Total: ₱{totalAmount.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.placeOrderBtn}
            onPress={() => {
              router.push("/profile/profile"); // Redirect after successful checkout
            }}
          >
            <Text style={styles.placeOrderText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, color: "#5A4634" },
  emptyText: { textAlign: "center", marginTop: 20, fontStyle: "italic", color: "#5A4634" },
  rowsContainer: { flex: 1, paddingTop: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6D5B8",
  },
  itemCol: { flex: 3 },
  totalCol: { flex: 1, textAlign: "right", fontWeight: "600", color: "#5A4634" },
  itemName: { fontWeight: "700", color: "#5A4634", marginBottom: 2 },
  itemDetail: { fontSize: 12, color: "#5A4634" },
  summaryContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E6D5B8",
  },
  totalText: { fontSize: 18, fontWeight: "700", color: "#5A4634", marginBottom: 10 },
  placeOrderBtn: {
    backgroundColor: "#D4A373",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  placeOrderText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
