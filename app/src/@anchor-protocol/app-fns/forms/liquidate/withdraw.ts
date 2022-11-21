import { UST, Luna, u } from '@anchor-protocol/types';
import { max, min } from '@libs/big-math';
import { FormReturn } from '@libs/use-form';
import big, { Big } from 'big.js';

export interface LiquidationWithdrawFormInput {
  bid_idx: string;
}

export interface LiquidationWithdrawFormDependency {
  userUUSTBalance: u<UST>;
  userULunaBalance: u<UST>;
  fixedGas: u<Luna>;
  isConnected: boolean;
}

export interface LiquidationWithdrawFormStates extends LiquidationWithdrawFormInput {
  bid_idx: string;
  availablePost: boolean;
  txFee?: u<Luna>;
  invalidTxFee?: string;
  invalidNextTxFee?: string;
}

export interface LiquidationWithdrawFormAsyncStates {}

export const liquidationWithdrawForm =
  ({
    fixedGas,
    userUUSTBalance,
    userULunaBalance,
    isConnected,
  }: LiquidationWithdrawFormDependency) =>
  ({
    bid_idx,
  }: LiquidationWithdrawFormInput): FormReturn<
    LiquidationWithdrawFormStates,
    LiquidationWithdrawFormAsyncStates
  > => {
    const idxExists = !!bid_idx;
    // txFee
    const txFee = (() => {
      if (!isConnected || !idxExists) {
        return undefined;
      }

      const ratioTxFee = big("0");
      const maxTax = big("0");
      return max(min(ratioTxFee, maxTax), 0).plus(fixedGas) as u<Luna<Big>>;
    })();

    // invalidTxFee
    const invalidTxFee = (() => {
      return isConnected && txFee && big(userULunaBalance).lt(txFee)
        ? 'Not enough transaction fees'
        : undefined;
    })();

    // invalidDepositAmount
    const invalidDepositAmount = (() => {
      if (!isConnected || !idxExists || !txFee) {
        return undefined;
      }

      return undefined;
    })();

    // invalidNextTxFee
    const invalidNextTxFee = (() => {
      if (
        !isConnected ||
        !!invalidDepositAmount ||
        !idxExists
      ) {
        return undefined;
      }

      return big(userULunaBalance).lt(big(fixedGas).mul(2))
        ? `Leaving less Luna in your account may lead to insufficient transaction fees for future transactions.`
        : undefined;
    })();

    return [
      {
        bid_idx,
        txFee: txFee?.toFixed() as u<Luna>,
        invalidTxFee,
        invalidNextTxFee,
        availablePost:
          isConnected &&
          idxExists &&
          !invalidTxFee &&
          !invalidDepositAmount,
      },
      undefined,
    ];
  };
