import { Fragment, useState, useContext, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import fetcher from "@utils/fetcher";
import CONTRACT_ADDRESS from "@constants/contract-address.constant";
import {DisconnectedWalletCard, Grid, Section} from "@dapp/components";
import useSWR from 'swr';
import { ABI_INCENTIVIZER, ABI_POOL, ABI_UNI, ABI_LP } from '@constants';
import { Card, Spinner, List } from '@core/components';
import { StyledPoolStake, StyledCardInner } from "@dapp/components/common/PoolStakeOld/pool-stake.styles";
import {formatEther, parseEther} from "@ethersproject/units";
import DegovEthStake from './degov-eth-stake.component';
import axios from "axios";

const DegovEthLpPool = () => {
    const { active, library, account } = useWeb3React();

    const { data: rewardPercentage } = useSWR([CONTRACT_ADDRESS.degovEthPool, 'rewardPercentage'], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: blockDuration } = useSWR([CONTRACT_ADDRESS.degovEthPool, 'blockDuration'], {
       fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: poolEnabled } = useSWR([ CONTRACT_ADDRESS.degovEthPool, 'poolEnabled' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: poolLpLimit } = useSWR([ CONTRACT_ADDRESS.degovEthPool, 'poolLpLimit' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: enableUserLpLimit } = useSWR([ CONTRACT_ADDRESS.degovEthPool, 'enableUserLpLimit' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: userLpLimit } = useSWR([ CONTRACT_ADDRESS.degovEthPool, 'userLpLimit' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: totalSupply } = useSWR([ CONTRACT_ADDRESS.degovEthPool, 'totalSupply' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: enablePoolLpLimit } = useSWR([ CONTRACT_ADDRESS.degovEthPool, 'enablePoolLpLimit' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: balance } = useSWR([ CONTRACT_ADDRESS.debase, 'balanceOf', CONTRACT_ADDRESS.degovEthPool ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: debaseTotalSupply } = useSWR([ CONTRACT_ADDRESS.debase, 'totalSupply' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: reserves } = useSWR([ CONTRACT_ADDRESS.degovEthLp, 'getReserves' ], {
        fetcher: fetcher(library, ABI_UNI)
    });
    const { data: totalSupplyLp } = useSWR([ CONTRACT_ADDRESS.degovEthLp, 'totalSupply' ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });
    const { data: debaseDaiReserves } = useSWR([ CONTRACT_ADDRESS.debaseDaiLp, 'getReserves' ], {
        fetcher: fetcher(library, ABI_UNI)
    });
    const { data: ethDaiReserves } = useSWR([ CONTRACT_ADDRESS.ethDaiPool, 'getReserves' ], {
        fetcher: fetcher(library, ABI_UNI)
    });
    const { data: wethBalance } = useSWR([ CONTRACT_ADDRESS.weth, 'balanceOf', CONTRACT_ADDRESS.degovEthLp ], {
        fetcher: fetcher(library, ABI_INCENTIVIZER)
    });

    // List data arrays
    const poolListData = [
        {
            label: 'Reward',
            value: rewardPercentage ? parseFloat(formatEther(rewardPercentage)).toFixed(4) * 100 + ' %' : <Spinner size="xsmall" />,
            tooltip: 'Percentage of stabilizer rewards contract requested as reward per reward duration',
        },
        {
            label: 'Block Duration',
            value: blockDuration ? blockDuration + ' Blocks' : <Spinner size="xsmall" />,
            tooltip: 'Period within which pool reward is distributed',
        },
        {
            label: 'Pool Enabled',
            value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : <Spinner size="xsmall" />,
            tooltip: 'Pool staking/withdraw usage status',
        },
        {
            label: 'User Lp Limit Enabled',
            value: enableUserLpLimit !== undefined ? (enableUserLpLimit ? 'True' : 'False') : <Spinner size="xsmall" />,
            tooltip: 'Pool staking/withdraw usage status',
        },
        {
            label: 'Total Pool Limit',
            value: poolLpLimit && totalSupply ? parseFloat(formatEther(totalSupply)).toFixed(2) + ' / ' + formatEther(poolLpLimit) + ' LP' : <Spinner size="xsmall" />,
            tooltip: 'Total LP limit per pool'
        },
        {
            label: 'Pool Lp Limit Enabled',
            value: enablePoolLpLimit !== undefined ? (enablePoolLpLimit ? 'True' : 'False') : <Spinner size="xsmall" />,
            tooltip: 'Pool staking/withdraw usage status'
        },
        {
            label: 'User Lp Limit',
            value: userLpLimit ? formatEther(userLpLimit) + ' LP' : <Spinner size="xsmall" />,
            tooltip: 'LP limit per wallet'
        },
        {
            label: 'Current Pool Reward',
            value: balance ? parseFloat(formatEther(balance)) : <Spinner size="xsmall" />,
            tooltip: 'Current pool rewards available'
        }
    ];
    const highlightData = [
        {
            label: 'APR',
            value: reserves && blockDuration && rewardPercentage &&  totalSupply && totalSupplyLp && debaseTotalSupply && debaseDaiReserves && ethDaiReserves && wethBalance ?
                ((rewardPercentage * debaseTotalSupply
                    / (blockDuration * 14 / 86400) * (debaseDaiReserves[0] / debaseDaiReserves[1]) * 365 / (totalSupply * (2 * wethBalance * (ethDaiReserves[0] / ethDaiReserves[1]) / totalSupplyLp))) / Math.pow(10, 18)
                 * 100).toFixed(2) + '% (Approx.)'
                : <Spinner size="xsmall" />,
        }
    ];
    return (
      <Fragment>
          <Section label="DEGOV/ETH LP POOL" info="**update**">
              {!active? (
                  <DisconnectedWalletCard />
              ): (
                  <Grid>
                    <StyledPoolStake>
                        <Card>
                            <StyledCardInner>
                                <List data={poolListData} />
                                <List color="secondary" data={highlightData} />
                            </StyledCardInner>
                        </Card>
                        <DegovEthStake />
                    </StyledPoolStake>
                  </Grid>
              )}
          </Section>
      </Fragment>
    );
};

export default DegovEthLpPool;
