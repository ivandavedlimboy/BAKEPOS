import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/profile/cart")}
        >
          <MaterialIcons name="shopping-cart" size={48} color="#5A4634" />
          <Text style={styles.optionText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/profile/trackorder")}
        >
          <FontAwesome5 name="truck" size={44} color="#5A4634" />
          <Text style={styles.optionText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/profile/orderhistory")}
        >
          <MaterialIcons name="history" size={48} color="#5A4634" />
          <Text style={styles.optionText}>Order History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF8F0",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 40,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  option: {
    alignItems: "center",
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#5A4634",
    fontWeight: "600",
  },
});
