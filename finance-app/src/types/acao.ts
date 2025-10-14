export interface Acao {
  name: string;
  location: string;
  points: number | string;
  variation: number | string;
}

export interface AcaoData {
  IBOVESPA: Acao;
  IFIX: Acao;
  NASDAQ: Acao;
  DOWJONES: Acao;
  CAC: Acao;
  NIKKEI: Acao;
}