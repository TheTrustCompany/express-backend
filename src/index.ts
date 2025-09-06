// index.ts
import express from "express";
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
    caseIds.map(
      async (id) =>
        await readContract(walletClient, {
          address: ESCROW_JUDGE_ADDRESS,
          abi,
          functionName: "cases",
          args: [id],
        })
    )
  );

  res.json(cases);
});

app.post("/propose-decision", async (req, res) => {
  const { caseId, outcome, decision } = req.body;
  await walletClient.writeContract({
    address: ESCROW_JUDGE_ADDRESS,
    abi,
    functionName: "proposeDecision",
    args: [BigInt(caseId), outcome, decision],
  });

  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
