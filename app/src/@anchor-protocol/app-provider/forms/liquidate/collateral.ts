
import { liquidationWithdrawCollateralForm, LiquidationWithdrawCollateralFormStates } from '@anchor-protocol/app-fns/forms/liquidate/collateral';
import { getLiquidationWithdrawCollateralMsg } from '@anchor-protocol/app-fns/tx/liquidate/collateral';
import { useAnchorWebapp } from '@anchor-protocol/app-provider/contexts/context';
import { useAnchorBank } from '@anchor-protocol/app-provider/hooks/useAnchorBank';
import { defaultFee, EstimatedFee, useEstimateFee } from '@libs/app-provider';
import { useForm } from '@libs/use-form';
import { useAccount } from 'contexts/account';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import big, { Big } from "big.js";
import { Gas, HumanAddr, Luna, u } from '@libs/types';

export interface LiquidationWithdrawCollateralFormReturn extends LiquidationWithdrawCollateralFormStates {
  updateTxFee: () => void;
}

function useTxFee(){
  const { terraWalletAddress } = useAccount();
  const { contractAddress } = useAnchorWebapp();
  const txFeeEstimator = useEstimateFee(terraWalletAddress);

  const { queryErrorReporter } = useAnchorWebapp();

  const { data: txFee } = useQuery(
      ["liquidation-withdraw-collateral-tx-fee", terraWalletAddress],
      async (args): Promise<EstimatedFee | void> => {
        const [, terraWalletAddress] = args.queryKey;
        if(!terraWalletAddress){
          return defaultFee()
        }

        return txFeeEstimator(

          getLiquidationWithdrawCollateralMsg({
            walletAddr: terraWalletAddress as HumanAddr,
            liquidationQueueAddr: contractAddress.liquidation.liquidationQueueContract,
            collateralToken: contractAddress.cw20.bLuna,
          })

          ).then((fee: EstimatedFee | undefined) => {
          if(!fee){
            return defaultFee()
          }
          return fee
        }).catch(error => console.log(error))
      },
      {
        refetchInterval: 1000 * 60 * 60,
        keepPreviousData: true,
        onError: queryErrorReporter,
      },
    );
  return txFee;
}



export function useLiquidationWithdrawCollateralForm(): LiquidationWithdrawCollateralFormReturn {
  const { connected, terraWalletAddress } = useAccount();

  const { tokenBalances: {uLuna} } = useAnchorBank();

  const txFee = useTxFee();

  const [, states] = useForm(
    liquidationWithdrawCollateralForm,
    {
      isConnected: connected,
      fixedGas: txFee ?? defaultFee(),
      userULunaBalance: uLuna,
    },
    () => ({}),
  );

  const updateTxFee = useCallback(
    () => {
    },
    [],
  );

  return {
    ...states,
    updateTxFee,
  };
}
