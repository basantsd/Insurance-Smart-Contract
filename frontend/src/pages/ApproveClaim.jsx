import React, { useState, useEffect } from 'react';
import { connectContract } from '../services/insurance';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ApproveClaim = () => {
  const [claimId, setClaimId] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) setClaimId(id);
  }, [location]);

  const handleApprove = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.approveClaim(claimId);
      await tx.wait();
      alert("Claim Approved Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>Approve Claim</Typography>
      <TextField fullWidth margin="normal" label="Claim ID" value={claimId} onChange={(e) => setClaimId(e.target.value)} />
      <Button variant="contained" onClick={handleApprove}>Approve Claim</Button>
    </Container>
  );
};

export default ApproveClaim;
