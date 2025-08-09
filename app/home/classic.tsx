import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Classic() {
  const [flavour, setFlavour] = useState("");
  const [toppings, setToppings] = useState<string[]>([]);
  const [choice3, setChoice3] = useState("");
  const [comments, setComments] = useState("");

  const toggleTopping = (item: string) => {
    setToppings((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagePlaceholder} />

        <Text style={styles.sectionTitle}>FLAVOUR</Text>
        <View style={styles.buttonRow}>
          {["Vanilla", "Chocolate"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.button,
                flavour === item && styles.selectedButton,
              ]}
              onPress={() => setFlavour(item)}
            >
              <Text
                style={[
                  styles.buttonText,
                  flavour === item && styles.selectedButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>TOPPINGS</Text>
        <View style={styles.buttonRow}>
          {["Sprinkles", "Mallows", "Powder Milk", "Crushed Oreo", "Almonds"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.button,
                  toppings.includes(item) && styles.selectedButton,
                ]}
                onPress={() => toggleTopping(item)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    toppings.includes(item) && styles.selectedButtonText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text style={styles.sectionTitle}>CHOICE 3</Text>
        <View style={styles.buttonRow}>
          {["Option1", "Option2", "Option3"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.button,
                choice3 === item && styles.selectedButton,
              ]}
              onPress={() => setChoice3(item)}
            >
              <Text
                style={[
                  styles.buttonText,
                  choice3 === item && styles.selectedButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>COMMENTS</Text>
        <TextInput
          style={styles.commentBox}
          placeholder="type your comments here"
          value={comments}
          onChangeText={setComments}
          multiline
        />
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.floatingButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  imagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#F5F5F5",
  },
  selectedButton: {
    backgroundColor: "#D2B48C",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  commentBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#D2B48C",
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
