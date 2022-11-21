import { UST, Luna, u } from '@anchor-protocol/types';
import { EstimatedFee } from '@libs/app-provider';
import { max, min } from '@libs/big-math';
import { FormReturn } from '@libs/use-form';
import big, { Big } from 'big.js';

export interface LiquidationWithdrawCollateralFormInput {
}

export interface LiquidationWithdrawCollateralFormDependency {
  userULunaBalance: u<UST>;
  fixedGas: EstimatedFee;
  isConnected: boolean;
}

export interface LiquidationWithdrawCollateralFormStates extends LiquidationWithdrawCollateralFormInput {
  availablePost: boolean;
  txFee?: EstimatedFee;
  invalidTxFee?: string;
  invalidNextTxFee?: string;
}

export interface LiquidationWithdrawCollateralFormAsyncStates {}

export const liquidationWithdrawCollateralForm =
  ({
    fixedGas,
    userULunaBalance,
    isConnected,
  }: LiquidationWithdrawCollateralFormDependency) =>
  ({ }): FormReturn<
    LiquidationWithdrawCollateralFormStates,
    LiquidationWithdrawCollateralFormAsyncStates
  > => {

    console.log(fixedGas)
    // txFee
    const txFee = fixedGas.txFee;

    // invalidTxFee
    const invalidTxFee = (() => {
      return isConnected && txFee && big(userULunaBalance).lt(txFee)
        ? 'Not enough transaction fees'
        : undefined;
    })();

    // invalidDepositAmount
    const invalidDepositAmount = (() => {
      if (!isConnected  || !txFee) {
        return undefined;
      }

      return undefined;
    })();

    // invalidNextTxFee
    const invalidNextTxFee = (() => {
      if (
        !isConnected ||
        !!invalidDepositAmount
      ) {
        return undefined;
      }
      return big(userULunaBalance).lt(big(fixedGas.txFee).mul(2))
        ? `You don't have enough gas to pay for the transaction`
        : undefined;
    })();

    return [
      {
        txFee: fixedGas,
        invalidTxFee,
        invalidNextTxFee,
        availablePost:
          isConnected &&
          !invalidTxFee &&
          !invalidDepositAmount,
      },
      undefined,
    ];
  };
