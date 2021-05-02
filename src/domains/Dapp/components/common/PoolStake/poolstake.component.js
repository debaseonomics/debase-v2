import { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers/lib/ethers';
import { ABI_POOL, ABI_LP } from '@constants';
import { fetcher } from '@utils';
import { List, Button, Input, Flexbox, Spinner } from '@core/components';
import { StyledPoolStake, StyledCardInner } from './poolstake.styles';
import { parseEther } from 'ethers/lib/utils';
import { SnackbarManagerContext } from '@dapp/managers';
import InfoCard from '../InfoCard/infocard.component';

const PoolStakeTriple = ({ poolABI, poolAddress, lpAddress, stakeText }) => {
	const { library, account } = useWeb3React();

	const [ isStakeLoading, setIsStakeLoading ] = useState(false);
	const [ isUnstakeLoading, setIsUnstakeLoading ] = useState(false);
	const [ isClaimLoading, setIsClaimLoading ] = useState(false);

	const [ isStakingActive, setIsStakingActive ] = useState(false);
	const [ isUnstakingActive, setIsUnstakingActive ] = useState(false);

	const [ stakeInputValue, setStakeInputValue ] = useState('');
	const [ unstakeInputValue, setUnstakeInputValue ] = useState('');

	const { openSnackbar } = useContext(SnackbarManagerContext);

	const { data: poolEnabled, mutate: getPoolEnabled } = useSWR([ poolAddress, 'poolEnabled' ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: poolLpLimit } = useSWR([ poolAddress, 'poolLpLimit' ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: userLpLimit } = useSWR([ poolAddress, 'userLpLimit' ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: earned, mutate: getEarned } = useSWR([ poolAddress, 'earned', account ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: userStakedBalance, mutate: getUserStakedBalance } = useSWR([ poolAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: walletBalance, mutate: getWalletBalance } = useSWR([ lpAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: totalStakedBalance, mutate: getTotalStakedBalance } = useSWR([ poolAddress, 'totalSupply' ], {
		fetcher: fetcher(library, poolABI)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getEarned(undefined, true);
				getUserStakedBalance(undefined, true);
				getWalletBalance(undefined, true);
				getTotalStakedBalance(undefined, true);
				getPoolEnabled(undefined, true);
			});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[ library, getEarned, getPoolEnabled, getUserStakedBalance, getWalletBalance, getTotalStakedBalance ]
	);

	// List data arrays
	const poolListData = [
		{
			label: 'User Lp Limit',
			value:
				userLpLimit && walletBalance ? (
					parseFloat(formatEther(walletBalance)).toFixed(2) +
					' / ' +
					parseFloat(formatEther(userLpLimit)).toFixed(2) +
					' LP'
				) : (
					<Spinner size="xsmall" />
				),
			tooltip: 'LP limit per wallet'
		},
		{
			label: 'Total Pool Limit',
			value:
				poolLpLimit && totalStakedBalance ? (
					parseFloat(formatEther(totalStakedBalance)).toFixed(2) +
					' / ' +
					parseFloat(formatEther(poolLpLimit)).toFixed(2) +
					' LP'
				) : (
					<Spinner size="xsmall" />
				),
			tooltip: 'Total LP limit per pool'
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
			label: 'Earned (Debase)',
			value: earned ? parseFloat(formatEther(earned)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Amount of Debase reward you have earned.'
		}
	];

	const aprListData = [
		{
			label: 'APR',
			value: '100%',
			tooltip: "Pool's annual percentage rate"
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
			<InfoCard>
				<StyledCardInner>
					<List data={poolListData} />
					<List color="primary" data={userListData} />
					<List color="secundary" data={aprListData} />
				</StyledCardInner>
			</InfoCard>

			{poolEnabled !== undefined && (
				<InfoCard gutter={20}>
					{isStakingActive && (
						<Flexbox direction="horizontal" gap="10px">
							<Input value={stakeInputValue} placeholder="Stake amount" onChange={onChangeStakeInput} />
							<Button color="primary" onClick={handleMaxStake}>
								max
							</Button>
						</Flexbox>
					)}
					{poolEnabled && (
						<Button isLoading={isStakeLoading} onClick={handleStake}>
							stake
						</Button>
					)}

					{isUnstakingActive && (
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
					<Button isLoading={isUnstakeLoading} onClick={handleUnstake}>
						unstake
					</Button>
					<Button isLoading={isClaimLoading} onClick={handleClaim}>
						claim reward
					</Button>
				</InfoCard>
			)}
		</StyledPoolStake>
	);
};

export default PoolStakeTriple;
