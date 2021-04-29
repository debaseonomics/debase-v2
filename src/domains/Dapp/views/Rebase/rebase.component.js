import { useState, useContext, useEffect } from 'react';

import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers';

import { Button, List, Spinner } from '@core/components';
import { SnackbarManagerContext } from '@dapp/managers';
import { CONTRACT_ADDRESS, ABI_ORCHESTRATOR, ABI_DEBASEPOLICY } from '@constants';
import { fetcher, calcDateDifference } from '@utils';
import { DisconnectedWalletCard } from '@dapp/components/index';
import { InfoCard } from '@dapp/components/common/index.js';
import { StyledRebase, StyledRebaseInner } from './rebase.styles';
import { DateTime } from 'luxon';

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
					getDefaultPositiveRebaseLag(undefined, true);
					getDefaultNegativeRebaseLag(undefined, true);
					getMinRebaseTimeIntervalSec(undefined, true);
					getRebaseWindowOffsetSec(undefined, true);
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
			getDefaultPositiveRebaseLag,
			getDefaultNegativeRebaseLag,
			getMinRebaseTimeIntervalSec,
			getRebaseWindowOffsetSec,
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
			label: 'Minimum rebase period',
			value: minRebaseTimeIntervalSec ? (
				(minRebaseTimeIntervalSec.toNumber() / (60 * 60)).toString() + ' Hours'
			) : (
				<Spinner size="xsmall" />
			),
			valueType: '',
			tooltip: 'Time period after which a rebase can occur'
		},
		{
			label: 'Rebase Happens At',
			value: rebaseWindowOffsetSec ? (
				DateTime.fromSeconds(rebaseWindowOffsetSec.toNumber()).toFormat('t')
			) : (
				<Spinner size="xsmall" />
			),
			valueType: '',
			tooltip: 'The number of seconds from the beginning of the rebase interval, where the rebase window begins'
		},
		{
			label: 'Upper lag',
			value: defaultPositiveRebaseLag ? defaultPositiveRebaseLag.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Default supply smoothing to use for positive supply changes'
		},
		{
			label: 'Lower lag',
			value: defaultNegativeRebaseLag ? defaultNegativeRebaseLag.toNumber() : <Spinner size="xsmall" />,
			valueType: '',
			tooltip: 'Default supply smoothing to use for negative supply changes'
		}
	];

	/* list data */
	const lastRebaseData = [
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
		<StyledRebase>
			<InfoCard>
				<StyledRebaseInner>
					<List data={rebaseParamsListData} />
					<List data={lastRebaseData} color="primary" />
				</StyledRebaseInner>
			</InfoCard>
			<InfoCard gutter={20}>
				<Button isLoading={rebaseLoading} isDisabled={rebaseLoading} onClick={(e) => onClickFireRebase(e)}>
					fire rebase
				</Button>
			</InfoCard>
		</StyledRebase>
	);
};

export default Rebase;
