import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Table, Modal } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';
import { PaddingSection } from './PaddingSection';
import {
  useAnchorWebapp,
  useBidByUserByCollateralQuery,
} from '@anchor-protocol/app-provider';
import { formatUToken, formatUTokenWithPostfixUnits } from '@libs/formatter';
import { ActionButton } from '@libs/neumorphism-ui/components/ActionButton';
import { Luna, u } from '@libs/types';
import { BigSource } from 'big.js';
import { useAccount } from 'contexts/account';
import { useConfirm } from '@libs/neumorphism-ui/components/useConfirm';
import { useWithdrawLiquidationBidTx } from '@anchor-protocol/app-provider/tx/liquidate/withdraw';
import { useLiquidationWithdrawForm } from '@anchor-protocol/app-provider/forms/liquidate/withdraw';
import { BroadcastTxStreamResult } from './types';
import { TxResultRenderer } from 'components/tx/TxResultRenderer';
import { StreamStatus } from '@rx-stream/react';
import { Dialog } from '@libs/neumorphism-ui/components/Dialog';

export interface MyBidsSectionProps {
  className?: string;
}

export function MyBidsSection({ className }: MyBidsSectionProps) {
  const { connected } = useAccount();
  const { contractAddress } = useAnchorWebapp();
  const { data: { bidByUser } = {} } = useBidByUserByCollateralQuery(
    contractAddress.cw20.bLuna,
  );

  const myBids = useMemo(
    () =>
      (bidByUser?.bids ?? [])
        //.filter(bid => parseFloat(bid.amount) !== 0)
        .map((bid) => ({
          premium: `${bid.premium_slot} %`,
          remaining: formatUTokenWithPostfixUnits(bid.amount),
          status: 'Active',
          idx: bid.idx,
          filled: formatUToken(bid.pending_liquidated_collateral),
        })),
    [bidByUser],
  );

  const HeaderCell = styled(TableCell)({
    backgroundColor: 'unset',
  });

  const state = useLiquidationWithdrawForm();

  const [openConfirm, confirmElement] = useConfirm();
  const [withdrawBidTx, withdrawBidTxResult] = useWithdrawLiquidationBidTx();
  const [isSubmittingTx, setIsSubmittingTx] = useState(false);

  const withdrawBid = useCallback(
    async (
      idx: string,
      txFee: u<Luna<BigSource>> | undefined,
      confirm: ReactNode,
    ) => {
      setIsSubmittingTx(true);
      if (!connected || !withdrawBidTx) {
        return;
      }

      if (confirm) {
        const userConfirm = await openConfirm({
          description: confirm,
          agree: 'Proceed',
          disagree: 'Cancel',
        });

        if (!userConfirm) {
          return;
        }
      }

      withdrawBidTx({
        bid_idx: idx,
      });
    },
    [connected, withdrawBidTx, openConfirm],
  );

  const renderBroadcastTx = useMemo(() => {
    return (
      <TxResultRenderer
        resultRendering={
          (withdrawBidTxResult as BroadcastTxStreamResult)?.value
        }
        onExit={() => setIsSubmittingTx(false)}
      />
    );
  }, [withdrawBidTxResult]);

  return (
    <PaddingSection className={className}>
      <h2 style={{ padding: 10 }}>
        <IconSpan>
          My Bids{' '}
          <InfoTooltip>
            You can see all the bids you have placed in the liquidation queue
          </InfoTooltip>
        </IconSpan>
      </h2>
      {isSubmittingTx &&
        (withdrawBidTxResult?.status === StreamStatus.IN_PROGRESS ||
          withdrawBidTxResult?.status === StreamStatus.DONE) && (
          <Modal open disableEnforceFocus>
            <Dialog
              className={className}
              style={{ width: 720, touchAction: 'none' }}
            >
              {renderBroadcastTx}
            </Dialog>
          </Modal>
        )}

      <TableContainer style={{ maxHeight: 300, overflow: 'scroll' }}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <HeaderCell>Premium</HeaderCell>
              <HeaderCell align="right">Bid Remaining (axlUSDC)</HeaderCell>
              <HeaderCell align="right">Bid Status</HeaderCell>
              <HeaderCell align="right">Amount filled (bLuna)</HeaderCell>
              <HeaderCell align="right"></HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myBids.map((bid, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{bid.premium}</TableCell>
                <TableCell align="right">{bid.remaining}</TableCell>
                <TableCell align="right">{bid.status}</TableCell>
                <TableCell align="right">{bid.filled}</TableCell>
                <TableCell align="right">
                  <ActionButton
                    style={{ height: 35, padding: '10px 10px' }}
                    onClick={async () => {
                      state.updateBidIdx(bid.idx);
                      withdrawBid(bid.idx, state.txFee, state.invalidNextTxFee);
                    }}
                  >
                    Retract
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {confirmElement}
    </PaddingSection>
  );
}
