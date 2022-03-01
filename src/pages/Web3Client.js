import Web3 from "web3";
import SahayogiTokenBuild from "../abi/SahayogiToken.json";
import FundRaisingBuild from "../abi/FundRaising.json";

let frContract;
let sytContract;
let selectedAccount;
let isInitialized = false;
// let mintingAccount = "0xa3bd6a90A2Ad1afd5871AAdD0b871cc764AFEaF6";
// let amount = 10;
export const getBlockchain = async () => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`selected account changed to is ${selectedAccount}`);
    });

    const web3 = new Web3(provider);
    // const networkId = await web3.eth.net.getId();

    sytContract = new web3.eth.Contract(
      SahayogiTokenBuild.abi,
      // SahayogiTokenBuild.networks[networkId].address
      "0xE29F9433e564c865CAC3Ff9ceAE120A63Dcc3bA0"
    );

    frContract = new web3.eth.Contract(
        FundRaisingBuild.abi,
        // FundRaisingBuild.networks[networkId].address
        "0xE29F9433e564c865CAC3Ff9ceAE120A63Dcc3bA0"
      );
    isInitialized = true;
  }
};
export const getOwnBalance = () => {
  return sytContract.methods.balanceOf(selectedAccount).call();
};

export const mintToken = async () => {
  if (!isInitialized) {
    await getBlockchain();
  }
  return sytContract.methods.mint("0xa3bd6a90A2Ad1afd5871AAdD0b871cc764AFEaF6", 100).send({
    from: selectedAccount,
  });
};

export const raiseFund = async () => {
    if (!isInitialized) {
      await getBlockchain();
    }
    return frContract.methods.createFundRaise().send({
      from: selectedAccount,
    });
  };
  
