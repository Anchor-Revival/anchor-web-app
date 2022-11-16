import type { AxlUSDC, u } from '@anchor-protocol/types';
import { microfy } from '@libs/formatter';
import { Big, BigSource } from 'big.js';

export function computeBorrowReceiveAmount(
  borrowAmount: AxlUSDC,
  txFee: u<AxlUSDC<BigSource>> | undefined,
): u<AxlUSDC<Big>> | undefined {
  return borrowAmount.length > 0 && txFee
    ? (microfy(borrowAmount).minus(txFee) as u<AxlUSDC<Big>>)
    : undefined;
}
