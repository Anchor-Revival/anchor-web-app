import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';
import React, { useMemo } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { styled } from '@material-ui/core';
import { PaddingSection } from './PaddingSection';
import { useLiquidationHistoryQuery } from '@anchor-protocol/app-provider/queries/liquidate/history';
import { LiquidationData } from '@anchor-protocol/app-fns/queries/liquidate/history';

export interface LiquidationStatsSectionProps {
  className?: string;
}

export type Period = 'total' | 'year' | 'month' | 'week' | 'day';

export function LiquidationStatsSection({
  className,
}: LiquidationStatsSectionProps) {
  /*
  const [tab, setTab] = useState<Item>(() => tabItems[0]);

  const { uaUST = '0' as u<aUST> } = useBalances();

  const { data: { moneyMarketEpochState, overseerEpochState } = {} } =
    useEarnEpochStatesQuery();

  const apy = useDepositApy();

  const expectedInterest = useMemo(() => {
    if (!moneyMarketEpochState || !overseerEpochState) {
      return undefined;
    }

    const ustBalance = big(uaUST).mul(moneyMarketEpochState.exchange_rate);

    return ustBalance
      .mul(apy)
      .div(
        tab.value === 'month'
          ? 12
          : tab.value === 'week'
          ? 52
          : tab.value === 'day'
          ? 365
          : 1,
      ) as u<UST<Big>>;
  }, [moneyMarketEpochState, overseerEpochState, tab.value, uaUST, apy]);

*/
  function createData(
    time: Date,
    atom: number,
    axlUSDC: number,
    price: number,
  ) {
    return { time, atom, axlUSDC, price };
  }

  const { data: liquidationHistory } = useLiquidationHistoryQuery();

  const liquidations = useMemo(() => liquidationHistory?.map((liquidation: LiquidationData) => ({
    time: liquidation?.date,
    collateral: liquidation?.amountLiquidated,
    axlUSDC: liquidation?.amountPaid,
    price: liquidation?.currentPrice
  })) ?? [], [liquidationHistory]);


  const LowPaddingTableCell = styled(TableCell)({
    padding: '5px 10px',
    backgroundColor: 'unset',
  });

  return (
    <PaddingSection className={className}>
      <h2 style={{ padding: 10 }}>
        <IconSpan>
          Liquidation Stats{' '}
          <InfoTooltip>
            Some additionnal statistics about bids and liquidations
          </InfoTooltip>
        </IconSpan>
      </h2>

      <TableContainer style={{ maxHeight: 300, overflow: 'scroll' }}>
        <Table
          sx={{ minWidth: 650, padding: '5px 10px' }}
          aria-label="simple table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <LowPaddingTableCell>Time</LowPaddingTableCell>
              <LowPaddingTableCell align="right">
                aLuna Liquidated
              </LowPaddingTableCell>
              <LowPaddingTableCell align="right">
                axlUSDC Paid
              </LowPaddingTableCell>
              <LowPaddingTableCell align="right">
                Average Price
              </LowPaddingTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {liquidations.map((liquidation, index) => (
              <TableRow
                key={`${liquidation.time}-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <LowPaddingTableCell scope="row">
                  {liquidation.time}
                </LowPaddingTableCell>
                <LowPaddingTableCell align="right">
                  {liquidation.collateral}
                </LowPaddingTableCell>
                <LowPaddingTableCell align="right">
                  {liquidation.axlUSDC}
                </LowPaddingTableCell>
                <LowPaddingTableCell align="right">
                  {liquidation.price}
                </LowPaddingTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaddingSection>
  );
}
