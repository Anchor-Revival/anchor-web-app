import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';

import React, { ChangeEvent, ReactNode, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControlLabel,
  Radio,
  Grid,
  Slider,
  InputAdornment,
  OutlinedInput,  
  FormHelperText,
  Button,
  Modal,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useAccount } from 'contexts/account';
import { PaddingSection } from './PaddingSection';
import { useLiquidationDepositForm } from '@anchor-protocol/app-provider/forms/liquidate/deposit';
import { useFormatters } from '@anchor-protocol/formatter';
import { Luna, u, UST } from '@libs/types';
import { AmountSlider } from './AmountSlider';
import big, { Big, BigSource } from 'big.js';
import { UST_INPUT_MAXIMUM_DECIMAL_POINTS, UST_INPUT_MAXIMUM_INTEGER_POINTS } from '@anchor-protocol/notation';
import { NumberInput } from '@libs/neumorphism-ui/components/NumberInput';
import styled from 'styled-components';
import { usePlaceLiquidationBidTx } from '@anchor-protocol/app-provider/tx/liquidate/deposit';
import { useConfirm } from '@libs/neumorphism-ui/components/useConfirm';
import { TxFeeList, TxFeeListItem } from 'components/TxFeeList';
import { StreamStatus } from '@rx-stream/react';
import { TxResultRenderer } from 'components/tx/TxResultRenderer';
import { BroadcastTxStreamResult } from './types';
import { Dialog } from '@libs/neumorphism-ui/components/Dialog';
import { useAnchorWebapp, useBidByUserByCollateralQuery } from '@anchor-protocol/app-provider';
import { formatUToken } from '@libs/formatter';
import { bLuna } from '@anchor-protocol/types';
import { useLiquidationWithdrawCollateralForm } from '@anchor-protocol/app-provider/forms/liquidate/collateral';
import { useLiquidationWithdrawCollateralTx } from '@anchor-protocol/app-provider/tx/liquidate/collateral';
import { defaultFee, EstimatedFee } from '@libs/app-provider';

export interface PlaceBidSectionProps {
  className?: string;
}

export function PlaceBidSectionBase({ className }: PlaceBidSectionProps) {
  const { connected } = useAccount();
  const { contractAddress } = useAnchorWebapp();


  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {data: { bidByUser } = {}} = useBidByUserByCollateralQuery(contractAddress.cw20.bLuna);
 const {
    axlUSDC: { formatInput, demicrofy },
    luna,
    bLuna : bluna
  } = useFormatters();

  const [withdrawable_number, withdrawable_balance]= useMemo(
    () =>  {
        const withdrawable_number = (bidByUser?.bids ?? [])
            .reduce((filledSum, bid) => filledSum.plus(big(bid.pending_liquidated_collateral)), big(0)) as u<bLuna<Big>>
        let parsedWithdrawal = bluna?.formatOutput(bluna.demicrofy(withdrawable_number));
        if(parsedWithdrawal === "0"){
          parsedWithdrawal = "0.000000"
        }
        const withdrawable = `${parsedWithdrawal } aLuna`;
        return [withdrawable_number, withdrawable]
      }
      , [bidByUser, bluna])


  const handleSliderChange = (event: any, newValue: any) => {
    state.updatePremiumValue(newValue);
  }; 
  const handleInputChange = (event: any) => {
    state.updatePremiumValue(
      event.target.value === '' ? undefined : (Number(event.target.value)),
    );
  };


  /*******************************
   * 
   * Place Bid Submit Section
   * 
   * *****************************/

  const state = useLiquidationDepositForm();
  const [openConfirm, confirmElement] = useConfirm();
  const [placeBid, placeBidTxResult] = usePlaceLiquidationBidTx();
  const [isSubmittingBidTx, setIsSubmittingBidTx] = useState(false);

  const proceedBid = useCallback(
    async (
      depositAmount: UST,
      premium: number,
      txFee: u<Luna<BigSource>> | undefined,
      confirm: ReactNode,
    ) => {
      setIsSubmittingBidTx(true);
      if (!connected || !placeBid) {
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

      placeBid({
        depositAmount,
        premium,
        txFee: (txFee ?? 0).toString() as u<Luna>,
      });
    },
    [connected, placeBid, openConfirm],
  );

  const renderBroadcastBidTx = useMemo(() => {
    return (
      <TxResultRenderer
        resultRendering={(placeBidTxResult as BroadcastTxStreamResult)?.value}
        onExit={() => setIsSubmittingBidTx(false)}
      />
    );
  }, [placeBidTxResult]);



  /*******************************
   * 
   * Withdraw liquidated Collateral Submit Section
   * 
   * *****************************/

  const collateralState = useLiquidationWithdrawCollateralForm();
  const [withdrawCollateralTx, withdrawCollateralTxResult] = useLiquidationWithdrawCollateralTx();
  const [isSubmittingCollateralTx, setIsSubmittingCollateralTx] = useState(false);

  const proceedWithdrawCollateral = useCallback(
    async (
      txFee: EstimatedFee | undefined,
      confirm: ReactNode,
    ) => {
      setIsSubmittingCollateralTx(true);
      if (!connected || !withdrawCollateralTx) {
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

      withdrawCollateralTx({
        txFee: txFee ?? defaultFee()
      });
    },
    [connected, withdrawCollateralTx, openConfirm],
  );

  useMemo(() => {
    collateralState.updateTxFee()
  }, [collateralState]);


  const renderBroadcastCollateralTx = useMemo(() => {
    return (
      <TxResultRenderer
        resultRendering={(withdrawCollateralTxResult as BroadcastTxStreamResult)?.value}
        onExit={() => setIsSubmittingCollateralTx(false)}
      />
    );
  }, [withdrawCollateralTxResult]);

  return (
    <PaddingSection className={className} padding="20px 20px">
      <h2>
        <IconSpan>
          Place Bid{' '}
          <InfoTooltip>
            Use the following form to place a bid in the liquidation queue
          </InfoTooltip>
        </IconSpan>
      </h2>
      { (isSubmittingBidTx && (placeBidTxResult?.status === StreamStatus.IN_PROGRESS || placeBidTxResult?.status === StreamStatus.DONE)) && 
        <Modal open disableBackdropClick disableEnforceFocus>
          <Dialog className={className} style={{width:720, touchAction: "none"}}>{renderBroadcastBidTx}</Dialog>
        </Modal>
      }
      { (isSubmittingCollateralTx && (withdrawCollateralTxResult ?.status === StreamStatus.IN_PROGRESS || withdrawCollateralTxResult ?.status === StreamStatus.DONE)) && 
        <Modal open disableBackdropClick disableEnforceFocus>
          <Dialog className={className} style={{width:720, touchAction: "none"}}>{renderBroadcastCollateralTx}</Dialog>
        </Modal>
      }
      <form onSubmit={(e) => {
        e.preventDefault();
        proceedBid(state.depositAmount, state.premium ?? 0, state.txFee, state.invalidNextTxFee)
      }}>
        {/* register your input into the hook by invoking the "register" function */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography id="input-slider" gutterBottom>
              Premium (Luna discount)
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={state.premium || 0}
                  defaultValue={5}
                  step={1}
                  marks
                  min={0}
                  max={30}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  label=""
                  onChange={({ target }: ChangeEvent<HTMLInputElement>, newValue: number) => {
                    handleSliderChange(target, newValue);
                  }}
                />
              </Grid>
              <Grid item>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  value={state.premium ?? ''}
                  margin="dense"
                  onChange = {handleInputChange}
                  inputProps={{
                    'step': 1,
                    'min': 0,
                    'max': 30,
                    'type': 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom>
                  Bid amount
                </Typography>
                {/*<Input
                  {...register('bid_amount', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      <strong>axlUSDC</strong>
                    </InputAdornment>
                  }
                  error={errors.bid_amount && true}
                  inputProps={{
                    type: 'number',
                  }}
                  fullWidth
                  aria-describedby="bid-amount-helper-text"
                />*/}
                <NumberInput
                  //{...register('bid_amount', { required: true })}
                  className="amount"
                  value={state.depositAmount}
                  maxIntegerPoinsts={UST_INPUT_MAXIMUM_INTEGER_POINTS}
                  maxDecimalPoints={UST_INPUT_MAXIMUM_DECIMAL_POINTS}
                  label="AMOUNT"
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>{
                    state.updateDepositAmount(target.value as UST)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">axlUSDC</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                {big(state.maxAmount).gt(0) && (
                  <figure className="graph">
                    <AmountSlider
                      disabled={!connected}
                      max={Number(demicrofy(state.maxAmount))}
                      txFee={Number(demicrofy(state.txFee ?? ('0' as UST)))}
                      value={Number(state.depositAmount)}
                      onChange={(value) => {
                        state.updateDepositAmount(formatInput(value.toString() as UST));
                      }}
                    />
                  </figure>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Radio color="default" value="accept-terms" fullwidth="true" />
              }
              onChange={() => setAcceptedTerms(true)}
              label={
                <Typography variant="body2">
                  Accept that you are using this queue at you own risks
                </Typography>
              }
              labelPlacement="end"
              aria-describedby="bid-terms-helper-text"
            />
          </Grid>
          {state.txFee && (
          <TxFeeList className="receipt" >
            {big(state.txFee).gt(0) && (
              <TxFeeListItem label={<IconSpan>Tx Fee</IconSpan>}>
                {`${luna.formatOutput(luna.demicrofy(state.txFee))} ${luna.symbol}`}
              </TxFeeListItem>
            )}
          </TxFeeList>
        )}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            color="primary"
            disabled={
              !connected || 
              !state.depositAmount || 
              !acceptedTerms ||
              !proceedBid
            }
            className="place-bid-button"
          >
            Place My Bid
          </Button>
          <Grid item xs={12} style={{padding: "12px 0px", marginTop: 20}}>
            <h2>
              <IconSpan>
                Withdraw defaulted Collateral{' '}
                <InfoTooltip>
                  Use the following form to withdraw collateral that was defaulted thanks to your deposit in the pool
                </InfoTooltip>
              </IconSpan>
            </h2>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <OutlinedInput
                  disabled
                  fullWidth
                  value={withdrawable_balance}
                  style={{ fontSize: '3em' }}
                />
              </Grid>
              {/*!withdrawable_number.eq(0) &&*/ collateralState.txFee?.txFee && (
                <TxFeeList className="receipt" >
                  {big(collateralState.txFee?.txFee).gt(0) && (
                    <TxFeeListItem label={<IconSpan>Tx Fee</IconSpan>}>
                      {`${luna.formatOutput(luna.demicrofy(collateralState.txFee?.txFee))} ${luna.symbol}`}
                    </TxFeeListItem>
                  )}
                </TxFeeList>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={
                    !connected ||
                    !withdrawable_number ||
                    !collateralState.txFee || 
                    /*withdrawable_number.eq(big(0)) || */
                    !proceedWithdrawCollateral
                  }
                  onClick={
                    () => proceedWithdrawCollateral(
                      collateralState.txFee, collateralState.invalidNextTxFee
                    )}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </PaddingSection>
  );
}

export const PlaceBidSection = styled(PlaceBidSectionBase)`
  
  .amount {
    width: 100%;
    margin-bottom: 5px;

    .MuiTypography-colorTextSecondary {
      color: currentColor;
    }
  }
  .graph {
    margin-top: 80px;
    margin-bottom: 40px;
  }


  .receipt {
    width: 100%
  }

  .place-bid-button {
    margin-top: 30px
  }

`
