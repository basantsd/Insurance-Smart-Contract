import React, { useState } from 'react';
import { connectContract } from '../services/insurance';
import { Container, TextField, Button, Typography } from '@mui/material';

const PayClaim = () => {
  const [claimId, setClaimId] = useState('');

  const handlePay = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.payClaim(claimId);
      await tx.wait();
      alert("Claim Paid Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>Pay Claim</Typography>
      <TextField fullWidth margin="normal" label="Claim ID" value={claimId} onChange={(e) => setClaimId(e.target.value)} />
      <Button variant="contained" onClick={handlePay}>Pay Claim</Button>
    </Container>
  );
};

export default PayClaim;
