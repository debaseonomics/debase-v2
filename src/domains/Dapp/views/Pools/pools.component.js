import React, { useContext, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Section, DisconnectedWalletCard, Grid, PoolCard } from '@dapp/components';
import POOLS_ROUTES from './pools.routes';
import CONTRACT_ADDRESS from '@constants/contract-address.constant';
import ABI_POOL from '@constants/abi-pool.constant';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { List } from '@core/components/index';
import { AccountIcon, CodeIcon } from '@assets/index';
import { PoolAprContext } from '@dapp/contexts';

const Pools = () => {
	const { path } = useRouteMatch();
	const { active, library } = useWeb3React();

	const { pools } = useContext(PoolAprContext);

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

	useEffect(
		() => {
			library &&
				library.on('block', () => {
					getDebaseDaiPoolEnabled(undefined, true);
					getDebaseEthPoolEnabled(undefined, true);
				});
			return () => {
				library && library.removeAllListeners('block');
			};
		},
		[ library, getDebaseDaiPoolEnabled, getDebaseEthPoolEnabled ]
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
			value: pools.degovEthPool ? pools.degovEthPool.apr + ' %' : '...',
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
					linkData={[
						{
							icon: <CodeIcon />,
							info: 'Contract Link',
							url: 'https://etherscan.io/address/0x29e92C31C980098d5724fe82EbC5A824e32d9C9B'
						},
						{
							icon: <AccountIcon />,
							info: 'Buy Pool LP',
							url:
								'https://app.uniswap.org/#/add/0x6b175474e89094c44da98b954eedeac495271d0f/0x9248c485b0b80f76da451f167a8db30f33c70907'
						}
					]}
					isActive={debaseDaiPoolEnabled ? debaseDaiPoolEnabled : false}
				>
					<List data={debaseDaiLPListData} />
				</PoolCard>
				<PoolCard
					label="DEBASE/ETH LP Pool"
					routePath="/pools/debase-eth-lp-pool"
					linkData={[
						{
							icon: <CodeIcon />,
							info: 'Contract Link',
							url: 'https://etherscan.io/address/0x05E8a57ED5e5347a1eAAEFcE223660EF6eBEe336'
						},
						{
							icon: <AccountIcon />,
							info: 'Buy Pool LP',
							url: 'https://app.uniswap.org/#/add/0x9248c485b0b80f76da451f167a8db30f33c70907/ETH'
						}
					]}
					isActive={debaseEthPoolEnabled ? debaseEthPoolEnabled : false}
				>
					<List data={debaseEthLPListData} />
				</PoolCard>
				<PoolCard
					label="DEGOV/ETH LP Pool"
					routePath="/pools/degov-eth-lp-pool"
					linkData={[
						{
							icon: <CodeIcon />,
							info: 'Contract Link',
							url: 'https://etherscan.io/address/0x4789519821ae0f49d95203b1a2ed805141bf0dae'
						},
						{
							icon: <AccountIcon />,
							info: 'Buy Pool LP',
							url: 'https://app.uniswap.org/#/add/0x469e66e06fec34839e5eb1273ba85a119b8d702f/ETH'
						}
					]}
					isActive={pools.degovEthPool ? pools.degovEthPool.enabled : false}
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
