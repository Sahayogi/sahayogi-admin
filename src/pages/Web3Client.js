import Web3 from 'web3';
import SahayogiTokenBuild from '../abi/SahayogiToken.json';
import FundRaisingBuild from '../abi/FundRaising.json';
import SahayogiAgencyBuild from '../abi/SahayogiAgency.json';
import { getToken, getUserEmail } from '../components/constants/Constant';
import axios from 'axios';

let frContract;
let sytContract;
let saContract;
let selectedAccount;
let isInitialized = false;

const updateWalletAddress = async (accountAddress) => {
  const token = getToken();
  const email = getUserEmail();
  console.log('UpdateWallet Called');
  console.log(`Token`, token);
  if (token) {
    // Axios hit to update corresonding acc
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('Checkpoint');
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/wallet/connected',
        { accountAddress, email },
        config
      );
      console.log(data);
      localStorage.setItem('wallet-address', data.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
};

export const getBlockchain = async (setAccountAddress) => {
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {
    provider
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log('myAcc', selectedAccount);
        // Axios request to update wallet
        if (selectedAccount) {
          updateWalletAddress(selectedAccount);
        }
        setAccountAddress(selectedAccount);
        console.log(`selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`selected account changed to is ${selectedAccount}`);
    });

    const web3 = new Web3(provider);
    // const networkId = await web3.eth.net.getId();
    sytContract = new web3.eth.Contract(
      SahayogiTokenBuild.abi,
      // SahayogiTokenBuild.networks[networkId].address
      '0xe600c455278302F0C9eA2399bE9f104897BAe887'
    );
    frContract = new web3.eth.Contract(
      FundRaisingBuild.abi,
      // FundRaisingBuild.networks[networkId].address
      '0x39456a87E4a7F1B25e0b5E58f61ba9B41072D4Cd'
    );
    saContract = new web3.eth.Contract(
      SahayogiAgencyBuild.abi,
      '0x1C92c66caA1040195270909bA44D3EA0c9322b6E'
    );
  }
};
export const getOwnBalance = () => {
  return sytContract.methods.balanceOf(selectedAccount).call();
  // return sytContract.methods
  //   .balanceOf('0x994e98e32198b42903404b9fee2aaa205ceab13e')
  //   .call();
};
export const getTotalSupply = async () => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return sytContract.methods.totalSupply().call();
};

export const mintToken = async (mintAddress, mintAmount) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return sytContract.methods.mint(mintAddress, mintAmount).send({
    from: selectedAccount,
  });
};

export const raiseFund = async (projectId, aidAgency, goal, startAt, endAt) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return frContract.methods
    .createFundRaise(projectId, aidAgency, goal, startAt, endAt)
    .send({
      from: selectedAccount,
    });
};
export const cancelRaiseFund = async (id) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return frContract.methods.cancel(id).send({
    from: selectedAccount,
  });
};
export const approve = async () => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return sytContract.methods
    .approve('0x39456a87E4a7F1B25e0b5E58f61ba9B41072D4Cd', 10000000000000000000000000)
    .send({
      from: selectedAccount,
    });
};

export const createAgency = async (account) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return saContract.methods.addAgency(account).send({
    from: selectedAccount,
  });
};

export const createProject = async (projectName) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return saContract.methods.createProject(projectName).send({
    from: selectedAccount,
  });
};
export const getRaiseFunds = async (id) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return frContract.methods.raiseFunds(id).call();
};
export const getProjectCount = async () => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return saContract.methods.count().call();
};

export const getFundingCount = async () => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return frContract.methods.count().call();
};

export const transact = async (to, amount) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return sytContract.methods.transfer(to, amount).send({
    from: selectedAccount,
  });
};
export const claimFunds = async (id, projectId) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return saContract.methods.claimFunds(id, projectId).send({
    from: selectedAccount,
  });
};

export const updateMerkleRoot = async ( projectId,newMerkleRoot) => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return saContract.methods.updateMerkleRoot( projectId,newMerkleRoot).send({
    from: selectedAccount,
  });
};