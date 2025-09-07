// index.ts
import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { readContract } from "viem/actions";
import { sepolia } from "viem/chains";
import { ESCROW_JUDGE_ADDRESS } from "./config/addresses.ts";
import abi from "./config/abi/CaseRegistry.ts";
import "./declarations.ts";
import bodyParser from "body-parser";

enum CaseOutcome {
  NONE = "none",
  APPROVE_OPPOSER = "approve_opposer",
  REJECT_OPPOSER = "reject_opposer",
  CLEARIFY = "clearify",
  REQUEST_OPPOSER_EVIDENCE = "request_opposer_evidence",
  REQUEST_DEFENDER_EVIDENCE = "request_defender_evidence",
}

const CASE_OUTCOMES = [
  CaseOutcome.NONE,
  CaseOutcome.APPROVE_OPPOSER,
  CaseOutcome.REJECT_OPPOSER,
  CaseOutcome.CLEARIFY,
  CaseOutcome.REQUEST_OPPOSER_EVIDENCE,
  CaseOutcome.REQUEST_DEFENDER_EVIDENCE,
];

const app = express();
const port = process.env.PORT ?? "3001";

const account = privateKeyToAccount(
  process.env.AI_PRIVATE_KEY! as `0x${string}`
);

const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(),
  account,
});

const redisClient = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get-party-cases", async (req, res) => {
  const address = req.query.address as string;

  const caseIds = await readContract(walletClient, {
    address: ESCROW_JUDGE_ADDRESS,
    abi,
    functionName: "getPartyCaseIds",
    args: [address as `0x${string}`],
  });

  console.log({ caseIds });

  const cases = await Promise.all(
    caseIds.map(async (id) => {
      const caseDetails = await readContract(walletClient, {
        address: ESCROW_JUDGE_ADDRESS,
        abi,
        functionName: "cases",
        args: [id],
      });

      const caseEvidences = await readContract(walletClient, {
        address: ESCROW_JUDGE_ADDRESS,
        abi,
        functionName: "getCaseEvidences",
        args: [id],
      });

      const caseChallengeHistory = await readContract(walletClient, {
        address: ESCROW_JUDGE_ADDRESS,
        abi,
        functionName: "getCaseChallengeHistory",
        args: [id],
      });
      console.log({ caseDetails, caseEvidences });

      return {
        id: Number(id),
        claimant: caseDetails[0],
        defendant: caseDetails[1],
        token: caseDetails[2],
        amount: Number(caseDetails[3]),
        evidencesClaimant: caseEvidences[0],
        evidencesDefendant: caseEvidences[1],
        complaint: caseDetails[4],
        justification: caseDetails[5],
        challengeHistory: caseChallengeHistory,
        deadline: Number(caseDetails[6]),
        proposedAt: Number(caseDetails[7]),
        status: caseDetails[8],
        outcome: caseDetails[9],
      };
    })
  );

  return res.json(cases);
});

app.post("/propose-decision", async (req, res) => {
  const { caseId, outcome, decision } = req.body;
  console.log("Proposing decision", { caseId, outcome, decision });
  const outcomeIndex = CASE_OUTCOMES.indexOf(outcome);
  if (outcomeIndex === -1) {
    return res.status(400).json({ error: "Invalid outcome" });
  }
  await walletClient.writeContract({
    address: ESCROW_JUDGE_ADDRESS,
    abi,
    functionName: "proposeDecision",
    args: [BigInt(caseId), outcomeIndex, decision],
  });

  return res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
