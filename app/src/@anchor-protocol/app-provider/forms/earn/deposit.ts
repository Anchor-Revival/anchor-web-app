import {
  earnDepositForm,
  EarnDepositFormStates,
} from '@anchor-protocol/app-fns';
import { AxlUSDC } from '@anchor-protocol/types';
import { useFixedFee, useUstTax } from '@libs/app-provider';
import { useForm } from '@libs/use-form';
import { useAccount } from 'contexts/account';
import { useBalances } from 'contexts/balances';
import { useCallback } from 'react';

export interface EarnDepositFormReturn extends EarnDepositFormStates {
  updateDepositAmount: (depositAmount: AxlUSDC) => void;
}

export function useEarnDepositForm(): EarnDepositFormReturn {
  const { connected } = useAccount();

  const fixedFee = useFixedFee();

  const { uAxlUSDC } = useBalances();

  const { taxRate, maxTax } = useUstTax();

  const [input, states] = useForm(
    earnDepositForm,
    {
      isConnected: connected,
      fixedGas: fixedFee,
      taxRate: taxRate,
      maxTaxUUSD: maxTax,
      userUUSTBalance: uAxlUSDC,
    },
    () => ({ depositAmount: '' as AxlUSDC }),
  );

  const updateDepositAmount = useCallback(
    (depositAmount: AxlUSDC) => {
      input({
        depositAmount,
      });
    },
    [input],
  );

  return {
    ...states,
    updateDepositAmount,
  };
}
