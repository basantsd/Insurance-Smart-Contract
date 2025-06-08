import { BrowserProvider, Contract } from 'ethers';
import InsuranceABI from '../abis/InsuranceContract.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const connectContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(contractAddress, InsuranceABI.abi, signer);
  return contract;
};

export const getConnectedWallet = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};
