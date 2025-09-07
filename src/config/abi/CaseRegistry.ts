const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_aiJudge",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_challengeSecs",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "defendant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CaseOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "challenger",
        type: "address",
      },
    ],
    name: "Challenged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct CaseRegistry.Evidence",
        name: "evidence",
        type: "tuple",
      },
    ],
    name: "EvidenceSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum CaseRegistry.Outcome",
        name: "outcome",
        type: "uint8",
      },
    ],
    name: "Finalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum CaseRegistry.Outcome",
        name: "outcome",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "justification",
        type: "string",
      },
    ],
    name: "Proposed",
    type: "event",
  },
  {
    inputs: [],
    name: "aiJudge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cases",
    outputs: [
      {
        internalType: "address",
        name: "claimant",
        type: "address",
      },
      {
        internalType: "address",
        name: "defendant",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "complaint",
        type: "string",
      },
      {
        internalType: "string",
        name: "justification",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "deadline",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "proposedAt",
        type: "uint64",
      },
      {
        internalType: "enum CaseRegistry.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "enum CaseRegistry.Outcome",
        name: "outcome",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CaseRegistry.Evidence[]",
        name: "evidences",
        type: "tuple[]",
      },
    ],
    name: "challenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "challengeSecs",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "createPolicy",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
    ],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getCaseChallengeHistory",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getCaseEvidences",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CaseRegistry.Evidence[]",
        name: "claimantEvidences",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CaseRegistry.Evidence[]",
        name: "defendantEvidences",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "party",
        type: "address",
      },
    ],
    name: "getPartyCaseIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextCaseId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextPolicyId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "defendant",
        type: "address",
      },
      {
        internalType: "string",
        name: "complaint",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "deadline",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CaseRegistry.Evidence[]",
        name: "initialEvidences",
        type: "tuple[]",
      },
    ],
    name: "openCase",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "policies",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "policyOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        internalType: "enum CaseRegistry.Outcome",
        name: "outcome",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "justification",
        type: "string",
      },
    ],
    name: "proposeDecision",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "caseId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CaseRegistry.Evidence",
        name: "evidence",
        type: "tuple",
      },
    ],
    name: "submitEvidence",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default abi;
