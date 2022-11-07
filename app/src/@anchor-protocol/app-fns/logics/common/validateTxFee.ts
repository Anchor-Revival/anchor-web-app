import type { u, Luna } from '@anchor-protocol/types';
import big, { BigSource } from 'big.js';

export function validateTxFee(
  ustBalance: u<Luna<BigSource>> | undefined,
  txFee: u<Luna<BigSource>>,
): string | undefined {
  if (big(ustBalance ?? 0).lt(txFee)) {
    return 'Not enough transaction fees';
  }
  return undefined;
}
