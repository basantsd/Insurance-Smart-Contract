import React, { useState, useEffect } from 'react';
import { connectContract, getConnectedWallet } from '../services/insurance';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ViewPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);  // <-- loading state

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);  // Start loader
      const contract = await connectContract();
      const connectedWallet = await getConnectedWallet();
      const total = Number(await contract.policyCounter());

      let tempPolicies = [];

      for (let i = 1; i <= total; i++) {
        const policy = await contract.policies(i);
        const id = i.toString();

        if (policy.policyHolder.toLowerCase() === connectedWallet.toLowerCase()) {
          tempPolicies.push({
            id: id,
            premium: policy.premium.toString(),
            coverage: policy.coverageAmount.toString(),
            start: new Date(Number(policy.startTime) * 1000).toLocaleDateString(),
            end: new Date(Number(policy.endTime) * 1000).toLocaleDateString(),
            active: policy.isActive ? "Active" : "Inactive",
            claimed: policy.isClaimed ? "Claimed" : "Not Claimed"
          });
        }
      }

      setPolicies(tempPolicies);
    } catch (err) {
      console.error("Error fetching policies:", err);
    } finally {
      setLoading(false);  // Stop loader
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={5}>My Policies</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Policy ID</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Coverage</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Claim Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.length > 0 ? policies.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.premium}</TableCell>
                <TableCell>{p.coverage}</TableCell>
                <TableCell>{p.start}</TableCell>
                <TableCell>{p.end}</TableCell>
                <TableCell>{p.active}</TableCell>
                <TableCell>{p.claimed}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/paypremium?id=${p.id}&premium=${p.premium}`} size="small">Pay Premium</Button>
                  <Button component={Link} to={`/submitclaim?id=${p.id}`} size="small">Submit Claim</Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={8} align="center">No Policies Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default ViewPolicies;
