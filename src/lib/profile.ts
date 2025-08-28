import { alchemy } from "./alchemy";
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk";

export async function getWalletAge(address: string): Promise<number | null> {
  const transfers = await alchemy.core.getAssetTransfers({
    fromAddress: address,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
    ],
    order: SortingOrder.ASCENDING,
    maxCount: 1,
  });

  if (!transfers.transfers.length) {
    return null;
  }

  const firstTx = transfers.transfers[0];
  const blockNumber = firstTx.blockNum;
  const block = await alchemy.core.getBlock(parseInt(blockNumber, 16));

  const firstTxTimestamp = block.timestamp * 1000;
  const ageMs = Date.now() - firstTxTimestamp;
  return Math.floor(ageMs / (1000 * 60 * 60 * 24)); // days
}
