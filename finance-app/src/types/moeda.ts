export interface Moeda {
  name: string;
  buy: number | string;
  sell: number | string;
  variation: number | string;
  code: string;
}

export interface MoedaData {
  USD: Moeda;
  EUR: Moeda;
  GBP: Moeda;
  ARS: Moeda;
  CAD: Moeda;
  AUD: Moeda;
  JPY: Moeda;
  CNY: Moeda;
  BTC: Moeda;
}