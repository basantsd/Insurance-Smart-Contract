import React, { useEffect, useState } from 'react';
import { connectContract, getConnectedWallet } from '../services/insurance';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';


const ClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);  // <-- loading state

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const contract = await connectContract();
      const wallet = await getConnectedWallet();
      const total = Number(await contract.claimCounter());
      const params = new URLSearchParams(location.search);
      const filterPolicy = params.get('policyId');
      let temp = [];
      for (let i = 1; i <= total; i++) {
        const claim = await contract.claims(i);
        const policy = await contract.policies(claim.policyId);
        if (policy.policyHolder.toLowerCase() !== wallet.toLowerCase()) continue;
        if (filterPolicy && claim.policyId.toString() !== filterPolicy) continue;
        temp.push({
          id: i.toString(),
          policyId: claim.policyId.toString(),
          amount: claim.claimAmount.toString(),
          reason: claim.reason,
          approved: claim.isApproved ? 'Approved' : 'Pending',
          paid: claim.isPaid ? 'Paid' : 'Unpaid',
        });
      }
      setClaims(temp);
    } catch (err) {
      console.error("Error fetching policies:", err);
    } finally {
      setLoading(false);  // Stop loader
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>My Claims</Typography>
      {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell>Policy ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Approval</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.length > 0 ? claims.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.policyId}</TableCell>
              <TableCell>{c.amount}</TableCell>
              <TableCell>{c.reason}</TableCell>
              <TableCell>{c.approved}</TableCell>
              <TableCell>{c.paid}</TableCell>
               <TableCell>
                <Button component={Link} to={`/approveclaim?id=${c.id}`} size="small">Approve Claim</Button>
                <Button component={Link} to={`/payclaim?id=${c.id}`} size="small">Claim Policy</Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={7} align="center">No Claims Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      )}
    </Container>
  );
};

export default ClaimsList;