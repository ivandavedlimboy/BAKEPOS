import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const router = useRouter();

  const items = [
    { id: 1, title: "CLASSIC", route: "/home/classic" },
    { id: 2, title: "PARTY SET", route: "/home/partyset" },
    { id: 3, title: "OPTION 3" },
  ];

  return isMobile ? (
    <ScrollView contentContainerStyle={styles.mobileContainer}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.card, { width: "100%" }]}
          onPress={() => item.route && router.push(item.route as any)}
        >
          <View style={styles.imagePlaceholder} />
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.desktopContainer}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.card,
            { width: width * 0.45, marginRight: 20 },
          ]}
          onPress={() => item.route && router.push(item.route as any)}
        >
          <View style={styles.imagePlaceholderLarge} />
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    padding: 10,
  },
  desktopContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imagePlaceholder: {
    width: "100%",
    height: 240,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginBottom: 10,
  },
  imagePlaceholderLarge: {
    width: "100%",
    height: 320,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
