
import { liquidationDepositForm, LiquidationDepositFormStates } from '@anchor-protocol/app-fns/forms/liquidate/deposit';
import { useAnchorBank } from '@anchor-protocol/app-provider/hooks/useAnchorBank';
import { UST } from '@anchor-protocol/types';
import { useFixedFee} from '@libs/app-provider';
import { useForm } from '@libs/use-form';
import { useAccount } from 'contexts/account';
import { useCallback } from 'react';

export interface LiquidationDepositFormReturn extends LiquidationDepositFormStates {
  updateDepositAmount: (depositAmount: UST) => void;
  updatePremiumValue: (premium: number | undefined) => void;
}

export function useLiquidationDepositForm(): LiquidationDepositFormReturn {
  const { connected } = useAccount();

  const fixedFee = useFixedFee();

  const { tokenBalances: {uUST, uLuna} } = useAnchorBank();

  const [input, states] = useForm(
    liquidationDepositForm,
    {
      isConnected: connected,
      fixedGas: fixedFee,
      userUUSTBalance: uUST,
      userULunaBalance: uLuna, 
    },
    () => ({ depositAmount: '' as UST, premium: 0 }),
  );

  const updateDepositAmount = useCallback(
    (depositAmount: UST) => {
      input({
        depositAmount,
      });
    },
    [input],
  );

  const updatePremiumValue = useCallback(
    (premium: number | undefined) => {
      input({
        premium
      });
    },
    [input],
  );

  return {
    ...states,
    updateDepositAmount,
    updatePremiumValue,
  };
}
