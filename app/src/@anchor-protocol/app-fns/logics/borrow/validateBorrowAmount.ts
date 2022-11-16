import type { AxlUSDC, u } from '@anchor-protocol/types';
import { microfy } from '@libs/formatter';
import { BigSource } from 'big.js';

export function validateBorrowAmount(
  borrowAmount: AxlUSDC,
  max: u<AxlUSDC<BigSource>>,
): string | undefined {
  if (borrowAmount.length === 0) {
    return undefined;
  } else if (microfy(borrowAmount).gt(max ?? 0)) {
    return `Cannot borrow more than the borrow limit.`;
  }
  return undefined;
}
