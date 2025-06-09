import React, { useState, useEffect } from 'react';
import { connectContract } from '../services/insurance';
import { Container, TextField, Button, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { useLocation } from 'react-router-dom';

const SubmitClaim = () => {
  const [policyId, setPolicyId] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [reason, setReason] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) setPolicyId(id);
  }, [location]);

  const handleSubmitClaim = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.submitClaim(policyId, ethers.parseUnits(claimAmount, 0), reason);
      await tx.wait();
      alert("Claim Submitted Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>Submit Claim</Typography>
      <TextField fullWidth margin="normal" label="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
      <TextField fullWidth margin="normal" label="Claim Amount" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} />
      <TextField fullWidth margin="normal" label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
      <Button variant="contained" onClick={handleSubmitClaim}>Submit Claim</Button>
    </Container>
  );
};

export default SubmitClaim;
