import React, { useState, useEffect } from 'react';
export const WalletContext = React.createContext();
const { ethereum } = window;
console.log(ethereum);
export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  // const [formData, setFormData] = useState({
  //   addressTo: '',
  //   amount: '',
  //   keyword: '',
  //   message: '',
  // });
  // const handleChange = (e, name) => {
  //   setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return 'Please Install Metamask';
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // GetAll Transactions();
      } else {
        console.log('No acc found');
      }
      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum Object');
    }
  };
  // connecting wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
      console.log('Myacc', currentAccount);
    } catch (error) {
      console.log('Catch error');
      console.log(error);
      throw new Error('No ethereum Object');
    }
  };
  const hello = () => {
    console.log('hello');
  };
  // const sendTransaction = async () => {
  //   try {
  //     if (!ethereum) return alert('Please install metamsk');
  //     // Get the data from form
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('No ethereum Object');
  //   }
  // };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        hello,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
