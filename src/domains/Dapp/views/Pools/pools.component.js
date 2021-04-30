import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Section, DisconnectedWalletCard, Grid, PoolCard } from '@dapp/components';
import POOLS_ROUTES from './pools.routes';
import CONTRACT_ADDRESS from '@constants/contract-address.constant';
import ABI_POOL from '@constants/abi-pool.constant';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { List } from '@core/components/index';
import { CodeIcon } from '@assets/index';

const Pools = () => {
	const { path } = useRouteMatch();
	const { active, library } = useWeb3React();

	const { data: debaseDaiPoolEnabled, mutate: getDebaseDaiPoolEnabled } = useSWR(
		[ CONTRACT_ADDRESS.debaseDaiV3Pool, 'poolEnabled' ],
		{
			fetcher: fetcher(library, ABI_POOL)
		}
	);

	const { data: debaseEthPoolEnabled, mutate: getDebaseEthPoolEnabled } = useSWR(
		[ CONTRACT_ADDRESS.debaseEthPool, 'poolEnabled' ],
		{
			fetcher: fetcher(library, ABI_POOL)
		}
	);

	const { data: degovEthPoolEnabled, mutate: getDegovEthPoolEnabled } = useSWR(
		[ CONTRACT_ADDRESS.degovEthPool, 'poolEnabled' ],
		{
			fetcher: fetcher(library, ABI_POOL)
		}
	);

	useEffect(
		() => {
			library &&
				library.on('block', () => {
					getDebaseDaiPoolEnabled(undefined, true);
					getDegovEthPoolEnabled(undefined, true);
					getDebaseEthPoolEnabled(undefined, true);
				});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[ library, getDebaseDaiPoolEnabled, getDegovEthPoolEnabled, getDebaseEthPoolEnabled ]
	);

	// List data arrays
	const debaseDaiLPListData = [
		{
			label: 'Staked Token',
			value: 'Debase/Dai LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Token',
			value: 'Debase',
			tooltip: 'Reward token pool gives'
		},

		{
			label: 'APR',
			value: '200%',
			tooltip: "Pool's annual percentage rate"
		}
	];

	const debaseEthLPListData = [
		{
			label: 'Staked Token',
			value: 'Debase/Eth LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Tokens',
			value: 'Debase/88Mph/Crv',
			tooltip: 'Reward tokens pool gives'
		},

		{
			label: 'APR',
			value: '200%',
			tooltip: "Pool's annual percentage rate"
		}
	];

	const degovEthLPListData = [
		{
			label: 'Staked Token',
			value: 'Degov/Eth LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Token',
			value: 'Debase',
			tooltip: 'Reward token pool gives'
		},

		{
			label: 'APR',
			value: '200%',
			tooltip: "Pool's annual percentage rate"
		}
	];

	const renderPools = () => {
		if (!active) return <DisconnectedWalletCard />;
		return (
			<Grid>
				<PoolCard
					label="DEBASE/DAI LP Pool"
					routePath="/pools/debase-dai-lp-pool"
					linkData={[ { icon: <CodeIcon />, info: '', url: '' } ]}
					isActive={debaseDaiPoolEnabled ? debaseDaiPoolEnabled : false}
				>
					<List data={debaseDaiLPListData} />
				</PoolCard>
				<PoolCard
					label="DEBASE/ETH LP Pool"
					routePath="/pools/debase-eth-lp-pool"
					linkData={[ { icon: <CodeIcon />, info: '', url: '' } ]}
					isActive={debaseEthPoolEnabled ? debaseEthPoolEnabled : false}
				>
					<List data={debaseEthLPListData} />
				</PoolCard>
				<PoolCard
					label="DEGOV/ETH LP Pool"
					routePath="/pools/degov-eth-lp-pool"
					linkData={[ { icon: <CodeIcon />, info: '', url: '' } ]}
					isActive={degovEthPoolEnabled ? degovEthPoolEnabled : false}
				>
					<List data={degovEthLPListData} />
				</PoolCard>
			</Grid>
		);
	};

	return (
		<Switch>
			<Route exact path={path}>
				<Section>{renderPools()}</Section>
			</Route>

			{POOLS_ROUTES.map((route, i) => {
				const { label, path, component } = route;
				return (
					<Route key={label + i} path={path}>
						{component}
					</Route>
				);
			})}
		</Switch>
	);
};

export default Pools;
