import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useCart } from "../CartContext";

export default function Cart() {
  const { cartItems, updateQuantity } = useCart();

  const formatItemDetails = (item: typeof cartItems[number]) => (
    <>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetail}>Flavour: {item.flavour || "-"}</Text>
      <Text style={styles.itemDetail}>
        Toppings: {item.toppings.length > 0 ? item.toppings.join(", ") : "-"}
      </Text>
      <Text style={styles.itemDetail}>Choice3: {item.choice3 || "-"}</Text>
      {item.comments ? (
        <Text style={styles.itemDetail}>Comments: {item.comments}</Text>
      ) : null}
    </>
  );

  const incrementQty = (id: string, currentQty: number) => {
    updateQuantity(id, currentQty + 1);
  };

  const decrementQty = (id: string, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartBox}>
        <Text style={styles.title}>Donut Basket</Text>

        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.itemCol]}>ITEM</Text>
          <Text style={[styles.headerText, styles.priceCol]}>Price</Text>
          <Text style={[styles.headerText, styles.qtyCol]}>Quantity</Text>
          <Text style={[styles.headerText, styles.totalCol]}>Total</Text>
        </View>

        <ScrollView style={styles.rowsContainer}>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          ) : (
            cartItems.map((item) => (
              <View key={item.id} style={styles.row}>
                <View style={[styles.itemCol]}>
                  {formatItemDetails(item)}
                </View>
                <Text style={[styles.priceCol]}>₱{item.price.toFixed(2)}</Text>
                <View style={[styles.qtyCol, styles.qtyControls]}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => decrementQty(item.id, item.quantity)}
                  >
                    <Text style={styles.qtyButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => incrementQty(item.id, item.quantity)}
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.totalCol]}>
                  ₱{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Check out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    padding: 20,
  },
  cartBox: {
    flex: 1,
    backgroundColor: "#FAF3E0",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5A4634",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E6D5B8",
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5A4634",
  },
  itemCol: {
    flex: 2,
  },
  priceCol: {
    flex: 1,
    textAlign: "center",
  },
  qtyCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyControls: {
    gap: 10,
  },
  totalCol: {
    flex: 1,
    textAlign: "center",
  },
  rowsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6D5B8",
  },
  itemName: {
    fontWeight: "700",
    color: "#5A4634",
    marginBottom: 2,
  },
  itemDetail: {
    fontSize: 12,
    color: "#5A4634",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#5A4634",
    fontStyle: "italic",
  },
  checkoutContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  checkoutBtn: {
    backgroundColor: "#D4A373",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#D2B48C",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 16,
  },
  qtyText: {
    minWidth: 20,
    textAlign: "center",
    fontWeight: "600",
    color: "#5A4634",
  },
});
