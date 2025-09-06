// index.ts
import express from "express";
import { createClient } from "redis";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { readContract } from "viem/actions";
import { sepolia } from "viem/chains";
import { ESCROW_JUDGE_ADDRESS } from "./config/addresses.ts";
import abi from "./config/abi/EscrowJudge.ts";
import "./declarations.ts";

const app = express();
const port = process.env.PORT ?? "3000";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get-party-cases", async (req, res) => {
  const address = req.query.address as string;
  const cachedCase = await redisClient.get(address.toLowerCase());

  if (cachedCase) {
    console.log("Serving from cache");
    return res.json(JSON.parse(cachedCase));
  }

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

      return {
        id: Number(id),
        client: caseDetails[0],
        provider: caseDetails[1],
        token: caseDetails[2],
        amount: Number(caseDetails[3]),
        evidencesClient: caseEvidences[0],
        evidencesProvider: caseEvidences[1],
        justification: caseDetails[4],
        deadline: Number(caseDetails[5]),
        proposedAt: Number(caseDetails[6]),
        status: caseDetails[7],
        outcome: caseDetails[8],
      };
    })
  );

  await redisClient.set(address.toLowerCase(), JSON.stringify(cases));

  return res.json(cases);
});

app.post("/propose-decision", async (req, res) => {
  const { caseId, outcome, decision } = req.body;
  await walletClient.writeContract({
    address: ESCROW_JUDGE_ADDRESS,
    abi,
    functionName: "proposeDecision",
    args: [BigInt(caseId), outcome, decision],
  });

  return res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
