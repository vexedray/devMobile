import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddPlayerForm = ({ onAddPlayer }) => {
  const [playerInitials, setPlayerInitials] = useState("");

  const handleSubmit = () => {
    if (playerInitials.trim()) {
      onAddPlayer(playerInitials.trim());
      setPlayerInitials("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter player initials"
        value={playerInitials}
        onChangeText={setPlayerInitials}
      />
      <Button title="Add Player" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddPlayerForm;