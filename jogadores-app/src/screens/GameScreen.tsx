
import React, { useState } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";

type GameMode = "NOS_ELES" | "LETRAS" | null;

interface Player {
  initials: string;
  score: number;
}

interface Score {
  id: number;
  playerInitials: string;
  points: number;
}

import { TouchableOpacity, Image } from "react-native";

interface GameScreenProps {
  onBack: () => void;
}

const GameScreen = ({ onBack }: GameScreenProps) => {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputInitials, setInputInitials] = useState("");
  const [scores, setScores] = useState<Score[]>([]);
  const [roundScores, setRoundScores] = useState<{ [initials: string]: string }>({});

  const handleNewGame = () => {
    setPlayers([]);
    setScores([]);
    setRoundScores({});
    setInputInitials("");
    setGameMode(null);
    Alert.alert(
      "Selecione o modo de jogo",
      "",
      [
        { text: "NÓS/ELES", onPress: () => setGameMode("NOS_ELES") },
        { text: "LETRAS", onPress: () => setGameMode("LETRAS") },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const handleConfirmPlayers = () => {
    if (gameMode === "NOS_ELES") {
      setPlayers([
        { initials: "NÓS", score: 0 },
        { initials: "ELES", score: 0 }
      ]);
    } else if (gameMode === "LETRAS" && inputInitials.trim()) {
      let arr = inputInitials.trim().split("").map(l => ({ initials: l.toUpperCase(), score: 0 }));
      if (arr.length > 3) arr = arr.slice(0, 3);
      setPlayers(arr);
    }
  };

  const handleScoreChange = (initials: string, value: string) => {
    setRoundScores({ ...roundScores, [initials]: value });
  };

  const handleConfirmScores = () => {
    const newScores = players.map(player => ({
      id: Date.now() + Math.random(),
      playerInitials: player.initials,
      points: Number(roundScores[player.initials]) || 0
    }));
    setScores([...scores, ...newScores]);
    setPlayers(players.map(p => ({
      ...p,
      score: p.score + (Number(roundScores[p.initials]) || 0)
    })));
    setRoundScores({});
  };

  const handleDeleteScore = (id: number) => {
    const updatedScores = scores.filter(s => s.id !== id);
    setScores(updatedScores);
    // Recalcula os totais
    const totals: { [initials: string]: number } = {};
    updatedScores.forEach(s => {
      totals[s.playerInitials] = (totals[s.playerInitials] || 0) + s.points;
    });
    setPlayers(players.map(p => ({
      ...p,
      score: totals[p.initials] || 0
    })));
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Image source={require("../assets/userIcon.png")} style={styles.userIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mr DOM</Text>
      </View>
  <Button title="Novo Jogo" onPress={handleNewGame} />
      {!gameMode && <Text style={styles.info}>Selecione o modo de jogo para começar.</Text>}
      {gameMode === "NOS_ELES" && players.length === 0 && (
        <Button title="Confirmar jogadores" onPress={handleConfirmPlayers} />
      )}
      {gameMode === "LETRAS" && players.length === 0 && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Digite as iniciais dos jogadores (ex: ABCD)"
            value={inputInitials}
            onChangeText={setInputInitials}
          />
          <Button title="Confirmar jogadores" onPress={handleConfirmPlayers} />
        </View>
      )}
      {players.length > 0 && (
        <View>
          <Text style={styles.title}>Registrar Pontuação</Text>
          <View style={styles.scoreInputsRow}>
            {players.map(player => (
              <View key={player.initials} style={styles.scoreInputColumn}>
                <Text style={styles.playerInitials}>{player.initials}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Pontuação"
                  keyboardType="numeric"
                  value={roundScores[player.initials] || ""}
                  onChangeText={value => handleScoreChange(player.initials, value)}
                />
              </View>
            ))}
          </View>
          <Button title="Confirmar Pontuação" onPress={handleConfirmScores} />
        </View>
      )}
      {players.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.title}>Jogadores e Pontuação Total</Text>
          {players.map(player => (
            <Text key={player.initials} style={styles.playerScore}>{player.initials}: {player.score}</Text>
          ))}
        </View>
      )}
      {scores.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.title}>Histórico de Jogadas</Text>
          {scores.map(score => (
            <View key={score.id} style={styles.scoreHistoryRow}>
              <Text style={styles.playerInitials}>{score.playerInitials}</Text>
              <Text style={styles.playerScore}>{score.points}</Text>
              <Button title="Excluir" onPress={() => handleDeleteScore(score.id)} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  userIcon: { width: 32, height: 32, marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginVertical: 8, paddingHorizontal: 8, width: 120 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 12 },
  info: { fontSize: 16, marginVertical: 12 },
  scoreInputRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  scoreInputColumn: { flexDirection: "column", alignItems: "center", marginBottom: 16 },
  scoreInputsRow: { flexDirection: "row", justifyContent: "center", alignItems: "flex-end", marginBottom: 16 },
  playerInitials: { fontSize: 18, width: 60 },
  playerScore: { fontSize: 18, marginLeft: 8 },
  listContainer: { marginTop: 16 },
  scoreHistoryRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 }
});

export default GameScreen;
