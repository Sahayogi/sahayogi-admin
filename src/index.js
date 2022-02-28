import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';
import { Provider as AuthProvider } from './context/UserContext';
import { WalletProvider } from './context/walletContext';

ReactDOM.render(
  <AuthProvider>
    <WalletProvider>
      <MainApp />
    </WalletProvider>
  </AuthProvider>,
  document.getElementById('root')
);
