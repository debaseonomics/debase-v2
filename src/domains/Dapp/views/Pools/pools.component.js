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
			value: 'DEGOV-ETH LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Token',
			value: 'DEBASE',
			tooltip: 'Reward token pool gives'
		},

		{
			label: 'Temp APR',
			value: pools.degovEthPool ? pools.degovEthPool.apr + ' %' : <Spinner size="xsmall" />,
			tooltip: "Pool's annual percentage rate"
		}
	];

	const debaseEthLPListData = [
		{
			label: 'Staked Token',
			value: 'DEBASE-ETH LP',
			tooltip: 'Stake token pool accepts'
		},
		{
			label: 'Reward Tokens',
			value: 'DEBASE/MPH/CRV',
			tooltip: 'Reward tokens pool gives'
		},

		// {
		// 	label: 'APR',
		// 	value: pools.debaseEthPool ? pools.debaseEthPool.apr + ' %' : <Spinner size="xsmall" />,
		// 	tooltip: "Pool's annual percentage rate"
		// }
	];

	const debaseDaiLPListData = [
		{
			label: 'Staked Token',
			value: 'DEBASE-DAI LP',
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
			value: 'DEBASE-DAI LP',
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
					routePath="/dashboard/pools/active/debase-eth-lp-pool"
					type="active"
					linkData={[
						{
							icon: <CodeIcon />,
							info: 'Contract Link',
							url: 'https://etherscan.io/address/0x819e5792d36902Ab6a9BCd201D3c3BEA32281679'
						},
						{
							icon: <AccountIcon />,
							info: 'Buy Pool LP',
							url: 'https://app.uniswap.org/#/add/v2/0x9248c485b0B80f76DA451f167A8db30F33C70907/ETH'
						}
					]}
					isActive={pools.debaseEthPool ? pools.debaseEthPool.enabled : false}
				>
					<List data={debaseEthLPListData} />
				</PoolCard>
				<PoolCard
					label="DEGOV-ETH LP Pool"
					routePath="/dashboard/pools/active/degov-eth-lp-pool"
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
							url: 'https://app.uniswap.org/#/add/v2/0x469e66e06fec34839e5eb1273ba85a119b8d702f/ETH'
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
					routePath="/dashboard/pools/inactive/debase-dai-lp-pool"
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
					routePath="/dashboard/pools/inactive/randomized-counter-pool"
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
