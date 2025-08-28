import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MONAD_TESTNET, 
};

const alchemy = new Alchemy(config);

export default async function handler(req, res) {
  try {
    const { address } = req.query;
    const count = await alchemy.core.getTransactionCount(address, "latest");
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tx count" });
  }
}
