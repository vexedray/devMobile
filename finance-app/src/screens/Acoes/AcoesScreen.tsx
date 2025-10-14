import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { AcoesScreenProps } from './types';
import { useFinanceData } from '../../hooks/useFinanceData';
import { AcaoCard } from '../../components/AcaoCard';

export default function AcoesScreen({}: AcoesScreenProps) {
  const { acoes, loading, error, fetchAcoes } = useFinanceData();

  useEffect(() => {
    fetchAcoes();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E8B57" />
          <Text style={styles.loadingText}>Carregando ações...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAcoes}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!acoes) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma ação disponível</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(acoes).map(([code, acao]) => (
          <AcaoCard key={code} acao={acao} code={code} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ações</Text>
      </View>
      {renderContent()}
    </View>
  );
}