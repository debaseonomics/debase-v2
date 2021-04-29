import { useState, useContext, useEffect } from 'react';

import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers';

import { Button, List, Spinner } from '@core/components';
import { SnackbarManagerContext } from '@dapp/managers';
import { LabeledCard, Grid } from '@dapp/components';
import { StyledGridItem } from './rebase.styles.js';
import { CONTRACT_ADDRESS, ABI_ORCHESTRATOR, ABI_DEBASEPOLICY, ABI_UNI } from '@constants';
import { fetcher, calcDateDifference } from '@utils';
import { DisconnectedWalletCard } from '@dapp/components/index';
import { Countdown } from '@core/components/index';

const Rebase = () => {
	const { library, active } = useWeb3React();

	const [ rebaseLoading, setRebaseLoading ] = useState(false);

	const { openSnackbar } = useContext(SnackbarManagerContext);

	/* fetch rebase data */
	const { data: priceTargetRate, mutate: getPriceTargetRate } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'priceTargetRate' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: upperDeviationThreshold, mutate: getUpperDeviationThreshold } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'upperDeviationThreshold' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: lowerDeviationThreshold, mutate: getLowerDeviationThreshold } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'lowerDeviationThreshold' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: useDefaultRebaseLag, mutate: getUseDefaultRebaseLag } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'useDefaultRebaseLag' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: defaultPositiveRebaseLag, mutate: getDefaultPositiveRebaseLag } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'defaultPositiveRebaseLag' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: defaultNegativeRebaseLag, mutate: getDefaultNegativeRebaseLag } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'defaultNegativeRebaseLag' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: minRebaseTimeIntervalSec, mutate: getMinRebaseTimeIntervalSec } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'minRebaseTimeIntervalSec' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: rebaseWindowOffsetSec, mutate: getRebaseWindowOffsetSec } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'rebaseWindowOffsetSec' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);
	const { data: rebaseWindowLengthSec, mutate: getRebaseWindowLengthSec } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'rebaseWindowLengthSec' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);

	const { data: reserves, mutate: getReserves } = useSWR([ CONTRACT_ADDRESS.debaseDaiLp, 'getReserves' ], {
		fetcher: fetcher(library, ABI_UNI)
	});
	const { data: lastRebaseTimestampSec, mutate: getLastRebaseTimestampSec } = useSWR(
		[ CONTRACT_ADDRESS.debasePolicy, 'lastRebaseTimestampSec' ],
		{
			fetcher: fetcher(library, ABI_DEBASEPOLICY)
		}
	);

	useEffect(
		() => {
			library &&
				library.on('block', () => {
					getPriceTargetRate(undefined, true);
					getUpperDeviationThreshold(undefined, true);
					getLowerDeviationThreshold(undefined, true);
					getUseDefaultRebaseLag(undefined, true);
					getDefaultPositiveRebaseLag(undefined, true);
					getDefaultNegativeRebaseLag(undefined, true);
					getMinRebaseTimeIntervalSec(undefined, true);
					getRebaseWindowOffsetSec(undefined, true);
					getRebaseWindowLengthSec(undefined, true);
					getReserves(undefined, true);
					getLastRebaseTimestampSec(undefined, true);
				});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[
			library,
			getPriceTargetRate,
			getUpperDeviationThreshold,
			getLowerDeviationThreshold,
			getUseDefaultRebaseLag,
			getDefaultPositiveRebaseLag,
			getDefaultNegativeRebaseLag,
			getMinRebaseTimeIntervalSec,
			getRebaseWindowOffsetSec,
			getRebaseWindowLengthSec,
			getReserves,
			getLastRebaseTimestampSec
		]
	);

	/* list data */
	const rebaseParamsListData = [
		{
			label: 'Target price',
			value: priceTargetRate ? parseFloat(formatEther(priceTargetRate)) : <Spinner size="xsmall" />,
			valueType: 'dai',
			tooltip: 'The target price in dai debase must meet'
		},
		{
			label: 'Price upper deviation',
			value:
				upperDeviationThreshold && priceTargetRate ? (
					parseFloat(formatEther(upperDeviationThreshold)) + parseFloat(formatEther(priceTargetRate))
				) : (
					<Spinner size="xsmall" />
				),
			valueType: 'dai',
			tooltip: 'The positive deviation from the target price within not to rebase'
		},
		{
			label: 'Price lower deviation',
			value:
				lowerDeviationThreshold && priceTargetRate ? (
					parseFloat(formatEther(priceTargetRate)) - parseFloat(formatEther(lowerDeviationThreshold))
				) : (
					<Spinner size="xsmall" />
				),
			valueType: 'dai',
			tooltip: 'The negative deviation from the target price within not to rebase'
		},
		{
			label: 'Rebase time period',
			value: minRebaseTimeIntervalSec ? (
				(minRebaseTimeIntervalSec.toNumber() / (60 * 60)).toString() + ' Hours'
			) : (
				<Spinner size="xsmall" />
			),
			valueType: '',
			tooltip: 'Time period after which a rebase can occur'
		},
		{
			label: 'Rebase offset',
			value: rebaseWindowOffsetSec ? rebaseWindowOffsetSec.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'The number of seconds from the beginning of the rebase interval, where the rebase window begins'
		},
		{
			label: 'Rebase window',
			value: rebaseWindowLengthSec ? rebaseWindowLengthSec.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'The length of time within which a rebase can occur'
		},
		{
			label: 'Use default lag',
			value:
				useDefaultRebaseLag !== undefined ? useDefaultRebaseLag ? 'True' : 'False' : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Flag to allow usage of default supply smoothing'
		},
		{
			label: 'Default upper lag',
			value: defaultPositiveRebaseLag ? defaultPositiveRebaseLag.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Default supply smoothing to use for positive supply changes'
		},
		{
			label: 'Default lower lag',
			value: defaultNegativeRebaseLag ? defaultNegativeRebaseLag.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Default supply smoothing to use for negative supply changes'
		}
	];

	const liveData = [
		{
			label: 'Current price',
			value: reserves ? (
				parseFloat(parseFloat(formatEther(reserves[0])) / parseFloat(formatEther(reserves[1]))).toFixed(2)
			) : (
				<Spinner size="xsmall" />
			),
			valueType: 'dai',
			tooltip: 'Current market price of debase in relation to dai'
		},
		{
			label: 'Last rebase',
			value: lastRebaseTimestampSec ? (
				calcDateDifference(new Date(lastRebaseTimestampSec.toNumber() * 1000), new Date()).toFixed(2) +
				' day(s) ago'
			) : (
				<Spinner size="xsmall" />
			),
			valueType: '',
			tooltip: 'Time since the last rebase happened'
		}
	];

	const onClickFireRebase = async (e) => {
		setRebaseLoading(true);
		const orchestratorContract = new Contract(CONTRACT_ADDRESS.orchestrator, ABI_ORCHESTRATOR, library.getSigner());
		try {
			await orchestratorContract.rebase();
			openSnackbar({
				message: 'Rebase successfully executed',
				status: 'success'
			});
		} catch (error) {
			openSnackbar({
				message: 'Rebase failed, please try again',
				status: 'error'
			});
		}
		setRebaseLoading(false);
	};
	if (!active) return <DisconnectedWalletCard />;
	return (
		<Grid>
			<StyledGridItem>
				<LabeledCard label="time remaining" gutter={40}>
					<Countdown endDate="2021-04-03" />
				</LabeledCard>
				<LabeledCard isLoading={false} label="current data" color="primary">
					<List data={liveData} />
				</LabeledCard>
				<Button isLoading={rebaseLoading} isDisabled={rebaseLoading} onClick={(e) => onClickFireRebase(e)}>
					fire rebase
				</Button>
			</StyledGridItem>
			<LabeledCard isLoading={false} label="rebasing parameters" color="primary">
				<List data={rebaseParamsListData} />
			</LabeledCard>
		</Grid>
	);
};

export default Rebase;
