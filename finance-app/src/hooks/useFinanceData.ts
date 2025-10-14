import { useState, useEffect } from 'react';
import api from '../api/api';
import { MoedaData, AcaoData, CriptomoedaData } from '../types';

export const useFinanceData = () => {
  const [moedas, setMoedas] = useState<MoedaData | null>(null);
  const [acoes, setAcoes] = useState<AcaoData | null>(null);
  const [criptomoedas, setCriptomoedas] = useState<CriptomoedaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoedas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/finance');
      const data = response.data.results.currencies;
      setMoedas(data);
    } catch (err) {
      setError('Erro ao carregar moedas');
      setMoedas(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAcoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/finance');
      const data = response.data.results.stocks;
      setAcoes(data);
    } catch (err) {
      setError('Erro ao carregar ações');
      setAcoes(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCriptomoedas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/finance');
      const data = response.data.results.bitcoin;
      setCriptomoedas(data);
    } catch (err) {
      setError('Erro ao carregar criptomoedas');
      setCriptomoedas(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchMoedas();
    fetchAcoes();
    fetchCriptomoedas();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    moedas,
    acoes,
    criptomoedas,
    loading,
    error,
    refreshData,
    fetchMoedas,
    fetchAcoes,
    fetchCriptomoedas,
  };
};