import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CartProvider } from "./CartContext"; // Adjust path if your CartContext is elsewhere
import React from "react";

export default function PortalLayout() {
  const router = useRouter();

  const Header = () => (
    <View style={styles.header}>
      {/* Adjust logo image */}
      <View style={styles.logoSphere} />
      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push("/home/home")}>
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/about")}>
          <Text style={styles.linkText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/menu")}>
          <Text style={styles.linkText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile/profile")}>
          <Text style={styles.linkText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/(portal)/login")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <CartProvider>
      <Stack screenOptions={{ header: () => <Header /> }} />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FAF3E0",
    borderBottomWidth: 1,
    borderBottomColor: "#E6D5B8",
  },
  logoSphere: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D2B48C",
  },
  links: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 80,
    gap: 28,
  },
  linkText: {
    fontSize: 16,
    color: "#5A4634",
  },
  loginBtn: {
    backgroundColor: "#D4A373",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  loginText: {
    color: "#FFF8F0",
    fontWeight: "600",
  },
});
