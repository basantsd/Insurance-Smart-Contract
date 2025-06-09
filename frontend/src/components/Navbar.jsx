import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [wallet, setWallet] = useState("");
  const location = useLocation();

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
  }, [location]);  // <-- dependency added here

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Issue Policy", path: "/issue" },
    { label: "View Policies", path: "/viewpolicy" },
    { label: "Pay Premium", path: "/paypremium" },
    { label: "Submit Claim", path: "/submitclaim" },
    { label: "Claims List", path: "/claims" },
    { label: "Approve Claim", path: "/approveclaim" },
    { label: "Pay Claim", path: "/payclaim" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1f1f1f' }}>
      <Toolbar>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              color: isActive(item.path) ? '#fff' : '#ccc',
              backgroundColor: isActive(item.path) ? '#1976d2' : 'transparent',
              marginRight: 1,
              '&:hover': {
                backgroundColor: '#1565c0',
                color: '#fff',
              },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: isActive(item.path) ? 'bold' : 'normal'
            }}
          >
            {item.label}
          </Button>
        ))}

        {wallet ? (
          <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
            Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </Typography>
        ) : (
          <Button
            color="inherit"
            sx={{ marginLeft: 'auto', textTransform: 'none', fontWeight: 'bold' }}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
