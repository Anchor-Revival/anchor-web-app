import {
  ANCHOR_QUERY_KEY,
  ANCHOR_TX_KEY,
  AnchorConstants,
  AnchorContractAddress,
} from '@anchor-protocol/app-provider';
import { CW20Addr, HumanAddr } from '@anchor-protocol/types';
import { TERRA_QUERY_KEY, TxRefetchMap } from '@libs/app-provider';
import { Gas, Rate } from '@libs/types';
import { NetworkInfo } from '@terra-money/wallet-provider';

// ---------------------------------------------
// style
// ---------------------------------------------
export const screen = {
  mobile: { max: 530 },
  // mobile : @media (max-width: ${screen.mobile.max}px)
  tablet: { min: 531, max: 830 },
  // tablet : @media (min-width: ${screen.tablet.min}px) and (max-width: ${screen.tablet.max}px)
  pc: { min: 831, max: 1439 },
  // pc : @media (min-width: ${screen.pc.min}px)
  monitor: { min: 1440 },
  // monitor : @media (min-width: ${screen.pc.min}px) and (max-width: ${screen.pc.max}px)
  // huge monitor : @media (min-width: ${screen.monitor.min}px)
} as const;

export const BODY_MARGIN_TOP = {
  pc: 50,
  mobile: 10,
  tablet: 20,
};

export const mobileHeaderHeight = 68;

// ---------------------------------------------
// links
// ---------------------------------------------
export const links = {
  forum: 'https://forum.anchorprotocol.com/',
  docs: {
    earn: 'https://docs.anchorprotocol.com/user-guide/webapp/earn',
    borrow: 'https://docs.anchorprotocol.com/user-guide/webapp/borrow',
    bond: 'https://docs.anchorprotocol.com/user-guide/webapp/bond',
    gov: 'https://docs.anchorprotocol.com/user-guide/webapp/govern',
    liquidate: 'https://docs.anchorprotocol.com/user-guide/webapp/liquidate',
  },
} as const;

// ---------------------------------------------
// chain
// ---------------------------------------------
export function ANCHOR_QUERY_CLIENT(network: NetworkInfo): 'lcd' | 'hive' {
  return 'lcd';
}

export function ANCHOR_CONSTANTS(network: NetworkInfo): AnchorConstants {
  return {
    gasWanted: 1_000_000 as Gas,
    fixedGas: 1_671_053 as Gas,
    blocksPerYear: 4_656_810,
    gasAdjustment: 1.6 as Rate<number>,
    airdropGasWanted: 300_000 as Gas,
    airdropGas: 334_211 as Gas,
    bondGasWanted: 1_600_000 as Gas,
    astroportGasWanted: 1_600_000 as Gas,
  };
}

const PHOENIX_CONTRACT_ADDRESS = {
  bLunaHub: 'terra1u28n7urqhnu2v7d4vs3x6z2yqmz0g5n7dx9lwrnynjxjchm2lv8s276kdn',
  bLunaToken:
    'terra1qplftykc0sehm2632zd0n5swdxc3k24sjtsf9lm8em50fqyyt8aq2k6u26',
  bLunaReward:
    'terra18e9c80ehqaee0963uqeaykapfef3v0a2xdm5uc28f44l9cv3tdeqyesm2e',
  bLunaAirdrop: '',
  bLunaValidatorsRegistry: 'terra10wt548y4y3xeqfrqsgqlqh424lll8fqxp6dyed',
  mmInterestModel: 'terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n',
  mmOracle: 'terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t',
  mmMarket: 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s',
  mmOverseer: 'terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8',
  mmCustody: 'terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn',
  mmCustodyBEth: 'terra10cxuzggyvvv44magvrh3thpdnk9cmlgk93gmx2',
  mmLiquidation: 'terra1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6',
  mmDistributionModel: 'terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq',
  mmLiquidationQueue: 'terra1e25zllgag7j9xsun3me4stnye2pcg66234je3u',
  aTerra: 'terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu',
  bLunaLunaPair: 'terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w',
  bLunaLunaLPToken: 'terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl',
  ancUstPair: 'terra1qr2k6yjjd5p2kaewqvg93ag74k6gyjr7re37fs',
  ancUstLPToken: 'terra1wmaty65yt7mjw6fjfymkd9zsm6atsq82d9arcd',
  gov: 'terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5',
  distributor: 'terra1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz',
  collector: 'terra14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h',
  community: 'terra12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg',
  staking: 'terra1h3mf22jm68ddueryuv2yxwfmqxxadvjceuaqz6',
  ANC: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
  airdrop: 'terra146ahqn6d3qgdvmj8cj96hh03dzmeedhsf0kxqm',
  investor_vesting: 'terra1pm54pmw3ej0vfwn3gtn6cdmaqxt0x37e9jt0za',
  team_vesting: 'terra10evq9zxk2m86n3n3xnpw28jpqwp628c6dzuq42',
  terraswapFactory: 'terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj',
  astroportGenerator: 'terra1zgrx9jjqrfye8swykfgmd6hpde60j0nszzupp9',
  vesting: 'terra13v4ln23tmfs2zk4nh5dw5mzufckekp4fpafpcy',
  astroUstPair: 'terra1l7xu2rl3c7qmtx3r5sd2tz25glf6jh8ul7aag7',
};

const PISCO_CONTRACT_ADDRESS = {
  bLunaHub: 'terra1u28n7urqhnu2v7d4vs3x6z2yqmz0g5n7dx9lwrnynjxjchm2lv8s276kdn',
  bLunaToken:
    'terra1qplftykc0sehm2632zd0n5swdxc3k24sjtsf9lm8em50fqyyt8aq2k6u26',
  bLunaReward:
    'terra18e9c80ehqaee0963uqeaykapfef3v0a2xdm5uc28f44l9cv3tdeqyesm2e',
  bLunaValidatorsRegistry: '',
  bLunaAirdrop: '',
  //bEthReward: 'terra1ja3snkedk4t0zp7z3ljd064hcln8dsv5x004na',
  //bEthToken: 'terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l',
  mmInterestModel:
    'terra192p3z7wdqq0hgvgu23wkrkpeqwyp99nxrex78d3mrehdgu87gexq6aw2lu',
  mmOracle: 'terra1z7483ujm8fdqmmdy8c2ncq9p5lf4rx2dca6dmsm2536mwvskvt6qjaqz4s',
  mmMarket: 'terra17xhgwkrk3pnlkkw0rdsv75qn0m0whgeaw4rd2muqmtgsdmgkutqqaa4a44',
  mmOverseer:
    'terra1qq3m9yn7h9gjgd6rs2t58qkjrqngl436sv6w3dak2svkc8lapx4qtxylsv',
  mmCustody: '',
  mmCustodyBEth: '',
  mmLiquidation:
    'terra1l34ampvph32lmsa086gdplc2g8y68r4du4pepjecf9wu0xfnt0eq3ur8dv',
  mmLiquidationQueue:
    'terra1jhydm6anuuweuzx2p6aq7j03qtehakwv0m4y9x9ce8jqcn3d2r4qw90w48',
  mmDistributionModel: 'terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq',
  aTerra: 'terra1nn7dewwfnjqzy580uykvfp2fa3c8rmpu5dh7cmrptye0lgzsrh7q7mkeme',
  bLunaLunaPair: '',
  bLunaLunaLPToken: '',
  ancUstPair: '',
  ancUstLPToken: '',
  gov: '',
  distributor: '',
  collector: '',
  community: '',
  staking: '',
  ANC: '',
  airdrop: '',
  investor_vesting: '',
  team_vesting: '',
  terraswapFactory: '',
  astroportGenerator: '',
  vesting: '',
  astroUstPair: '',
};

export const ANCHOR_CONTRACT_ADDRESS = (
  network: NetworkInfo,
): AnchorContractAddress => {
  const addressMap = network.chainID.startsWith('pisco')
    ? PISCO_CONTRACT_ADDRESS
    : PHOENIX_CONTRACT_ADDRESS;

  return {
    bluna: {
      reward: addressMap.bLunaReward as HumanAddr,
      hub: addressMap.bLunaHub as HumanAddr,
      airdropRegistry: addressMap.airdrop as HumanAddr,
      validatorsRegistry: addressMap.bLunaValidatorsRegistry as HumanAddr,
      custody: addressMap.mmCustody as HumanAddr,
    },
    moneyMarket: {
      market: addressMap.mmMarket as HumanAddr,
      overseer: addressMap.mmOverseer as HumanAddr,
      oracle: addressMap.mmOracle as HumanAddr,
      interestModel: addressMap.mmInterestModel as HumanAddr,
      distributionModel: addressMap.mmDistributionModel as HumanAddr,
    },
    liquidation: {
      liquidationContract: addressMap.mmLiquidation as HumanAddr,
      liquidationQueueContract: addressMap.mmLiquidationQueue as HumanAddr,
    },
    anchorToken: {
      gov: addressMap.gov as HumanAddr,
      staking: addressMap.staking as HumanAddr,
      community: addressMap.community as HumanAddr,
      distributor: addressMap.distributor as HumanAddr,
      investorLock: addressMap.investor_vesting as HumanAddr,
      teamLock: addressMap.team_vesting as HumanAddr,
      collector: addressMap.collector as HumanAddr,
      vesting: addressMap.vesting as HumanAddr,
    },
    terraswap: {
      factory: addressMap.terraswapFactory as HumanAddr,
      blunaLunaPair: addressMap.bLunaLunaPair as HumanAddr,
    },
    astroport: {
      generator: addressMap.astroportGenerator as HumanAddr,
      astroUstPair: addressMap.astroUstPair as HumanAddr,
      ancUstPair: addressMap.ancUstPair as HumanAddr,
    },
    cw20: {
      bLuna: addressMap.bLunaToken as CW20Addr,
      //bEth: addressMap.bEthToken as CW20Addr,
      aUST: addressMap.aTerra as CW20Addr,
      ANC: addressMap.ANC as CW20Addr,
      AncUstLP: addressMap.ancUstLPToken as CW20Addr,
      bLunaLunaLP: addressMap.bLunaLunaLPToken as CW20Addr,
    },
    crossAnchor: {
      core: '' as HumanAddr,
    },
  };
};

export const ANCHOR_INDEXER_API_ENDPOINTS = (network: NetworkInfo): string => {
  if (network.chainID.startsWith('pisco')) {
    return 'https://api.anchor-rebirth.com/api';
  } else {
    return 'https://anchor-services-anchor-protocol.vercel.app/api';
  }
};

// ---------------------------------------------
// query refetch
// ---------------------------------------------
export const ANCHOR_TX_REFETCH_MAP: TxRefetchMap = {
  [ANCHOR_TX_KEY.EARN_DEPOSIT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
    {
      queryKey: ANCHOR_QUERY_KEY.EARN_TRANSACTION_HISTORY,
      wait: 1000 * 3,
    },
  ],
  [ANCHOR_TX_KEY.EARN_WITHDRAW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
    {
      queryKey: ANCHOR_QUERY_KEY.EARN_TRANSACTION_HISTORY,
      wait: 1000 * 3,
    },
  ],
  [ANCHOR_TX_KEY.BORROW_BORROW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_REPAY]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_PROVIDE_COLLATERAL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_REDEEM_COLLATERAL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BASSET_IMPORT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BASSET_EXPORT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_MINT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_BURN]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_SWAP]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BOND_CLAIMABLE_REWARDS,
    ANCHOR_QUERY_KEY.BOND_BETH_CLAIMABLE_REWARDS,
  ],
  [ANCHOR_TX_KEY.BOND_WITHDRAW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BOND_WITHDRAWABLE_AMOUNT,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_PROVIDE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_WITHDRAW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    TERRA_QUERY_KEY.ASTROPORT_DEPOSIT,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.ANC_LP_STAKING_STATE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    TERRA_QUERY_KEY.ASTROPORT_DEPOSIT,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.ANC_LP_STAKING_STATE,
  ],
  [ANCHOR_TX_KEY.ANC_BUY]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_SELL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_GOVERNANCE_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.ANC_GOVERNANCE_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.GOV_CREATE_POLL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.GOV_POLLS,
    ANCHOR_QUERY_KEY.GOV_MYPOLLS,
  ],
  [ANCHOR_TX_KEY.GOV_VOTE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.GOV_POLL,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.GOV_VOTERS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_ALL_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_ANC_UST_LP_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_UST_BORROW_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.AIRDROP_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.AIRDROP_CHECK,
  ],
  [ANCHOR_TX_KEY.TERRA_SEND]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
};

// build: force re-build trigger - 22.01.03-1
