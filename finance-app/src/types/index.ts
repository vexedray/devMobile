import { MoedaData } from './moeda';
import { AcaoData } from './acao';
import { CriptomoedaData } from './criptomoeda';

export interface FinanceApiResponse {
  by: string;
  valid_key: boolean;
  results: {
    currencies: MoedaData;
    stocks: AcaoData;
    bitcoin: any; // Dados complexos do bitcoin da API
  };
  execution_time: number;
  from_cache: boolean;
}

export * from './moeda';
export * from './acao';
export * from './criptomoeda';
export * from './navigation';