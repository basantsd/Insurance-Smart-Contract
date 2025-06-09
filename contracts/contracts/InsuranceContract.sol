// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InsuranceContract {

    address public insurer;  // Owner of the contract

    constructor(){
        insurer = msg.sender;
    }

    enum PolicyStatus { Inactive, Active, Expired }
    enum ClaimStatus { Active, NotSubmitted, Submitted, Approved, Rejected, Paid }

    struct Policy{
        address policyHolder;
        uint256 premium;
        uint256 coverageAmount;
        uint256 startTime;
        uint256 duration;
        PolicyStatus status;
        ClaimStatus claimStatus;
    }

    struct Claim{
        uint256 policyId;
        uint256 claimAmount;
        string reason;
        bool isPaid;
        ClaimStatus status;
    }

    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public userPolicies;
    mapping(uint256 => Claim) public claims;

    uint256 public policyCounter = 0;
    uint256 public claimCounter = 0;

    // Events for transparency and auditing
    event PolicyIssued(uint policyId, address indexed policyHolder, uint premium, uint coverageAmount, uint duration);
    event PremiumPaid(uint policyId, address indexed policyHolder, uint amount);
    event ClaimSubmitted(uint claimId, uint policyId, uint claimAmount, string reason);
    event ClaimApproved(uint claimId, uint policyId);
    event ClaimPaid(uint claimId, uint policyId, address indexed policyHolder, uint amount);

    // Modifier: Only Insurer can call
    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only insurer can perform this action");
        _;
    }

    modifier onlyInsurerHolder(uint256 _policyId) {
        require(policies[_policyId].policyHolder == msg.sender, "Only policyholder can perform this action");
        _;
    }

    // Issue new policy (only insurer can issue)
    function issuePolicy(address _policyHolder, uint _premium, uint _coverageAmount, uint _durationInDays) external onlyInsurer {
        policyCounter++;
        policies[policyCounter] = Policy(
            _policyHolder,
            _premium,
            _coverageAmount,
            block.timestamp,
            block.timestamp + (_durationInDays * 1 days),
            PolicyStatus.Active,
            ClaimStatus.Active
        );
        userPolicies[_policyHolder].push(policyCounter);
        emit PolicyIssued(policyCounter, _policyHolder, _premium, _coverageAmount, _durationInDays);
    }

    // Policyholder pays premium directly through smart contract
    function payPremium(uint _policyId) external payable {
        Policy storage policy = policies[_policyId];
        require(policy.policyHolder == msg.sender, "Only policyholder can pay premium");
        require(policy.status == PolicyStatus.Active, "Policy is not active");
        require(block.timestamp <= policy.duration, "Policy has expired");
        require(msg.value == policy.premium, "Incorrect premium amount");

        emit PremiumPaid(_policyId, msg.sender, msg.value);
    }

    // Policyholder submits claim
    function submitClaim(uint _policyId, uint _claimAmount, string memory _reason) external {
        Policy storage policy = policies[_policyId];
        require(policy.policyHolder == msg.sender, "Only policyholder can submit claim");
        require(policy.status == PolicyStatus.Active, "Policy is not active");
        require(block.timestamp <= policy.duration, "Policy expired");
        require(policy.claimStatus != ClaimStatus.Active, "Policy not active for claim");

        claimCounter++;
        claims[claimCounter] = Claim(_policyId, _claimAmount, _reason,false, ClaimStatus.Submitted);

        emit ClaimSubmitted(claimCounter, _policyId, _claimAmount, _reason);
    }

    // Insurer approves the claim
    function approveClaim(uint _claimId) external onlyInsurer {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Submitted, "Claim is not submitted or already approved");
        claim.status = ClaimStatus.Approved;
        emit ClaimApproved(_claimId, claim.policyId);
    }

    // Insurer pays the approved claim
    function payClaim(uint _claimId) external onlyInsurer {
        Claim storage claim = claims[_claimId];
        Policy storage policy = policies[claim.policyId];

        require(claim.status == ClaimStatus.Approved, "Claim not approved");
        require(!claim.isPaid, "Claim already paid");
        require(address(this).balance >= claim.claimAmount, "Insufficient contract balance");
        require(policy.status == PolicyStatus.Active, "Policy is not active");
        require(policy.claimStatus != ClaimStatus.Paid, "Policy claim already paid");

        claim.isPaid = true;
        policy.claimStatus = ClaimStatus.Paid;
        payable(policy.policyHolder).transfer(claim.claimAmount);

        emit ClaimPaid(_claimId, claim.policyId, policy.policyHolder, claim.claimAmount);
    }

    // Allow Insurer to deposit fund into contract (for payouts)
    function fundContract() external payable onlyInsurer {}

    // View contract balance
    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }
}