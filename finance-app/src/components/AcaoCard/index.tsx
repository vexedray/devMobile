import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { AcaoCardProps } from './types';
import { formatNumber, formatPercentage } from '../../utils/formatCurrency';

export const AcaoCard = ({ acao, code }: AcaoCardProps) => {
  // Validação mais robusta para os valores
  const safeVariation = () => {
    if (typeof acao.variation === 'string') {
      const parsed = parseFloat(acao.variation);
      return isNaN(parsed) ? 0 : parsed;
    }
    return typeof acao.variation === 'number' ? acao.variation : 0;
  };

  const variation = safeVariation();
  const isPositive = variation >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{acao.name}</Text>
        <Text style={styles.code}>{code}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Pontos</Text>
          <Text style={styles.pointsValue}>{formatNumber(acao.points)}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Local</Text>
          <Text style={styles.locationText}>{acao.location}</Text>
        </View>
        
        <View style={styles.variationContainer}>
          <Text style={[
            styles.variationText,
            isPositive ? styles.positive : styles.negative
          ]}>
            {formatPercentage(acao.variation)}
          </Text>
        </View>
      </View>
    </View>
  );
};