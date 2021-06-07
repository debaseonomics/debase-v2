import { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers/lib/ethers';
import { ABI_LP } from '@constants';
import { fetcher } from '@utils';
import { List, Button, Input, Flexbox, Spinner } from '@core/components';
import { StyledPoolStake, StyledCardInner, StyledConversionText } from './deposit.styles';
import { parseEther } from 'ethers/lib/utils';
import { SnackbarManagerContext } from '@dapp/managers';
import CONTRACT_ADDRESS from '@constants/contract-address.constant';
import { InfoCard } from '@dapp/components/index';
import { TextMini } from '@core/components/index';

const Deposit = ({ poolABI, poolAddress }) => {
	const { library, account } = useWeb3React();

	const [ isDepositDebaseLoading, setIsDepositDebaseLoading ] = useState(false);
	const [ isDepositDegovLoading, setIsDepositDegovLoading ] = useState(false);

	const [ isDepositDebaseActive, setIsDepositDebaseActive ] = useState(false);
	const [ isDepositDegovActive, setIsDepositDegovActive ] = useState(false);

	const [ debaseInputValue, setDebaseInputValue ] = useState('');
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
	const { data: iouBalance, mutate: getIouBalance } = useSWR([ poolAddress, 'iouBalance', account ], {
		fetcher: fetcher(library, poolABI)
	});

	const { data: depositEnabled, mutate: getDepositEnabled } = useSWR([ poolAddress, 'depositEnabled' ], {
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

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseExchangeRate(undefined, true);
				getDegovExchangeRate(undefined, true);
				getDegovBalance(undefined, true);
				getDebaseDeposited(undefined, true);
				getDegovDeposited(undefined, true);
				getDebaseBalance(undefined, true);
				getDepositEnabled(undefined, true);
				getIouBalance(undefined, true);
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
			getDepositEnabled,
			getDegovExchangeRate,
			getDebaseDeposited,
			getDegovDeposited,
			getIouBalance
		]
	);

	// List data arrays
	const poolListData = [
		{
			label: 'Swap Enabled',
			value: depositEnabled !== undefined ? depositEnabled ? 'True' : 'False' : <Spinner size="xsmall" />,
			tooltip: 'LP limit per wallet'
		},
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
			label: 'Your IOU Balance',
			value: iouBalance ? parseFloat(formatEther(iouBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		}
	];

	// functions
	async function handleDebase() {
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
				message: 'Deposit success',
				status: 'success'
			});
		} catch (error) {
			openSnackbar({
				message: 'Deposit failed',
				status: 'error'
			});
		}
		setIsDepositDebaseLoading(false);
	}
	async function handleDegov() {
		if (!isDepositDegovActive) return setIsDepositDegovActive(true);
		setIsDepositDegovLoading(true);
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
				message: 'Deposit success',
				status: 'success'
			});
		} catch (error) {
			openSnackbar({
				message: 'Deposit failed',
				status: 'error'
			});
		}
		setIsDepositDegovActive(false);
	}

	const handleDebaseMax = () => {
		setDebaseInputValue(formatEther(debaseBalance));
	};
	const handleDegovMax = () => {
		setDegovInputValue(formatEther(degovBalance));
	};
	const onChangeDebaseInput = (value) => {
		setDebaseInputValue(value);
	};
	const onChangeDegovInput = (value) => {
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

			{depositEnabled && (
				<InfoCard gutter={20}>
					{isDepositDebaseActive && (
						<Flexbox gap="15px">
							<Flexbox direction="horizontal" gap="10px">
								<Input
									value={debaseInputValue}
									placeholder="Debase amount"
									onChange={onChangeDebaseInput}
								/>
								<Button color="primary" onClick={handleDebaseMax}>
									max
								</Button>
							</Flexbox>
							{debaseExchangeRate && (
								<StyledConversionText>
									<TextMini>
										converts to{' '}
										{debaseExchangeRate * parseFloat(formatEther(debaseInputValue)).toFixed(4)} IOU
									</TextMini>
								</StyledConversionText>
							)}
						</Flexbox>
					)}
					<Button isLoading={isDepositDebaseLoading} onClick={handleDebase}>
						Deposit Debase
					</Button>

					{isDepositDegovActive && (
						<Flexbox gap="15px">
							<Flexbox direction="horizontal" gap="10px">
								<Input
									value={degovInputValue}
									placeholder="Degov amount"
									onChange={onChangeDegovInput}
								/>
								<Button color="primary" onClick={handleDegovMax}>
									max
								</Button>
							</Flexbox>
							{degovExchangeRate && (
								<StyledConversionText>
									<TextMini>
										converts to{' '}
										{degovExchangeRate * parseFloat(formatEther(degovInputValue)).toFixed(4)} IOU
									</TextMini>
								</StyledConversionText>
							)}
						</Flexbox>
					)}
					<Button isLoading={isDepositDegovLoading} onClick={handleDegov}>
						Deposit Degov
					</Button>
				</InfoCard>
			)}
		</StyledPoolStake>
	);
};

export default Deposit;
