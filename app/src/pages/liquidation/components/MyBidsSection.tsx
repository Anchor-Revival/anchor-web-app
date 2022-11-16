import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { styled } from '@material-ui/core';
import { PaddingSection } from './PaddingSection';

export interface MyBidsSectionProps {
  className?: string;
}

export function MyBidsSection({ className }: MyBidsSectionProps) {
  function createBidData(
    collateral: string,
    premium: number,
    remaining: number,
    status: string,
    filled: number,
  ) {
    return { collateral, premium, remaining, status, filled };
  }

  const myBids = [
    createBidData('aLuna', 159, 6.0, 'Filled', 5),
    createBidData('aLuna', 237, 9.0, 'Partial', 9),
    createBidData('aLuna', 262, 16.0, 'Total', 0),
    createBidData('aLuna', 305, 3.7, 'Unfilled', 6),
    createBidData('aLuna', 356, 16.0, 'Not active', 8),
  ];

  const HeaderCell = styled(TableCell)({
    backgroundColor: 'unset',
  });

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

      <TableContainer style={{ maxHeight: 300, overflow: 'scroll' }}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <HeaderCell>Collateral</HeaderCell>
              <HeaderCell align="right">Premium</HeaderCell>
              <HeaderCell align="right">Bid Remaining</HeaderCell>
              <HeaderCell align="right">Bid Status</HeaderCell>
              <HeaderCell align="right">Amount filled</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myBids.map((bid, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell scope="row">{bid.collateral}</TableCell>
                <TableCell align="right">{bid.premium}</TableCell>
                <TableCell align="right">{bid.remaining}</TableCell>
                <TableCell align="right">{bid.status}</TableCell>
                <TableCell align="right">{bid.filled}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaddingSection>
  );
}
