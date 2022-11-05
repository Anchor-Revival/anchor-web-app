import {
  BidPoolsByCollateral,
  bidPoolsByCollateralQuery,
} from '@anchor-protocol/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(bidPoolsByCollateralQuery);

export function useBidPoolsByCollateralQuery(
  collateralToken: HumanAddr,
  startAfter?: HumanAddr,
  limit?: number,
): UseQueryResult<BidPoolsByCollateral | undefined> {
  const { queryClient, queryErrorReporter, contractAddress } =
    useAnchorWebapp();

  const bidPoolsByCollateral = useQuery(
    [
      ANCHOR_QUERY_KEY.BID_POOLS_BY_COLLATERAL,
      queryClient,
      contractAddress.liquidation.liquidationQueueContract,
      collateralToken,
      startAfter,
      limit,
    ],
    queryFn,
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return bidPoolsByCollateral;
}
