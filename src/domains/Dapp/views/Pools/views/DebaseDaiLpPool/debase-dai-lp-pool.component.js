import { Fragment, useState, useContext, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import {fetcher,parseNumToUsFormat} from '@utils';
import CONTRACT_ADDRESS from "@constants/contract-address.constant";
import { DisconnectedWalletCard, Grid, Section } from "@dapp/components";
import useSWR from 'swr';
import { ABI_THRESHOLDCOUNTER, ABI_LP, ABI_RANDOMNUMBER, ABI_DEBASETESTNET } from '@constants';
import { Card, Spinner, List, Button } from '@core/components';
import { StyledPoolStake, StyledCardInner } from "@dapp/components/common/PoolStakeOld/pool-stake.styles";
import { formatEther, formatUnits } from "@ethersproject/units";
import ThresholdCounterStake from './thresholdcounter-stake.component';

const DebaseDaiLpPool = () => {
    const { active, library, account } = useWeb3React();

    const [ isUnstakeLoading, setIsUnstakeLoading ] = useState(false);
    const [ isClaimLoading, setIsClaimLoading ] = useState(false);

    /* fetch pool data */
    const { data: rewardPercentage } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'rewardPercentage' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: countInSequence } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'countInSequence' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: beforePeriodFinish } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'beforePeriodFinish' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: duration } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'duration' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: poolEnabled } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'poolEnabled' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: poolLpLimit } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'poolLpLimit' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: balance } = useSWR([ CONTRACT_ADDRESS.debase, 'balanceOf', CONTRACT_ADDRESS.stabilizerPool ], {
        fetcher: fetcher(library, ABI_LP)
    });
    const { data: userLpLimit } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'userLpLimit' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: revokeRewardPrecentage } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'revokeRewardPrecentage' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: count } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'count' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: totalSupply } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'totalSupply' ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: randomNumber } = useSWR([ CONTRACT_ADDRESS.randomNumber, 'randomResult' ], {
        fetcher: fetcher(library, ABI_RANDOMNUMBER)
    });
    const { data: randomThreshold } = useSWR([ CONTRACT_ADDRESS.stabilizerPool, 'normalDistribution', randomNumber ? parseInt(formatEther(randomNumber)) % 100 : 0 ], {
        fetcher: fetcher(library, ABI_THRESHOLDCOUNTER)
    });
    const { data: debaseReward } = useSWR([ CONTRACT_ADDRESS.debase, 'rewardsDebase', CONTRACT_ADDRESS.debaseTest], {
        fetcher: fetcher(library, ABI_DEBASETESTNET)
    });
    const { data: mph88Reward } = useSWR([ CONTRACT_ADDRESS.debaseTest, 'mph88Reward'], {
        fetcher: fetcher(library, ABI_DEBASETESTNET)
    });
    const { data: crvReward } = useSWR([ CONTRACT_ADDRESS.debaseTest, 'crvReward'], {
        fetcher: fetcher(library, ABI_DEBASETESTNET)
    });

    // List data arrays
    const poolListData = [
        {
            label: 'Reward',
            value: rewardPercentage ? formatEther(rewardPercentage) * 100 + '%' : <Spinner size="xsmall" />,
            tooltip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
        },
        {
            label: 'Threshold Condition',
            value: 'Indicator (y ≥ X), X ~ N(5,2)',
            tooltip: 'Condition to check if threshold is hit for rewards period to start. y is number of positive rebases since last reward period start'
        },
        {
            label: 'Count In Sequence',
            value: countInSequence !== undefined ? (countInSequence ? 'True' : 'False') : <Spinner size="xsmall" />,
            tooltip: 'Count positive rebases in sequence'
        },
        {
            label: 'Before Period Finish',
            value: beforePeriodFinish !== undefined ? (beforePeriodFinish ? 'True' : 'False') : <Spinner size="xsmall" />,
            tooltip: 'Award rewards before previous rewards have been distributed'
        },
        {
            label: 'Reward Period',
            value: duration ? (duration.toNumber() / (60 * 60)).toString() + ' Hours' : <Spinner size="xsmall" />,
            tooltip: 'Period within which pool reward is distributed'
        },
        {
            label: 'Pool Enabled',
            value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : <Spinner size="xsmall" />,
            tooltip: 'Pool staking/withdraw usage status'
        },
        {
            label: 'User Pool Limit',
            value: userLpLimit ? formatEther(userLpLimit) + ' LP' : <Spinner size="xsmall" />,
            tooltip: 'LP limit per wallet'
        },
        {
            label: 'Revoke Reward',
            value: revokeRewardPrecentage ? parseFloat(formatEther(revokeRewardPrecentage) * 100).toFixed(2) + '%' : <Spinner size="xsmall" />,
            tooltip: 'Percentage of rewards that will be revoked if positive rebases stop'
        },
        {
            label: 'Current Count',
            value: count ? parseInt(formatUnits(count, 0)) : <Spinner size="xsmall" />,
            tooltip: 'The number of positive rebases since start of last rewards period'
        },
        {
            label: 'Last Random Threshold',
            value: randomThreshold ? 5 : <Spinner size="xsmall" />,
            tooltip: 'A number drawn every rebase from a normal distribution. If Count>= Random number, a reward period begins'
        },
        {
            label: 'Total Pool Limit',
            value: poolLpLimit && totalSupply ? parseFloat(formatEther(totalSupply)).toFixed(2) + ' / ' + formatEther(poolLpLimit) + ' LP' : <Spinner size="xsmall" />,
            tooltip: 'Total LP limit per pool'
        },
        {
            label: 'Current Pool Reward',
            value: balance ? parseFloat(formatEther(balance)) : <Spinner size="xsmall" />,
            tooltip: 'Current pool rewards available'
        },
        {
            label: 'TVL',
            value: '$' + parseNumToUsFormat('752037.01057')
        },
        {
            label: 'Pool Reward(Debase)',
            value: debaseReward
        },
        {
            label: 'Pool Reward(88Mph)',
            value: mph88Reward
        },
        {
            label: 'Pool Reward(CRV)',
            value: crvReward
        }
    ];
    const highlightData = [
        {
            label: 'APR',
            value: '573% (Approx.)'
        }
    ];
    async function handleClaim() {
        console.log('handle claim');
    }
    return (
        <Fragment>
            <Section label="DEBASE/ETH LP POOL" info="**update**">
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
                            <ThresholdCounterStake />
                        </StyledPoolStake>
                    </Grid>
                )}
            </Section>
        </Fragment>
    );
};

export default DebaseDaiLpPool;
