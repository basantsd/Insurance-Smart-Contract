import React, { useState, useEffect } from 'react';
import { connectContract, getConnectedWallet } from '../services/insurance';
import { Container, TextField, Button, Typography } from '@mui/material';
import { parseUnits } from 'ethers';

const IssuePolicy = () => {
  const [premium, setPremium] = useState('');
  const [coverage, setCoverage] = useState('');
  const [duration, setDuration] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    async function fetchWallet() {
      const wallet = await getConnectedWallet();
      setWalletAddress(wallet);
    }
    fetchWallet();
  }, []);

  const issuePolicy = async () => {
    try {
      const contract = await connectContract();

      // Use parseUnits with 0 decimals since you're passing integers directly
      const premiumParsed = parseUnits(premium, 0);
      const coverageParsed = parseUnits(coverage, 0);

      const tx = await contract.issuePolicy(
        walletAddress, 
        premiumParsed,
        coverageParsed,
        Number(duration)
      );

      await tx.wait();
      alert("Policy Issued Successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>Issue New Policy</Typography>

      <Typography>Policy Holder: {walletAddress}</Typography>

      <TextField fullWidth margin="normal" label="Premium Amount" onChange={(e) => setPremium(e.target.value)} />
      <TextField fullWidth margin="normal" label="Coverage Amount" onChange={(e) => setCoverage(e.target.value)} />
      <TextField fullWidth margin="normal" label="Policy Duration (Days)" onChange={(e) => setDuration(e.target.value)} />

      <Button variant="contained" onClick={issuePolicy}>Issue Policy</Button>
    </Container>
  );
};

export default IssuePolicy;