# 🚀 Decentralized Insurance DApp

A fully decentralized insurance platform built on **Ethereum blockchain** using **Solidity**, **React.js**, and **Ethers.js**. This project demonstrates how insurance policies, premium payments, claims, and payouts can be automated, transparent, and tamper-proof using smart contracts and blockchain.

---

## 📖 Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Smart Contract Overview](#smart-contract-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Demo](#demo)
- [License](#license)

---

## 📌 Problem Statement

Traditional insurance systems suffer from:

- Lack of transparency  
- Slow claim processing  
- High administrative costs  
- Risk of fraud  
- Poor customer experience

---

## 🎯 Solution Overview

This DApp solves these issues by:

- Automating policy issuance, premium collection, claim submission & payouts  
- Ensuring tamper-proof, transparent data on Ethereum  
- Providing real-time claim management  
- Reducing manual intervention and errors

---

## 🛠 Tech Stack

| Layer         | Technology  |
| ------------- | ------------|
| Smart Contract | Solidity    |
| Frontend      | React.js (Vite) |
| Blockchain Communication | Ethers.js |
| Wallet Integration | MetaMask |
| Deployment    | Vercel |
| Local Dev     | Hardhat |

---

## ✨ Features

- ✅ Issue new insurance policies
- ✅ Pay insurance premiums
- ✅ Submit insurance claims
- ✅ Approve and payout claims
- ✅ View real-time contract events
- ✅ Fully decentralized & transparent

---

## 🔒 Smart Contract Overview

**Language**: Solidity  
**Compiler**: 0.8.20  
**Main Contract**: InsuranceContract

### Key Functions:

- `issuePolicy()`
- `payPremium()`
- `submitClaim()`
- `approveClaim()`
- `payClaim()`

### Key Events:

- `PolicyIssued`
- `PremiumPaid`
- `ClaimSubmitted`
- `ClaimApproved`
- `ClaimPaid`

---

## 🗂 Project Structure

```

insurance-dapp/
│
├── contracts/              # Solidity smart contract (Hardhat)
│   └── InsuranceContract.sol
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── services/       # Ethers.js integration
│   │   └── abis/           # ABI files
│   ├── .env                # Environment Variables
│   └── package.json
│
├── scripts/                # Deployment scripts
│
└── README.md

````

---

## Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/basantsd/Insurance-Smart-Contract.git
cd Insurance-Smart-Contract
````

### 2️⃣ Install Hardhat Dependencies

```bash
cd contracts
npm install
npx hardhat compile
```

### 3️⃣ Deploy Smart Contract (Local or Testnet)

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4️⃣ Setup React Frontend

```bash
cd frontend
npm install
```

### 5️⃣ Add Environment Variables

Create a `.env` file in `frontend` folder:

```
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
VITE_RPC_URL=https://sepolia.infura.io/v3/YourAPIKey
```

### 6️⃣ Run React Frontend

```bash
npm run dev
```

### 7️⃣ Interact via MetaMask 🚀

---

## 🚀 Deployment

* Deploy frontend easily on **Vercel** (free plan supported).
* Add `.env` variables in Vercel environment for production.


---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Developed by:** BASANT SINGH

---

## 🌐 Feel free to fork, clone, and build your own version!

✅ DApp
✅ Smart Contract
✅ Full-Stack Web3 Project
✅ Resume Booster 🚀
