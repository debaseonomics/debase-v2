import { Fragment, useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { PoolAprContext } from '@dapp/contexts';
import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, InfoCard, DisconnectedWalletCard } from '@dapp/components';
import { ABI_MPH88, ABI_LP } from '@constants/index';
import { SnackbarManagerContext } from '@dapp/managers';
import { fetcher } from '@utils';
import useSWR from 'swr';
import { Contract, BigNumber } from 'ethers';
import { request, gql } from 'graphql-request';
import { parseEther, formatEther } from '@ethersproject/units';
import { StyledPoolStake, StyledCardInner, StyledDepositIds, StyledLabel, StyledInputs, StyledDepositContainer } from './dm88-pool.styles';
import { List, Spinner, Flexbox, Input, Button, Select } from '@core/components';
import {DateTime} from "luxon";

const DM88Pool = () => {
	const { active, library, account } = useWeb3React();
	const { pools } = useContext(PoolAprContext);

	const { openSnackbar } = useContext(SnackbarManagerContext);
	const [ stakeInputValue, setStakeInputValue ] = useState('');

	const [ isStakeLoading, setIsStakeLoading ] = useState(false);
	const [ isStakingActive, setIsStakingActive ] = useState(false);

	const [ isWithdrawLoading, setIsWithdrawLoading ] = useState(false);
	const [ isClaimLoading, setIsClaimLoading ] = useState(false);
	const [ selectedDepositIndex, setSelectedDepositIndex ] = useState(0);
	const [ depositIds, setDepositIds ] = useState([]);

	const TOTAL_GONS = BigNumber.from('115792089237316195423570985008687907853269984665640564000000000000000000000000');

	const { data: lockPeriod, mutate: getLockPeriod } = useSWR([ CONTRACT_ADDRESS.mph88Pool, 'lockPeriod' ], {
		fetcher: fetcher(library, ABI_MPH88)
	});

	const { data: poolEnabled, mutate: getPoolEnabled } = useSWR([ CONTRACT_ADDRESS.mph88Pool, 'poolEnabled' ], {
		fetcher: fetcher(library, ABI_MPH88)
	});

	const { data: debaseBalance, mutate: getDebaseBalance } = useSWR(
		[ CONTRACT_ADDRESS.debase, 'balanceOf', account ],
		{
			fetcher: fetcher(library, ABI_LP)
		}
	);

	const { data: daiBalance, mutate: getDaiBalance } = useSWR([ CONTRACT_ADDRESS.dai, 'balanceOf', account ], {
		fetcher: fetcher(library, ABI_LP)
	});

	const { data: debaseSupply, mutate: getDebaseSupply } = useSWR([ CONTRACT_ADDRESS.debase, 'totalSupply' ], {
		fetcher: fetcher(library, ABI_LP)
	});

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR([ CONTRACT_ADDRESS.mph88Pool, 'earned', selectedDepositIndex ], {
		fetcher: fetcher(library, ABI_MPH88)
	});

	useEffect(
		() => {
			library &&
				library.on('block', () => {
					getDebaseBalance(undefined, true);
					getDaiBalance(undefined, true);
					getPoolEnabled(undefined, true);
					getLockPeriod(undefined, true);
					getDebaseSupply(undefined, true);
					getDebaseAccrued(undefined, true);
					findDepositID();
				});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[ library, getDebaseBalance, getDaiBalance, getPoolEnabled, getLockPeriod, getDebaseSupply, getDebaseAccrued ]
	);

	const depositsQuery = gql`
		query getDeposit($nftID: Int!) {
			deposits(
				where: {
					pool: "0xdc86ac6140026267e0873b27c8629efe748e7146"
					user: "0x36f1f4125b4066ca4b768f9f5f9a737bd4fa8f62"
					nftID: $nftID
				}
			) {
				fundingID
				interestEarned
				mintMPHAmount
			}
		}
	`;

	async function handleStake() {
		if (!isStakingActive) return setIsStakingActive(true);
		setIsStakeLoading(true);
		const tokenContract = new Contract(CONTRACT_ADDRESS.debaseDaiLp, ABI_LP, library.getSigner());
		const poolContract = new Contract(CONTRACT_ADDRESS.mph88Pool, ABI_MPH88, library.getSigner());
		try {
			const toStake = parseEther(stakeInputValue);
			let allowance = await tokenContract.allowance(account, CONTRACT_ADDRESS.mph88Pool);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(CONTRACT_ADDRESS.mph88Pool, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.deposit(toStake);
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

	async function handleWithdraw() {
		setIsWithdrawLoading(true);
		const poolContract = new Contract(CONTRACT_ADDRESS.mph88Pool, ABI_MPH88, library.getSigner());

		if (depositIds[selectedDepositIndex].withdrawed === false) {
			try {
				let transaction = await poolContract.withdraw(
					depositIds[selectedDepositIndex].id.toNumber(),
					parseInt(depositIds[selectedDepositIndex].fundingId)
				);
				await transaction.wait(1);

				openSnackbar({
					message: 'Deposit withdraw successfully',
					status: 'success'
				});
			} catch (error) {
				openSnackbar({
					message: 'Deposit withdraw failed, please try again',
					status: 'error'
				});
			}
		} else {
			openSnackbar({
				message: 'Deposit already withdrawn',
				status: 'error'
			});
		}

		setIsWithdrawLoading(false);
	}

	async function findDepositID() {
		const poolContract = new Contract(CONTRACT_ADDRESS.mph88Pool, ABI_MPH88, library.getSigner());

		let arr = [];
		let x = 0;

		while (true) {
			try {
				let depositId = await poolContract.depositIds('0xA6D6A1320fE6e26474b74623d4cDC02BA56073b1', x);

				let depositInfo = await poolContract.deposits(depositId);
				let fundingInfo = await request(
					'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
					depositsQuery,
					{
						nftID: depositInfo[6].toNumber()
					}
				);

				let data = {
					id: depositId,
					fundingId: fundingInfo.deposits[0].fundingID,
					amount: depositInfo[1],
					daiAmount: depositInfo[2],
					interestEarnedOnDai: fundingInfo.deposits[0].interestEarned,
					debaseReward: depositInfo[3],
					mphReward: fundingInfo.deposits[0].mintMPHAmount,
					maturationTimestamp: depositInfo[9],
					withdrawed: depositInfo[10]
				};

				arr.push(data);
			} catch (error) {
				console.log(error);
				break;
			}
			x++;
		}
		setDepositIds(arr);
	}

	async function handleWithdrawAll() {
		setIsWithdrawLoading(true);
		const poolContract = new Contract(CONTRACT_ADDRESS.mph88Pool, ABI_MPH88, library.getSigner());

		if (depositIds.length) {
			let allDepositIds = depositIds.map((ele) => {
				if (ele.withdrawed === false) {
					return ele.id.toNumber();
				}
				return null;
			});

			let allFundingIds = depositIds.map((ele) => {
				if (ele.withdrawed === false) {
					return parseInt(ele.fundingId);
				}
				return null;
			});

			try {
				const transaction = await poolContract.multiWithdraw(allDepositIds, allFundingIds);
				await transaction.wait(1);

				openSnackbar({
					message: 'Withdraw all deposits successfully executed',
					status: 'success'
				});
			} catch (error) {
				openSnackbar({
					message: 'Withdraw all deposits failed, please try again',
					status: 'error'
				});
			}
		} else {
			openSnackbar({
				message: 'No deposits remaining to withdraw',
				status: 'error'
			});
		}

		setIsWithdrawLoading(false);
	}

	// List data arrays
	const poolListData = [
		{
			label: 'Lock Period',
			value: lockPeriod ? lockPeriod.toNumber() : <Spinner size="xsmall" />,
			tooltip: 'LP limit per wallet'
		}
	];

	const userListData = [
		{
			label: 'Unstaked (DEBASE)',
			value: debaseBalance ? parseFloat(formatEther(debaseBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		},
		{
			label: 'Unstaked (DAI)',
			value: daiBalance ? parseFloat(formatEther(daiBalance)).toFixed(4) * 1 : <Spinner size="xsmall" />,
			tooltip: 'Your current balance that can be staked into the pool.'
		}
	];

	const depositListData = [
		{
			label: 'Deposit unlocks in',
			value: depositIds.length ? DateTime.fromSeconds(depositIds[selectedDepositIndex].maturationTimestamp.toNumber()).toRelative({ round: false}) : <Spinner size="xsmall" /> ,
		},
		{
			label: 'Deposit Lp Staked',
			value: depositIds.length ? parseFloat(formatEther(depositIds[selectedDepositIndex].amount)).toFixed(8) * 1 : <Spinner size="xsmall" />
		},
		{
			label: 'Dai Unlocked From Lp',
			value: depositIds.length ? parseFloat(formatEther(depositIds[selectedDepositIndex].daiAmount)).toFixed(8) * 1 : <Spinner size="xsmall" />
		},
		{
			label: 'Dai earned from deposit',
			value: depositIds.length ? parseFloat(depositIds[selectedDepositIndex].interestEarnedOnDai).toFixed(8) * 1 : <Spinner size="xsmall" />
		},
		{
			label: 'Debase Unlocked From Lp',
			value: depositIds.length && debaseSupply ? parseFloat(formatEther(depositIds[selectedDepositIndex].debaseReward.div(TOTAL_GONS.div(debaseSupply)))).toFixed(8) : <Spinner size="xsmall" />
		},
		{
			label: '88Mph Reward',
			value: depositIds.length ? (parseFloat(depositIds[selectedDepositIndex].mphReward) * 0.51).toFixed(8) : <Spinner size="xsmall" />
		},
		{
			label: 'Debase Accrued',
			value: depositIds.length && debaseAccrued && debaseSupply ? (parseFloat(formatEther(debaseAccrued.mul(debaseSupply).div(parseEther('1')))).toFixed(8) * 1) : <Spinner size="xsmall" />
		},
	];

	const handleMaxStake = () => {
		setStakeInputValue(formatEther(Math.min(debaseBalance, daiBalance)));
	};

	const onChangeDebaseStakeInput = (value) => {
		setStakeInputValue(value);
	};

	const onChangeDaiStakeInput = (value) => {
		setStakeInputValue(value);
	};

	return (
		<Fragment>
			<Section label="DM88 Pool" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<StyledPoolStake>
							<InfoCard style={{ gap: `0px` }}>
								<StyledDepositIds>
									<StyledLabel>Deposit Ids</StyledLabel>
									<Select list={depositIds} onChangedIndex={setSelectedDepositIndex} width={100} height={30}></Select>
								</StyledDepositIds>
								<List data={depositListData} />
							</InfoCard>
							<InfoCard>
								<StyledCardInner>
									<List data={poolListData} />
									<List color="primary" data={userListData} />
								</StyledCardInner>
							</InfoCard>

							{poolEnabled !== undefined && (
								<InfoCard gutter={20}>
									{isStakingActive && (
										<Flexbox direction="horizontal" gap="10px">
											<StyledInputs>
												<Input
													value={stakeInputValue}
													placeholder="Debase amount"
													onChange={onChangeDebaseStakeInput}
												/>
												<Input
													value={stakeInputValue}
													placeholder="Dai amount"
													onChange={onChangeDaiStakeInput}
												/>
											</StyledInputs>
											<Button color="primary" style={{margin: `auto` }} onClick={handleMaxStake}>
												max
											</Button>
										</Flexbox>
									)}
									{poolEnabled && (
										<Button isLoading={isStakeLoading} onClick={handleStake}>
											deposit
										</Button>
									)}
									{depositIds.length && (
										<Fragment>
											<Button isLoading={isWithdrawLoading} onClick={handleWithdraw}>
												withdraw selected deposit
											</Button>
											<Button isLoading={isWithdrawLoading} onClick={handleWithdrawAll}>
												withdraw all deposits
											</Button>
										</Fragment>
									)}
								</InfoCard>
							)}
						</StyledPoolStake>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DM88Pool;
