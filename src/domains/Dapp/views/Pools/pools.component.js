import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Section, Grid, PoolCard } from '@dapp/components';
import POOLS_ROUTES from './pools.routes';
import { List, Spinner } from '@core/components/index';
import { AccountIcon, CodeIcon } from '@assets/index';
import { PoolAprContext } from '@dapp/contexts';

const Pools = () => {
	const { path } = useRouteMatch();
	const { pools } = useContext(PoolAprContext);

	const degovEthLPListData = [
		{
			label: 'Staked Token',
			value: 'Degov-Eth LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Token',
			value: 'Debase',
			tooltip: 'Reward token pool gives'
		},

		{
			label: 'APR',
			value: pools.degovEthPool ? pools.degovEthPool.apr + ' %' : <Spinner size="xsmall" />,
			tooltip: "Pool's annual percentage rate"
		}
	];

	const debaseEthLPListData = [
		{
			label: 'Staked Token',
			value: 'Debase-Eth LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Tokens',
			value: 'Debase-88Mph/Crv',
			tooltip: 'Reward tokens pool gives'
		},

		{
			label: 'APR',
			value: pools.debaseEthPool ? pools.debaseEthPool.apr + ' %' : <Spinner size="xsmall" />,
			tooltip: "Pool's annual percentage rate"
		}
	];

	const debaseDaiLPListData = [
		{
			label: 'Staked Token',
			value: 'Debase-Dai LP',
			tooltip: 'Stake token pool accepts'
		},

		{
			label: 'APR',
			value: '0 %',
			tooltip: "Pool's annual percentage rate"
		}
	];

	const randomizedCounterListData = [
		{
			label: 'Staked Token',
			value: 'Debase-Dai LP',
			tooltip: 'Stake token pool accepts'
		},

		{
			label: 'APR',
			value: '0 %',
			tooltip: "Pool's annual percentage rate"
		}
	];

	const renderActivePools = () => {
		return (
			<Grid>
				<PoolCard
					label="DEBASE-ETH LP Pool"
					routePath="/pools/active/debase-eth-lp-pool"
					type="active"
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
					isActive={pools.debaseEthPool ? pools.debaseEthPool.enabled : false}
				>
					<List data={debaseEthLPListData} />
				</PoolCard>
				<PoolCard
					label="DEGOV-ETH LP Pool"
					routePath="/pools/active/degov-eth-lp-pool"
					type="active"
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

	const renderInactivePools = () => {
		return (
			<Grid>
				<PoolCard
					label="DEBASE-DAI LP Pool"
					routePath="/pools/inactive/debase-dai-lp-pool"
					type="inactive"
					linkData={[
						{
							icon: <CodeIcon />,
							info: 'Contract Link',
							url: 'https://etherscan.io/address/0x29e92C31C980098d5724fe82EbC5A824e32d9C9B'
						}
					]}
					isActive={pools.debaseDaiPool ? pools.debaseDaiPool.enabled : false}
				>
					<List data={debaseDaiLPListData} />
				</PoolCard>
				<PoolCard
					label="Randomized Counter Pool"
					routePath="/pools/inactive/randomized-counter-pool"
					type="inactive"
					linkData={[
						{
							icon: <CodeIcon />,
							info: 'Contract Link',
							url: 'https://etherscan.io/address/0x800479a76dc74c3a9FAAE25320A0EE4E8740996b'
						}
					]}
					isActive={pools.randomizedCounterPool ? pools.randomizedCounterPool.enabled : false}
				>
					<List data={randomizedCounterListData} />
				</PoolCard>
			</Grid>
		);
	};

	return (
		<Switch>
			<Route exact path={path}>
				<Route exact path={path}>
					<Section label="Active Pools" info="Pools actively rewarded by rewards fund">
						{renderActivePools()}
					</Section>
					<Section label="Inactive Pools" info="Pools no long rewarded by rewards fund">
						{renderInactivePools()}
					</Section>
				</Route>
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
