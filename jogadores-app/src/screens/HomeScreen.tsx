import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = () => (
  <View style={{ flex: 1 }}>
    <View style={styles.header}>
      <Image source={require("../assets/userIcon.png")} style={styles.userIcon} />
      <Text style={styles.headerTitle}>Mr DOM</Text>
    </View>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  userIcon: {
    width: 32,
    height: 32,
    marginRight: 12
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold"
  }
});

export default HomeScreen;
