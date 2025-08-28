import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.NEXT_ALCHEMY_API_KEY, // from dashboard
  network: Network.MONAD_TESTNET,  
};

export const alchemy = new Alchemy(settings);
