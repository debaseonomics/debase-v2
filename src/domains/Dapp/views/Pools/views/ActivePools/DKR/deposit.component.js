import { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers/lib/ethers';
import { ABI_POOL, ABI_LP } from '@constants';
import { fetcher } from '@utils';
import { List, Button, Input, Flexbox, Spinner } from '@core/components';
import { StyledPoolStake, StyledCardInner } from './deposit.styles';
import { parseEther } from 'ethers/lib/utils';
import { SnackbarManagerContext } from '@dapp/managers';
import InfoCard from '../InfoCard/infocard.component';
import CONTRACT_ADDRESS from '@constants/contract-address.constant';

const Deposit = ({ poolABI, poolAddress }) => {
	const { library, account } = useWeb3React();

	const [ isDepositDebaseLoading, setIsDepositDebaseLoading ] = useState(false);
	const [ isDepositDegovLoading, setIsDepositDegovLoading ] = useState(false);

	const [ isDepositDebaseActive, setIsDepositDebaseActive ] = useState(false);
	const [ isDepositDegovActive, setIsDepositDegovActive ] = useState(false);

	const [ debaseInputValue, setStakeInputValue ] = useState('');
	const [ degovInputValue, setDegovInputValue ] = useState('');

	const { openSnackbar } = useContext(SnackbarManagerContext);

	const { data: debaseExchangeRate, mutate: getDebaseExchangeRate } = useSWR([ poolAddress, 'debaseExchangeRate' ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: degovExchangeRate, mutate: getDegovExchangeRate } = useSWR([ poolAddress, 'degovExchangeRate' ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: debaseDeposited, mutate: getDebaseDeposited } = useSWR([ poolAddress, 'debaseDeposited', account ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: degovDeposited, mutate: getDegovDeposited } = useSWR([ poolAddress, 'degovDeposited', account ], {
		fetcher: fetcher(library, poolABI)
	});
	const { data: iouBalance, mutate: getIouBalance } = useSWR([ poolAddress, 'getIouBalance', account ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: debaseBalance, mutate: getDebaseBalance } = useSWR(
		[ CONTRACT_ADDRESS.debase, 'balanceOf', account ],
		{
			fetcher: fetcher(library, ABI_LP)
		}
	);

	const { data: degovBalance, mutate: getDegovBalance } = useSWR([ CONTRACT_ADDRESS.degov, 'balanceOf', account ], {
		fetcher: fetcher(library, ABI_LP)
	});

	const { data: duration, mutate: getDuration } = useSWR([ poolAddress, 'duration' ], {
		fetcher: fetcher(library, poolABI)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseExchangeRate(undefined, true);
				getDegovExchangeRate(undefined, true);
				getDegovBalance(undefined, true);
				getDebaseDeposited(undefined, true);
				getDegovDeposited(undefined, true);
				getDebaseBalance(undefined, true);
				getIouBalance(undefined, true);
				getDuration(undefined, true);
			});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[
			library,
			getDegovBalance,
			getDebaseBalance,
			getDebaseExchangeRate,
			getDegovExchangeRate,
			getDebaseDeposited,
			getDegovDeposited,
			getIouBalance,
			getDuration
		]
	);

	// List data arrays
	const poolListData = [
		{
			label: 'Debase Deposited By You',
			value: debaseDeposited ? (
				parseFloat(formatEther(debaseDeposited)).toFixed(2) + ' Debase'
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'LP limit per wallet'
		},
		{
			label: 'Degov Deposited By You',
			value: degovDeposited ? (
				parseFloat(formatEther(degovDeposited)).toFixed(2) + ' Degov'
			) : (
				<Spinner size="xsmall" />
			),
			tooltip: 'Total LP limit per pool'
		}
	];

	const userListData = [
		{
			label: 'Debase Balance',
			value: debaseBalance ? parseFloat(formatEther(debaseBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		},
		{
			label: 'Degov Balance',
			value: degovBalance ? parseFloat(formatEther(degovBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current staked balance in the pool.'
		}
	];

	const iouData = [
		{
			label: 'IOU Balance',
			value: debaseBalance ? parseFloat(formatEther(iouBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		}
	];

	// functions
	async function handleDebaseDeposit() {
		if (!isDepositDebaseActive) return setIsDepositDebaseActive(true);
		setIsDepositDebaseLoading(true);
		const poolContract = new Contract(poolAddress, poolABI, library.getSigner());
		const tokenContract = new Contract(CONTRACT_ADDRESS.debase, ABI_LP, library.getSigner());
		try {
			const toStake = parseEther(debaseInputValue);
			let allowance = await tokenContract.allowance(account, poolAddress);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(poolAddress, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.depositDebase(toStake);
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
		setIsDepositDebaseLoading(false);
	}
	async function handleDegovDeposit() {
		if (!isDepositDegovActive) return setIsDepositDegovActive(true);
		setIsDepositDegovActive(true);
		const poolContract = new Contract(poolAddress, poolABI, library.getSigner());
		const tokenContract = new Contract(CONTRACT_ADDRESS.degov, ABI_LP, library.getSigner());
		try {
			const toStake = parseEther(debaseInputValue);
			let allowance = await tokenContract.allowance(account, poolAddress);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(poolAddress, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.depositDegov(toStake);
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
		setIsDepositDegovActive(false);
	}

	const handleDebaseDeposit = () => {
		setStakeInputValue(formatEther(walletBalance));
	};
	const handleMaxDegov = () => {
		setDegovInputValue(formatEther(userStakedBalance));
	};
	const onChangeStakeInput = (value) => {
		setStakeInputValue(value);
	};
	const onChangeUnstakeInput = (value) => {
		setDegovInputValue(value);
	};

	return (
		<StyledPoolStake>
			<InfoCard>
				<StyledCardInner>
					<List data={poolListData} />
					<List color="primary" data={userListData} />
					<List color="secundary" data={iouData} />
				</StyledCardInner>
			</InfoCard>

			{poolEnabled !== undefined && (
				<InfoCard gutter={20}>
					{isDepositDebaseActive && (
						<Flexbox direction="horizontal" gap="10px">
							<Input value={debaseInputValue} placeholder="Stake amount" onChange={onChangeStakeInput} />
							<Button color="primary" onClick={handleMaxDebase}>
								max
							</Button>
						</Flexbox>
					)}
					<Button isLoading={isDepositDebaseLoading} onClick={handleDebaseDeposit}>
						Deposit Debase
					</Button>

					{isDepositDegovActive && (
						<Flexbox direction="horizontal" gap="10px">
							<Input
								value={degovInputValue}
								placeholder="Unstake amount"
								onChange={onChangeUnstakeInput}
							/>
							<Button color="primary" onClick={handleMaxDegov}>
								max
							</Button>
						</Flexbox>
					)}
					<Button isLoading={isDepositDegovLoading} onClick={handleDegovDeposit}>
						Deposit Degov
					</Button>
				</InfoCard>
			)}
		</StyledPoolStake>
	);
};

export default Deposit;
