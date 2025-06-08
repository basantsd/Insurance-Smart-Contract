import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IssuePolicy from './pages/IssuePolicy';
import PayPremium from './pages/PayPremium';
import SubmitClaim from './pages/SubmitClaim';
import ApproveClaim from './pages/ApproveClaim';
import PayClaim from './pages/PayClaim';
import ViewPolicies from './pages/ViewPolicy';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<IssuePolicy />} />
        <Route path="/paypremium" element={<PayPremium />} />
        <Route path="/submitclaim" element={<SubmitClaim />} />
        <Route path="/approveclaim" element={<ApproveClaim />} />
        <Route path="/payclaim" element={<PayClaim />} />
        <Route path="/viewpolicy" element={<ViewPolicies />} />
      </Routes>
    </div>
  );
};

export default App;
