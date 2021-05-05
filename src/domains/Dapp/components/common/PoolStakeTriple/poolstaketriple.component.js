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
import { CONTRACT_ADDRESS } from '@constants';
import { SnackbarManagerContext } from '@dapp/managers';
import InfoCard from '../InfoCard/infocard.component';
import { request, gql } from 'graphql-request';
import { ethers } from '../../../../../../node_modules/ethers/lib/index';

const gqlQuery = gql`
	query getUser($user: String!) {
		user(id: $user) {
			id
			rewarded
		}
	}
`;

const PoolStakeTriple = ({ poolABI, poolAddress, lpAddress, stakeText, apr, debaseAPR, mphAPR, crvAPR }) => {
	const { library, account } = useWeb3React();
	const [ rewarded, setRewarded ] = useState(0);

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

	const { data: userStakedBalance, mutate: getUserStakedBalance } = useSWR([ poolAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: walletBalance, mutate: getWalletBalance } = useSWR([ lpAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: debaseSupply, mutate: getDebaseSupply } = useSWR([ CONTRACT_ADDRESS.debase, 'totalSupply' ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: earned, mutate: getEarned } = useSWR([ poolAddress, 'earned', account ], {
		fetcher: fetcher(library, poolABI)
	});

	async function getRewarded() {
		const debaseData = await request(
			'https://api.thegraph.com/subgraphs/name/debaseonomics/debaseethpool',
			gqlQuery,
			{
				user: account.toLowerCase()
			}
		);
		setRewarded(parseFloat(debaseData.user.rewarded));
	}

	useEffect(
		() => {
			library.on('block', () => {
				getEarned(undefined, true);
				getUserStakedBalance(undefined, true);
				getWalletBalance(undefined, true);
				getPoolEnabled(undefined, true);
				getDebaseSupply(undefined, true);
				getRewarded();
			});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[ library, getEarned, getPoolEnabled, getDebaseSupply, getUserStakedBalance, getWalletBalance ]
	);

	const userListData = [
		{
			label: 'Unstaked (' + stakeText + ')',
			value: walletBalance ? parseFloat(formatEther(walletBalance)).toFixed(14) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		},
		{
			label: 'Staked (' + stakeText + ')',
			value: userStakedBalance ? (
				parseFloat(formatEther(userStakedBalance)).toFixed(14) * 1
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'Your current staked balance in the pool.'
		}
	];

	const earnedListData = [
		{
			label: 'Lock Reward (DEBASE)',
			value:
				earned && debaseSupply ? (
					(parseFloat(formatEther(earned[0].mul(debaseSupply).div(parseEther('1')))) + rewarded).toFixed(6) *
					2
				) : (
					<Spinner size="xsmall" />
				),
			tooltip: 'Amount of DEBASE rewarded after 1 month'
		},
		{
			label: 'Claimable (DEBASE)',
			value:
				earned && debaseSupply ? (
					parseFloat(formatEther(earned[0].mul(debaseSupply).div(parseEther('1')))).toFixed(4) * 1
				) : (
					<Spinner size="xsmall" />
				),
			tooltip: 'Amount of DEBASE reward you have earned.'
		},
		{
			label: 'Claimable (MPH)',
			value: earned ? parseFloat(formatEther(earned[1])).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Amount of DEBASE reward you have earned.'
		},
		{
			label: 'Claimable (CRV)',
			value: earned ? parseFloat(formatEther(earned[2])).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Amount of DEBASE reward you have earned.'
		}
	];

	const aprListData = [
		{
			label: 'DEBASE APR',
			value: debaseAPR,
			tooltip: "Pool's annual percentage rate"
		},
		{
			label: 'CRV APR',
			value: crvAPR,
			tooltip: "Pool's annual percentage rate"
		},
		{
			label: 'MPH APR',
			value: mphAPR,
			tooltip: "Pool's annual percentage rate"
		},
		{
			label: 'Total APR',
			value: apr,
			tooltip: "Pool's annual percentage rate"
		},
		{
			label: 'Total APR + Lock Reward APR',
			value: 3 * parseFloat(debaseAPR) + parseFloat(crvAPR) + parseFloat(mphAPR) + ' %',
			tooltip: "Pool's annual percentage rate plus locked reward annual percentage rate"
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
				transaction = await tokenContract.approve(poolAddress, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.stake(toStake);
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
			let transaction = await poolContract.withdraw(toWithdraw);
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
			let transaction = await poolContract.getReward();
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
					<List data={userListData} />
					<List color="primary" data={earnedListData} />
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
