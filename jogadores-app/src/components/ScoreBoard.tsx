import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Score {
  id: number;
  playerInitials: string;
  points: number;
}

interface ScoreBoardProps {
  scores: Score[];
  onDeleteScore: (id: number) => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, onDeleteScore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score History</Text>
      {scores.length === 0 ? (
        <Text style={styles.noScores}>No scores recorded yet.</Text>
      ) : (
        scores.map((score) => (
          <View key={score.id} style={styles.scoreEntry}>
            <Text style={styles.scoreText}>
              {score.playerInitials}: {score.points} points
            </Text>
            <Button title="Excluir" onPress={() => onDeleteScore(score.id)} />
          </View>
        ))
      )}
      <Text style={styles.totalPoints}>
        Total Points: {scores.reduce((total, score) => total + score.points, 0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noScores: {
    fontStyle: 'italic',
    color: '#888',
  },
  scoreEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  scoreText: {
    fontSize: 16,
  },
  totalPoints: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScoreBoard;