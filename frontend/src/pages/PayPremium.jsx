import React, { useState, useEffect } from 'react';
import { connectContract } from '../services/insurance';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

const PayPremium = () => {
  const [policyId, setPolicyId] = useState('');
  const [amount, setAmount] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const premium = params.get('premium');
    if (id) setPolicyId(id);
    if (premium) setAmount(premium);
  }, [location]);

  const handlePay = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.payPremium(policyId, { value: ethers.parseUnits(amount, 0) });
      await tx.wait();
      alert("Premium Paid Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>Pay Premium</Typography>
      <TextField fullWidth margin="normal" label="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
      <TextField fullWidth margin="normal" label="Premium Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Button variant="contained" onClick={handlePay}>Pay Premium</Button>
    </Container>
  );
};

export default PayPremium;
