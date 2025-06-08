import React, { useState, useEffect } from 'react';
import { connectContract, getConnectedWallet } from '../services/insurance';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ViewPolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
  try {
        const contract = await connectContract();
        const connectedWallet = await getConnectedWallet();
        console.log(await contract.policyIds,"-------");
        const lengthBigInt = await contract.policyIds.length;
        const total = Number(lengthBigInt);
        console.log(connectedWallet);
        console.log(lengthBigInt);

        let tempPolicies = [];

        for (let i = 0; i < total; i++) {
        const policyId = await contract.policyIds(i);
        const id = policyId.toString();
        const policy = await contract.policies(id);

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
        alert("Policies loaded successfully!");
    } catch (err) {
        console.error("Error fetching policies:", err);
        alert(err.message);
    }
    };


  return (
    <Container>
      <Typography variant="h5" mt={5}>My Policies</Typography>
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
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={7} align="center">No Policies Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ViewPolicies;