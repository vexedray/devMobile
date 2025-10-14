# App Financeiro 📈

Uma aplicação mobile React Native construída com Expo que fornece dados financeiros em tempo real, incluindo moedas, ações e criptomoedas. O app busca dados da API HG Brasil e os exibe em uma interface limpa e intuitiva.

## 📱 Funcionalidades

- **Cotações de Moedas em Tempo Real**: USD, EUR, GBP, ARS, CAD, AUD, JPY, CNY
- **Dados do Mercado de Ações**: IBOVESPA, NASDAQ, IFIX, DOW JONES, CAC, NIKKEI
- **Preços de Criptomoedas**: Bitcoin e outras criptomoedas
- **Design Responsivo**: Interface limpa e moderna com estados de carregamento e erro
- **Multiplataforma**: Funciona em dispositivos iOS e Android

## 🛠️ Tecnologias

- **React Native** com Expo
- **TypeScript** para segurança de tipos
- **React Navigation** para navegação por abas
- **Axios** para requisições da API
- **Expo Vector Icons** para ícones da interface
- **API HG Brasil** para dados financeiros

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/vexedray/devMobile.git
   cd devMobile/finance-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

4. **Execute no dispositivo/simulador**
   ```bash
   # Para Android
   npm run android
   
   # Para iOS
   npm run ios
   
   # Para Web
   npm run web
   ```

## 📁 Estrutura do Projeto

```
devMobile/
└── finance-app/
    ├── src/
    │   ├── api/
    │   │   └── api.ts                 # Configuração da API
    │   ├── components/
    │   │   ├── AcaoCard/              # Componente de card de ações
    │   │   ├── CriptomoedaCard/       # Componente de card de criptomoedas
    │   │   └── MoedaCard/             # Componente de card de moedas
    │   ├── hooks/
    │   │   └── useFinanceData.ts      # Hook customizado para busca de dados
    │   ├── navigation/
    │   │   └── TabNavigator.tsx       # Navegação por abas inferior
    │   ├── screens/
    │   │   ├── Acoes/                 # Tela de ações
    │   │   ├── Criptomoedas/          # Tela de criptomoedas
    │   │   └── Moedas/                # Tela de moedas
    │   ├── styles/
    │   │   └── theme.ts               # Tema e constantes do app
    │   ├── types/                     # Definições de tipos TypeScript
    │   └── utils/
    │       └── formatCurrency.ts      # Utilitários de formatação de moeda
    ├── App.tsx                        # Componente principal do app
    ├── index.ts                       # Ponto de entrada
    └── package.json
```

## 🎨 Componentes da Interface

### Componentes de Card
- **MoedaCard**: Exibe taxas de câmbio com preços de compra/venda
- **AcaoCard**: Mostra informações de ações com pontos e localização
- **CriptomoedaCard**: Apresenta dados de criptomoedas com variações de preço

### Funções Utilitárias
- [`formatCurrency`](finance-app/src/utils/formatCurrency.ts): Formata números como moeda Real Brasileiro
- [`formatPercentage`](finance-app/src/utils/formatCurrency.ts): Formata valores percentuais com sinais apropriados
- [`formatNumber`](finance-app/src/utils/formatCurrency.ts): Formatação geral de números com suporte a localização

## 🔧 Configuração

### Configuração da API
O app usa a API HG Brasil para dados financeiros. A URL base está configurada em [`finance-app/src/api/api.ts`](finance-app/src/api/api.ts):

```typescript
const api = axios.create({
    baseURL: 'https://api.hgbrasil.com',
    headers: {
        'Content-Type': 'application/json',
    },
});
```

### Personalização do Tema
Cores e estilos do app podem ser modificados em [`finance-app/src/styles/theme.ts`](finance-app/src/styles/theme.ts):

```typescript
export const COLORS = {
  primary: "#2E8B57",
  secondary: "#32CD32", 
  background: "#f0f4f7",
  // ... mais cores
};
```

## 📱 Navegação

O app usa um navegador de abas inferior com três telas principais:

1. **Moedas** - Taxas de câmbio das principais moedas
2. **Ações** - Índices do mercado de ações
3. **Criptomoedas** - Preços de criptomoedas

A navegação é gerenciada pelo [`TabNavigator`](finance-app/src/navigation/TabNavigator.tsx) usando React Navigation.

## 🔄 Gerenciamento de Dados

A busca de dados é gerenciada através do hook customizado [`useFinanceData`](finance-app/src/hooks/useFinanceData.ts), que fornece:

- Estados de carregamento
- Tratamento de erros
- Funcionalidade de atualização de dados
- Métodos de busca separados para diferentes tipos de dados

## 🏗️ Build para Produção

```bash
# Build para Android
expo build:android

# Build para iOS
expo build:ios
```

## 📋 Scripts

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Executa no dispositivo/emulador Android
- `npm run ios` - Executa no dispositivo/simulador iOS
- `npm run web` - Executa no navegador web

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/funcionalidade-incrivel`)
3. Commit suas mudanças (`git commit -m 'Adiciona funcionalidade incrível'`)
4. Push para a branch (`git push origin feature/funcionalidade-incrivel`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🙏 Agradecimentos

- [API HG Brasil](https://hgbrasil.com/) por fornecer os dados financeiros
- [Expo](https://expo.dev/) pela plataforma de desenvolvimento
- [React Navigation](https://reactnavigation.org/) pelos componentes de navegação

## 📞 Contato

Link do Projeto: [https://github.com/vexedray/devMobile](https://github.com/vexedray/devMobile)