import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { CriptomoedasScreenProps } from './types';
import { useFinanceData } from '../../hooks/useFinanceData';
import { CriptomoedaCard } from '../../components/CriptomoedaCard';

export default function CriptomoedasScreen({}: CriptomoedasScreenProps) {
  const { criptomoedas, loading, error, fetchCriptomoedas } = useFinanceData();

  useEffect(() => {
    fetchCriptomoedas();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E8B57" />
          <Text style={styles.loadingText}>Carregando criptomoedas...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCriptomoedas}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!criptomoedas) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma criptomoeda disponível</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(criptomoedas).map(([code, criptomoeda]) => (
          <CriptomoedaCard key={code} criptomoeda={criptomoeda} code={code} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Criptomoedas</Text>
      </View>
      {renderContent()}
    </View>
  );
}