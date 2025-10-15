import React, { useState } from "react";
import { View, Button } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";

export default function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!showGame ? (
        <>
          <HomeScreen />
          <Button title="Iniciar Jogo" onPress={() => setShowGame(true)} />
        </>
      ) : (
        <GameScreen onBack={() => setShowGame(false)} />
      )}
    </View>
  );
}
