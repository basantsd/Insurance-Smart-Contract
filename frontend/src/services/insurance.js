import { ethers } from "ethers";
import InsuranceABI from "../abis/InsuranceContract.json";

// Use your deployed contract address here:
const contractAddress =  import.meta.env.VITE_CONTRACT_ADDRESS;

export const connectContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask");
        return null;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, InsuranceABI.abi, signer);
    return contract;
}
