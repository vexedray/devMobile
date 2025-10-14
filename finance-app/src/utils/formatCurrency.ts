export const formatCurrency = (value: number | string): string => {
  // Garante que o valor seja um número válido
  let numValue: number;
  
  if (typeof value === 'string') {
    // Remove caracteres não numéricos e converte para número
    const cleanValue = value.replace(/[^\d.,\-]/g, '').replace(',', '.');
    numValue = parseFloat(cleanValue);
  } else {
    numValue = value;
  }
  
  // Verifica se a conversão resultou em um número válido
  if (isNaN(numValue) || !isFinite(numValue)) {
    numValue = 0;
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
};

export const formatPercentage = (value: number | string): string => {
  // Garante que o valor seja um número válido
  let numValue: number;
  
  if (typeof value === 'string') {
    // Remove caracteres não numéricos e converte para número
    const cleanValue = value.replace(/[^\d.,\-]/g, '').replace(',', '.');
    numValue = parseFloat(cleanValue);
  } else {
    numValue = value;
  }
  
  // Verifica se a conversão resultou em um número válido
  if (isNaN(numValue) || !isFinite(numValue)) {
    numValue = 0;
  }
  
  const signal = numValue >= 0 ? '+' : '';
  return `${signal}${numValue.toFixed(2)}%`;
};

export const formatNumber = (value: number | string, decimals: number = 2): string => {
  // Garante que o valor seja um número válido
  let numValue: number;
  
  if (typeof value === 'string') {
    // Remove caracteres não numéricos e converte para número
    const cleanValue = value.replace(/[^\d.,\-]/g, '').replace(',', '.');
    numValue = parseFloat(cleanValue);
  } else {
    numValue = value;
  }
  
  // Verifica se a conversão resultou em um número válido
  if (isNaN(numValue) || !isFinite(numValue)) {
    numValue = 0;
  }
  
  return numValue.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};