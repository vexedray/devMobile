import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';

// ============================================================================
// TYPES
// ============================================================================
interface Currency {
  name: string;
  buy: number;
  sell: number;
  variation: number;
}

interface Stock {
  name: string;
  location: string;
  points: number;
  variation: number;
}

interface Bitcoin {
  name: string;
  buy: number;
  sell: number;
  variation: number;
}

interface FinanceData {
  currencies: { [key: string]: Currency };
  stocks: { [key: string]: Stock };
  bitcoin: Bitcoin;
}

// ============================================================================
// SERVICES/API
// ============================================================================
const API_KEY = 'a0cf23d3';
const API_BASE_URL = 'https://api.hgbrasil.com';

const api = {
  async getFinanceData(): Promise<FinanceData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/finance?key=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.valid_key) {
        throw new Error('Chave da API inválida');
      }
      
      // Transformar dados da API para o formato esperado
      const transformedData: FinanceData = {
        currencies: {
          USD: {
            name: data.results.currencies.USD.name || 'Dólar',
            buy: parseFloat(data.results.currencies.USD.buy) || 0,
            sell: parseFloat(data.results.currencies.USD.sell) || 0,
            variation: parseFloat(data.results.currencies.USD.variation) || 0
          },
          EUR: {
            name: data.results.currencies.EUR.name || 'Euro',
            buy: parseFloat(data.results.currencies.EUR.buy) || 0,
            sell: parseFloat(data.results.currencies.EUR.sell) || 0,
            variation: parseFloat(data.results.currencies.EUR.variation) || 0
          },
          GBP: {
            name: data.results.currencies.GBP.name || 'Libra',
            buy: parseFloat(data.results.currencies.GBP.buy) || 0,
            sell: parseFloat(data.results.currencies.GBP.sell) || 0,
            variation: parseFloat(data.results.currencies.GBP.variation) || 0
          },
          ARS: {
            name: data.results.currencies.ARS.name || 'Peso Argentino',
            buy: parseFloat(data.results.currencies.ARS.buy) || 0,
            sell: parseFloat(data.results.currencies.ARS.sell) || 0,
            variation: parseFloat(data.results.currencies.ARS.variation) || 0
          }
        },
        stocks: {
          IBOVESPA: {
            name: data.results.stocks.IBOVESPA.name || 'IBOVESPA',
            location: data.results.stocks.IBOVESPA.location || 'São Paulo',
            points: parseFloat(data.results.stocks.IBOVESPA.points) || 0,
            variation: parseFloat(data.results.stocks.IBOVESPA.variation) || 0
          },
          NASDAQ: {
            name: data.results.stocks.NASDAQ.name || 'NASDAQ',
            location: data.results.stocks.NASDAQ.location || 'New York',
            points: parseFloat(data.results.stocks.NASDAQ.points) || 0,
            variation: parseFloat(data.results.stocks.NASDAQ.variation) || 0
          },
          CAC: {
            name: data.results.stocks.CAC.name || 'CAC 40',
            location: data.results.stocks.CAC.location || 'Paris',
            points: parseFloat(data.results.stocks.CAC.points) || 0,
            variation: parseFloat(data.results.stocks.CAC.variation) || 0
          },
          NIKKEI: {
            name: data.results.stocks.NIKKEI.name || 'NIKKEI',
            location: data.results.stocks.NIKKEI.location || 'Tokyo',
            points: parseFloat(data.results.stocks.NIKKEI.points) || 0,
            variation: parseFloat(data.results.stocks.NIKKEI.variation) || 0
          }
        },
        bitcoin: {
          name: data.results.bitcoin.name || 'Bitcoin',
          buy: parseFloat(data.results.bitcoin.buy) || 0,
          sell: parseFloat(data.results.bitcoin.sell) || 0,
          variation: parseFloat(data.results.bitcoin.variation) || 0
        }
      };
      
      return transformedData;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      
      // Fallback para dados mockados em caso de erro
      const fallbackData: FinanceData = {
        currencies: {
          USD: { name: 'Dólar', buy: 5.72, sell: 5.73, variation: 0.45 },
          EUR: { name: 'Euro', buy: 6.21, sell: 6.22, variation: -0.12 },
          GBP: { name: 'Libra', buy: 7.18, sell: 7.19, variation: 0.23 },
          ARS: { name: 'Peso Argentino', buy: 0.0056, sell: 0.0057, variation: -1.2 }
        },
        stocks: {
          IBOVESPA: { name: 'IBOVESPA', location: 'São Paulo', points: 127432, variation: 1.23 },
          NASDAQ: { name: 'NASDAQ', location: 'New York', points: 15234, variation: -0.45 },
          CAC: { name: 'CAC 40', location: 'Paris', points: 7456, variation: 0.78 },
          NIKKEI: { name: 'NIKKEI', location: 'Tokyo', points: 32145, variation: 2.1 }
        },
        bitcoin: { name: 'Bitcoin', buy: 351234.50, sell: 351456.80, variation: 3.45 }
      };
      
      return fallbackData;
    }
  }
};

// ============================================================================
// COMPONENTS/QuoteCard
// ============================================================================
interface QuoteCardProps {
  title: string;
  subtitle?: string;
  value: string;
  variation: number;
  iconName: keyof typeof FontAwesome.glyphMap;
  type?: 'currency' | 'stock' | 'crypto';
}

const QuoteCard: React.FC<QuoteCardProps> = ({ title, subtitle, value, variation, iconName, type = 'currency' }) => {
  const isPositive = variation >= 0;
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'currency': return '#EBF8FF';
      case 'stock': return '#FAF5FF';
      case 'crypto': return '#FFFBEB';
      default: return '#F7FAFC';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'currency': return '#2B6CB0';
      case 'stock': return '#805AD5';
      case 'crypto': return '#D69E2E';
      default: return '#4A5568';
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <FontAwesome name={iconName} size={24} color={getIconColor()} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
            <Text style={styles.cardValue}>{value}</Text>
          </View>
        </View>
        <View style={[
          styles.variationBadge,
          { backgroundColor: isPositive ? '#C6F6D5' : '#FED7D7' }
        ]}>
          <Text style={[
            styles.variationText,
            { color: isPositive ? '#22543D' : '#742A2A' }
          ]}>
            {isPositive ? '+' : ''}{variation.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// SCREENS/CurrenciesScreen
// ============================================================================
const CurrenciesScreen: React.FC<{ data: FinanceData | null; loading: boolean }> = ({ data, loading }) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2B6CB0" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>Moedas</Text>
      {Object.entries(data.currencies).map(([key, currency]) => (
        <QuoteCard
          key={key}
          title={currency.name}
          subtitle={`Compra: R$ ${currency.buy.toFixed(4)} • Venda: R$ ${currency.sell.toFixed(4)}`}
          value={`R$ ${currency.buy.toFixed(4)}`}
          variation={currency.variation}
          iconName="dollar"
          type="currency"
        />
      ))}
    </ScrollView>
  );
};

// ============================================================================
// SCREENS/StocksScreen
// ============================================================================
const StocksScreen: React.FC<{ data: FinanceData | null; loading: boolean }> = ({ data, loading }) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#805AD5" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>Ações</Text>
      {Object.entries(data.stocks).map(([key, stock]) => (
        <QuoteCard
          key={key}
          title={stock.name}
          subtitle={stock.location}
          value={`${stock.points.toLocaleString('pt-BR')} pts`}
          variation={stock.variation}
          iconName="line-chart"
          type="stock"
        />
      ))}
    </ScrollView>
  );
};

// ============================================================================
// SCREENS/CryptoScreen
// ============================================================================
const CryptoScreen: React.FC<{ data: FinanceData | null; loading: boolean }> = ({ data, loading }) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D69E2E" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>Criptomoedas</Text>
      <QuoteCard
        title={data.bitcoin.name}
        subtitle={`Compra: R$ ${data.bitcoin.buy.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} • Venda: R$ ${data.bitcoin.sell.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        value={`R$ ${data.bitcoin.buy.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        variation={data.bitcoin.variation}
        iconName="bitcoin"
        type="crypto"
      />
    </ScrollView>
  );
};

// ============================================================================
// APP (NAVIGATION)
// ============================================================================
export default function App() {
  const [activeTab, setActiveTab] = useState<'currencies' | 'stocks' | 'crypto'>('currencies');
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await api.getFinanceData();
    setData(result);
    setLoading(false);
  };

  const tabs = [
    { id: 'currencies' as const, label: 'Moedas', icon: 'dollar' as keyof typeof FontAwesome.glyphMap },
    { id: 'stocks' as const, label: 'Ações', icon: 'line-chart' as keyof typeof FontAwesome.glyphMap },
    { id: 'crypto' as const, label: 'Criptomoedas', icon: 'bitcoin' as keyof typeof FontAwesome.glyphMap }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#4299E1" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cotações Financeiras</Text>
        <Text style={styles.headerSubtitle}>Acompanhe o mercado em tempo real</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'currencies' && <CurrenciesScreen data={data} loading={loading} />}
        {activeTab === 'stocks' && <StocksScreen data={data} loading={loading} />}
        {activeTab === 'crypto' && <CryptoScreen data={data} loading={loading} />}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={styles.tabButton}
            >
              <FontAwesome 
                name={tab.icon} 
                size={24} 
                color={isActive ? '#4299E1' : '#A0AEC0'} 
                style={styles.tabIcon}
              />
              <Text style={[
                styles.tabLabel,
                { color: isActive ? '#4299E1' : '#A0AEC0', fontWeight: isActive ? '600' : '400' }
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 24,
    paddingVertical: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BEE3F8',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    marginTop: 4,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginTop: 8,
  },
  variationBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  variationText: {
    fontSize: 14,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#718096',
  },
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    paddingVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});