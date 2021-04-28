import { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { Contract } from 'ethers/lib/ethers';
import { DateTime } from 'luxon';
import { ABI_POOL, ABI_LP } from '@constants';
import { fetcher, calcDateDifference } from '@utils';
import { Card, List, Button, Input, Flexbox, Spinner } from '@core/components';
import { PoolCard } from '@dapp/components';
import { SnackbarManagerContext } from '@dapp/managers';
import { StyledPoolStake, StyledCardInner } from './poolstake.styles';
import { parseEther } from 'ethers/lib/utils';
import { CONTRACT_ADDRESS, ABI_UNI } from '@constants';

const MiningPoolCard = ({ label, type, tooltip, poolAddress, lpAddress, stakeText }) => {
	const { library, account } = useWeb3React();

	const [ isStakeLoading, setIsStakeLoading ] = useState(false);
	const [ isUnstakeLoading, setIsUnstakeLoading ] = useState(false);
	const [ isClaimLoading, setIsClaimLoading ] = useState(false);

	const [ isStakingActive, setIsStakingActive ] = useState(false);
	const [ isUnstakingActive, setIsUnstakingActive ] = useState(false);

	const [ stakeInputValue, setStakeInputValue ] = useState('');
	const [ unstakeInputValue, setUnstakeInputValue ] = useState('');

	const { openSnackbar } = useContext(SnackbarManagerContext);

	// Current halving reward
	const { data: initReward, mutate: getInitReward } = useSWR([ poolAddress, 'initReward' ], {
		fetcher: fetcher(library, ABI_POOL)
	});

	const { data: poolEnabled, mutate: getPoolEnabled } = useSWR([ poolAddress, 'poolEnabled' ], {
		fetcher: fetcher(library, ABI_POOL)
	});

	// Max earnable reward
	const { data: maxReward, mutate: getMaxReward } = useSWR([ poolAddress, 'maxReward' ], {
		fetcher: fetcher(library, ABI_POOL)
	});
	// claimed rewards
	const { data: rewardDistributed, mutate: getRewardDistributed } = useSWR([ poolAddress, 'rewardDistributed' ], {
		fetcher: fetcher(library, ABI_POOL)
	});
	// timestamp -> show next halving in (days)
	const { data: periodFinish, mutate: getPeriodFinish } = useSWR([ poolAddress, 'periodFinish' ], {
		fetcher: fetcher(library, ABI_POOL)
	});

	const { data: duration, mutate: getDuration } = useSWR([ poolAddress, 'duration' ], {
		fetcher: fetcher(library, ABI_POOL)
	});

	// if zero don't show claim button
	const { data: earned, mutate: getEarned } = useSWR([ poolAddress, 'earned', account ], {
		fetcher: fetcher(library, ABI_POOL)
	});

	// value how much a user has staked into pool
	const { data: userStakedBalance, mutate: getUserStakedBalance } = useSWR([ poolAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, ABI_POOL)
	});
	// current wallet balance of token -> use as max value in input field
	const { data: walletBalance, mutate: getWalletBalance } = useSWR([ lpAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, ABI_LP)
	});
	// total amount staked by everyone
	const { data: totalStakedBalance, mutate: getTotalStakedBalance } = useSWR([ poolAddress, 'totalSupply' ], {
		fetcher: fetcher(library, ABI_LP)
	});

	const { data: reserves, mutate: getReserves } = useSWR([ CONTRACT_ADDRESS.uwuBusdLp, 'getReserves' ], {
		fetcher: fetcher(library, ABI_UNI)
	});

	const { data: pairSupply, mutate: getPairSupply } = useSWR([ CONTRACT_ADDRESS.uwuBusdLp, 'totalSupply' ], {
		fetcher: fetcher(library, ABI_UNI)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getMaxReward(undefined, true);
				getInitReward(undefined, true);
				getRewardDistributed(undefined, true);
				getPeriodFinish(undefined, true);
				getEarned(undefined, true);
				getUserStakedBalance(undefined, true);
				getWalletBalance(undefined, true);
				getTotalStakedBalance(undefined, true);
				getPoolEnabled(undefined, true);
				getDuration(undefined, true);
				getReserves(undefined, true);
				getPairSupply(undefined, true);
			});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[
			library,
			getMaxReward,
			getInitReward,
			getRewardDistributed,
			getPeriodFinish,
			getEarned,
			getPoolEnabled,
			getUserStakedBalance,
			getWalletBalance,
			getTotalStakedBalance,
			getDuration,
			getReserves,
			getPairSupply
		]
	);

	// List data arrays
	const poolListData = [
		{
			label: 'Total Staked in Pool (' + stakeText + ')',
			value: totalStakedBalance ? (
				parseFloat(formatEther(totalStakedBalance)).toFixed(4) * 1
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'Total amount of tokens staked into the pool.'
		},
		{
			label: 'Total Pool Rewards',
			value: maxReward ? parseFloat(formatEther(maxReward)).toFixed(2) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Total UwU rewards the pool will give over its lifetime.'
		},
		{
			label: 'Total Rewards Claimed',
			value: rewardDistributed ? (
				parseFloat(formatEther(rewardDistributed)).toFixed(2) * 1
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'Total UwU rewards claimed from the pool until now.'
		},
		{
			label: 'Halving Period',
			value: duration ? (
				parseFloat(duration.toNumber() / (60 * 60)).toFixed(2) * 1 + ' Hours'
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'Period over which the pool reward halves.'
		},
		{
			label: 'Current Period Reward (UwU)',
			value: initReward ? parseFloat(formatEther(initReward)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Reward for the current halving period.'
		},
		{
			label: 'Next Halving',
			value:
				poolEnabled && periodFinish ? (
					DateTime.fromSeconds(periodFinish.toNumber()).toRelative({ round: false })
				) : (
					<Spinner size="xsmall" />
				),
			valueType: '',
			tooltip: 'Time since the last rebase happened'
		}
	];
	const userListData = [
		{
			label: 'Unstaked (' + stakeText + ')',
			value: walletBalance ? parseFloat(formatEther(walletBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		},
		{
			label: 'Staked (' + stakeText + ')',
			value: userStakedBalance ? (
				parseFloat(formatEther(userStakedBalance)).toFixed(4) * 1
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'Your current staked balance in the pool.'
		},
		{
			label: 'Earned (UwU)',
			value: earned ? parseFloat(formatEther(earned)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Amount of UwU reward you have earned.'
		}
	];

	const aprListData = [
		{
			label: 'APR',
			type: 'bridge',
			value: 'N/A',
			tooltip: 'Current Pool APR'
		},
		{
			label: 'APR',
			type: 'mining',
			value:
				initReward && reserves && duration && pairSupply && totalStakedBalance ? (
					parseFloat(
						parseFloat(formatEther(reserves[1])) /
							parseFloat(formatEther(reserves[0])) *
							365 *
							parseFloat(formatEther(initReward)) /
							3.5 /
							(2 *
								(parseFloat(formatEther(reserves[1])) / parseFloat(formatEther(pairSupply))) *
								parseFloat(formatEther(totalStakedBalance)))
					).toFixed(4) *
						100 +
					' %'
				) : (
					<Spinner size="xsmall" />
				),
			tooltip: 'Current Pool APR'
		}
	];

	// functions
	async function handleStake() {
		if (!isStakingActive) return setIsStakingActive(true);
		setIsStakeLoading(true);
		const poolContract = new Contract(poolAddress, ABI_POOL, library.getSigner());
		const tokenContract = new Contract(lpAddress, ABI_LP, library.getSigner());
		try {
			const toStake = parseEther(stakeInputValue);
			let allowance = await tokenContract.allowance(account, poolAddress);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(poolAddress, toStake, { gasPrice: 20000000000 });
				await transaction.wait(1);
			}
			transaction = await poolContract.stake(toStake, { gasPrice: 20000000000 });
			await transaction.wait(1);
			openSnackbar({
				message: 'Staking success',
				status: 'success'
			});
		} catch (error) {
			openSnackbar({
				message: 'Staking failed',
				status: 'error'
			});
		}
		setIsStakeLoading(false);
	}
	async function handleUnstake() {
		if (!isUnstakingActive) return setIsUnstakingActive(true);
		setIsUnstakeLoading(true);
		const poolContract = new Contract(poolAddress, ABI_POOL, library.getSigner());
		try {
			const toWithdraw = parseEther(unstakeInputValue);
			let transaction = await poolContract.withdraw(toWithdraw, { gasPrice: 20000000000 });
			await transaction.wait(1);
			openSnackbar({
				message: 'Unstaking success',
				status: 'success'
			});
		} catch (error) {
			openSnackbar({
				message: 'Unstaking failed',
				status: 'error'
			});
		}
		setIsUnstakeLoading(false);
	}
	async function handleClaim() {
		setIsClaimLoading(true);
		const poolContract = new Contract(poolAddress, ABI_POOL, library.getSigner());
		try {
			let transaction = await poolContract.getReward({ gasPrice: 20000000000 });
			await transaction.wait(1);
			getEarned(undefined, true);
			openSnackbar({
				message: 'Claimed reward',
				status: 'success'
			});
		} catch (error) {
			openSnackbar({
				message: 'Claiming reward failed',
				status: 'error'
			});
		}
		setIsClaimLoading(false);
	}
	const handleMaxStake = () => {
		setStakeInputValue(formatEther(walletBalance));
	};
	const handleMaxUnstake = () => {
		setUnstakeInputValue(formatEther(userStakedBalance));
	};
	const onChangeStakeInput = (value) => {
		setStakeInputValue(value);
	};
	const onChangeUnstakeInput = (value) => {
		setUnstakeInputValue(value);
	};

	return (
		<StyledPoolStake>
			<Card>
				<StyledCardInner>
					<List data={poolListData} />
					<List
						color="primary"
						data={
							type === 'bridge' ? (
								userListData.filter((ele) => !ele.label.includes('Unstaked'))
							) : (
								userListData
							)
						}
					/>
					<List color="secundary" data={aprListData.filter((ele) => type == ele.type)} />
				</StyledCardInner>
			</Card>

			{poolEnabled && (
				<Card gutter={20}>
					{isStakingActive &&
					type === 'mining' && (
						<Flexbox direction="horizontal" gap="10px">
							<Input value={stakeInputValue} placeholder="Stake amount" onChange={onChangeStakeInput} />
							<Button color="primary" onClick={handleMaxStake}>
								max
							</Button>
						</Flexbox>
					)}

					{type === 'mining' && (
						<Button isLoading={isStakeLoading} onClick={handleStake}>
							stake
						</Button>
					)}

					{isUnstakingActive &&
					type === 'mining' && (
						<Flexbox direction="horizontal" gap="10px">
							<Input
								value={unstakeInputValue}
								placeholder="Unstake amount"
								onChange={onChangeUnstakeInput}
							/>
							<Button color="primary" onClick={handleMaxUnstake}>
								max
							</Button>
						</Flexbox>
					)}

					{type === 'mining' && (
						<Button isLoading={isUnstakeLoading} onClick={handleUnstake}>
							unstake
						</Button>
					)}

					<Button isLoading={isClaimLoading} onClick={handleClaim}>
						claim reward
					</Button>
				</Card>
			)}
		</StyledPoolStake>
	);
};

export default MiningPoolCard;
