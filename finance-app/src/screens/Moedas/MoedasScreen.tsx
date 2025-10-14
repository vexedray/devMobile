import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { MoedasScreenProps } from './types';
import { useFinanceData } from '../../hooks/useFinanceData';
import { MoedaCard } from '../../components/MoedaCard';

export default function MoedasScreen({}: MoedasScreenProps) {
  const { moedas, loading, error, fetchMoedas } = useFinanceData();

  useEffect(() => {
    fetchMoedas();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E8B57" />
          <Text style={styles.loadingText}>Carregando moedas...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMoedas}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!moedas) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma moeda disponível</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(moedas).map(([code, moeda]) => (
          <MoedaCard key={code} moeda={moeda} code={code} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Moedas</Text>
      </View>
      {renderContent()}
    </View>
  );
}