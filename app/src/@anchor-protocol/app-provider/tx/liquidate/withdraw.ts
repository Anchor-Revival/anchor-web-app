import { withdrawLiquidationBidTx } from '@anchor-protocol/app-fns/tx/liquidate/withdraw';
import { Luna, u } from '@anchor-protocol/types';
import { useRefetchQueries } from '@libs/app-provider';
import { useStream } from '@rx-stream/react';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCallback } from 'react';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_TX_KEY } from '../../env';

export interface WithdrawLiquidationBidTxParams {
  bid_idx: string;
  onTxSucceed?: () => void;
}

export function useWithdrawLiquidationBidTx() {
  const connectedWallet = useConnectedWallet();

  const { constants, txErrorReporter, queryClient, contractAddress } =
    useAnchorWebapp();

  const refetchQueries = useRefetchQueries();

  const stream = useCallback(
    ({ bid_idx, onTxSucceed }: WithdrawLiquidationBidTxParams) => {
      if (!connectedWallet || !connectedWallet.availablePost) {
        throw new Error('Can not post!');
      }

      return withdrawLiquidationBidTx({
        // fabricateMarketDepositStableCoin
        walletAddr: connectedWallet.walletAddress,
        liquidationQueueAddr:
          contractAddress.liquidation.liquidationQueueContract,
        bLunaAddr: contractAddress.cw20.bLuna,
        bid_idx,
        // post
        network: connectedWallet.network,
        post: connectedWallet.post,
        txFee: '0' as u<Luna>,
        gasFee: constants.gasWanted,
        gasAdjustment: constants.gasAdjustment,
        // query
        queryClient,
        // error
        txErrorReporter,
        // side effect
        onTxSucceed: () => {
          onTxSucceed?.();
          refetchQueries(ANCHOR_TX_KEY.EARN_DEPOSIT);
        },
      });
    },
    [
      connectedWallet,
      contractAddress.liquidation.liquidationQueueContract,
      contractAddress.cw20.bLuna,
      constants.gasWanted,
      constants.gasAdjustment,
      queryClient,
      txErrorReporter,
      refetchQueries,
    ],
  );

  const streamReturn = useStream(stream);

  return connectedWallet ? streamReturn : [null, null];
}
