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
    const days = blockDuration ? blockDuration * 14 / 86400 : 7;
    const tokenAmount = rewardPercentage && debaseTotalSupply ? parseFloat(formatEther(rewardPercentage)).toFixed(4) * parseEther('1') / parseFloat(formatEther(debaseTotalSupply)) : 0;
    // const rewardTokenPerDay = tokenAmount / days;
    // const rewardTokenPrice = reserves ? parseFloat(formatEther(reserves[1])) / parseFloat(formatEther(totalSupplyLp)) : 0;
    // const totalStakedBalance = totalSupply;
    // const lpTokenPrice = reserves ? parseFloat(formatEther(reserves[1])) / parseFloat(formatEther(totalSupply)) : 0;

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
            value: reserves && blockDuration && rewardPercentage &&  totalSupply && totalSupplyLp && debaseTotalSupply ?
                parseFloat(
                    (parseFloat(formatEther(rewardPercentage)) * parseEther('1') / parseFloat(formatEther(debaseTotalSupply)))
                    / (blockDuration * 14 / 86400) * parseFloat(formatEther(reserves[1])) / parseFloat(formatEther(totalSupplyLp)) * 365 / (parseFloat(formatEther(totalSupply)) * parseFloat(formatEther(reserves[1])) / parseFloat(formatEther(totalSupply)))
                ).toFixed(4) * 100 + ' %'
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
