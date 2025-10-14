import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { CriptomoedaCardProps } from './types';
import { formatCurrency, formatPercentage } from '../../utils/formatCurrency';

export const CriptomoedaCard = ({ criptomoeda, code }: CriptomoedaCardProps) => {
  // Validação mais robusta para os valores
  const safeVariation = () => {
    if (typeof criptomoeda.variation === 'string') {
      const parsed = parseFloat(criptomoeda.variation);
      return isNaN(parsed) ? 0 : parsed;
    }
    return typeof criptomoeda.variation === 'number' ? criptomoeda.variation : 0;
  };

  const variation = safeVariation();
  const isPositive = variation >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{criptomoeda.name}</Text>
        <Text style={styles.code}>{code.toUpperCase()}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Compra</Text>
          <Text style={styles.priceValue}>{formatCurrency(criptomoeda.buy)}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Venda</Text>
          <Text style={styles.priceValue}>{formatCurrency(criptomoeda.sell)}</Text>
        </View>
        
        <View style={styles.variationContainer}>
          <Text style={[
            styles.variationText,
            isPositive ? styles.positive : styles.negative
          ]}>
            {formatPercentage(criptomoeda.variation)}
          </Text>
        </View>
      </View>
    </View>
  );
};