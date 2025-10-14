import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MoedaCardProps } from './types';
import { formatCurrency, formatPercentage } from '../../utils/formatCurrency';

export const MoedaCard = ({ moeda, code }: MoedaCardProps) => {
  // Validação mais robusta para os valores
  const safeVariation = () => {
    if (typeof moeda.variation === 'string') {
      const parsed = parseFloat(moeda.variation);
      return isNaN(parsed) ? 0 : parsed;
    }
    return typeof moeda.variation === 'number' ? moeda.variation : 0;
  };

  const variation = safeVariation();
  const isPositive = variation >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{moeda.name}</Text>
        <Text style={styles.code}>{code}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Compra</Text>
          <Text style={styles.priceValue}>{formatCurrency(moeda.buy)}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Venda</Text>
          <Text style={styles.priceValue}>{formatCurrency(moeda.sell)}</Text>
        </View>
        
        <View style={styles.variationContainer}>
          <Text style={[
            styles.variationText,
            isPositive ? styles.positive : styles.negative
          ]}>
            {formatPercentage(moeda.variation)}
          </Text>
        </View>
      </View>
    </View>
  );
};