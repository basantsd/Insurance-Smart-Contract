import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [wallet, setWallet] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWallet(accounts[0]);
      } catch {
        console.error("User rejected wallet connection");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    async function checkConnection() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      }
    }
    checkConnection();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/issue">Issue Policy</Button>
        <Button color="inherit" component={Link} to="/paypremium">Pay Premium</Button>
        <Button color="inherit" component={Link} to="/submitclaim">Submit Claim</Button>
        <Button color="inherit" component={Link} to="/approveclaim">Approve Claim</Button>
        <Button color="inherit" component={Link} to="/payclaim">Pay Claim</Button>
        <Button color="inherit" component={Link} to="/viewpolicy">View Policies</Button>

        {wallet ? (
          <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
            Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </Typography>
        ) : (
          <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
