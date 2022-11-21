
import { liquidationWithdrawForm, LiquidationWithdrawFormStates } from '@anchor-protocol/app-fns/forms/liquidate/withdraw';
import { useAnchorBank } from '@anchor-protocol/app-provider/hooks/useAnchorBank';
import { useFixedFee} from '@libs/app-provider';
import { useForm } from '@libs/use-form';
import { useAccount } from 'contexts/account';
import { useCallback } from 'react';

export interface LiquidationWithdrawFormReturn extends LiquidationWithdrawFormStates {
  updateBidIdx: (bid_idx: string) => void;
}

export function useLiquidationWithdrawForm(): LiquidationWithdrawFormReturn {
  const { connected } = useAccount();

  const fixedFee = useFixedFee();

  const { tokenBalances: {uUST, uLuna} } = useAnchorBank();
  const [input, states] = useForm(
    liquidationWithdrawForm,
    {
      isConnected: connected,
      fixedGas: fixedFee,
      userUUSTBalance: uUST,
      userULunaBalance: uLuna, 
    },
    () => ({ bid_idx: '' }),
  );

  const updateBidIdx = useCallback(
    (bid_idx: string) => {
      input({
        bid_idx
      });
    },
    [input],
  );

  return {
    ...states,
    updateBidIdx,
  };
}
