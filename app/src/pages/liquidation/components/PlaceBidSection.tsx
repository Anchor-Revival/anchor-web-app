import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import { InfoTooltip } from '@libs/neumorphism-ui/components/InfoTooltip';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControlLabel,
  Radio,
  Grid,
  Slider,
  InputAdornment,
  OutlinedInput,
  Input,
  FormHelperText,
  ButtonGroup,
  Button,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useAccount } from 'contexts/account';
import { PaddingSection } from './PaddingSection';

export interface PlaceBidSectionProps {
  className?: string;
}

export function PlaceBidSection({ className }: PlaceBidSectionProps) {
  const { connected } = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const withdrawable_balance = '0.00000000';
  const onSubmit = (data: any) => console.log('quid, on a pas soumis', data);
  const [premiumValue, setPremiumValue] = React.useState<number | undefined>(5);

  const handleSliderChange = (event: any, newValue: any) => {
    setPremiumValue(newValue);
  };

  const handleInputChange = (event: any) => {
    console.log(
      (event.target.value === '' ? undefined : Number(event.target.value)) || 0,
    );
    setPremiumValue(
      event.target.value === '' ? undefined : Number(event.target.value),
    );
  };
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

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography id="input-slider" gutterBottom>
              Premium (Luna discount)
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  {...register('premium ', { required: true })}
                  value={premiumValue || 0}
                  onChange={handleSliderChange}
                  defaultValue={5}
                  step={1}
                  marks
                  min={0}
                  max={30}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  label=""
                />
              </Grid>
              <Grid item>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  value={premiumValue ?? ''}
                  margin="dense"
                  onChange={handleInputChange}
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
                <Input
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
                />
                <FormHelperText
                  error={errors.bid_amount && true}
                  id="bid-amount-helper-text"
                >
                  {errors.bid_amount && 'You must enter a valid number'}
                </FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <ButtonGroup
                  variant="outlined"
                  color="primary"
                  aria-label="outlined primary button group"
                  fullWidth
                >
                  <Button>25%</Button>
                  <Button>50%</Button>
                  <Button>75%</Button>
                  <Button>100%</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              {...register('bid_terms', { required: true })}
              control={
                <Radio color="default" value="accept-terms" fullwidth="true" />
              }
              label={
                <Typography variant="body2">
                  Accept that you are using this queue at you own risks
                </Typography>
              }
              error={errors.bid_terms && true}
              labelPlacement="end"
              aria-describedby="bid-terms-helper-text"
            />
            <FormHelperText
              error={errors.bid_terms && true}
              id="bid-terms-helper-text"
            >
              {errors.bid_terms && 'You must accept the terms'}
            </FormHelperText>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            color="primary"
            disabled={connected}
          >
            Place My Bid
          </Button>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} style={{ paddingLeft: -5, fontSize: '0.9em' }}>
                Available for Withdrawal
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  disabled
                  fullWidth
                  value={withdrawable_balance}
                  style={{ fontSize: '3em' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  color="primary"
                  disabled={connected}
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
