export interface Criptomoeda {
  name: string;
  buy: number | string;
  sell: number | string;
  variation: number | string;
}

export interface CriptomoedaData {
  [key: string]: Criptomoeda;
}