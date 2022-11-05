import React from 'react';
import { IconOnlyWalletButton } from 'components/Header/desktop/IconOnlyWalletButton';
import { useMediaQuery } from 'react-responsive';
import { ConnectedButton } from './ConnectedButton';
import { NotConnectedButton } from './NotConnectedButton';
import { AxlUSDC, u } from '@anchor-protocol/types';

export interface ConnectWalletButtonProps {
  initializing?: boolean;
  walletAddress?: string;
  totalAxlUSDC?: u<AxlUSDC>;
  onClick: () => void;
}

export function ConnectWalletButton({
  initializing = false,
  walletAddress,
  totalAxlUSDC = '0' as u<AxlUSDC>,
  onClick,
}: ConnectWalletButtonProps) {
  // ---------------------------------------------
  // dependencies
  // ---------------------------------------------
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

  // ---------------------------------------------
  // presentation
  // ---------------------------------------------

  if (initializing) {
    return isSmallScreen ? (
      <IconOnlyWalletButton disabled />
    ) : (
      <NotConnectedButton disabled>Initializing Wallet...</NotConnectedButton>
    );
  }

  if (!walletAddress) {
    return isSmallScreen ? (
      <IconOnlyWalletButton onClick={onClick} />
    ) : (
      <NotConnectedButton onClick={onClick}>Connect Wallet</NotConnectedButton>
    );
  }

  return isSmallScreen ? (
    <IconOnlyWalletButton onClick={onClick} connected />
  ) : (
    <ConnectedButton
      walletAddress={walletAddress}
      totalAxlUSDC={totalAxlUSDC}
      onClick={onClick}
    />
  );
}
