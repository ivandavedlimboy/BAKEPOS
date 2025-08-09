import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Cart() {
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

        <View style={styles.rowsContainer}>
          {/* Rows for cart items go here */}
        </View>

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
    textAlign: "center",
  },
  totalCol: {
    flex: 1,
    textAlign: "center",
  },
  rowsContainer: {
    flex: 1,
    paddingTop: 10,
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
});
