import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Player {
  initials: string;
  score: number;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <View style={styles.container}>
      {players.map((player, index) => (
        <View key={index} style={styles.playerItem}>
          <Text style={styles.initials}>{player.initials}</Text>
          <Text style={styles.score}>{player.score}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 18,
  },
});

export default PlayerList;