import React, { Fragment } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import { TextSmall } from '@core/components';
import { Section, DisconnectedWalletCard, Grid, PoolCard } from '@dapp/components';
import POOLS_ROUTES from './pools.routes';

const Pools = () => {
	const { path } = useRouteMatch();
	const { active } = useWeb3React();

	const renderIncentivizerPools = () => {
		//if (!active) return <DisconnectedWalletCard />;
		return (
			<Grid>
				<PoolCard
					label="DEGOV/ETH LP POOL"
					info="tooltip info"
					routePath="/pools/degov-eth-lp-pool"
					isActive={true}
				>
					<TextSmall>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</TextSmall>
				</PoolCard>
				<PoolCard
					label="DEBASE/ETH LP POOL"
					info="tooltip info"
					routePath="/pools/debase-eth-lp-pool"
					isActive={true}
				>
					<TextSmall>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</TextSmall>
				</PoolCard>
			</Grid>
		);
	};

	const renderStabilizersPools = () => {
		// if (!active) return <DisconnectedWalletCard />
		return (
			<Grid>
				<PoolCard
					label="DEBASE/DAI LP POOL"
					info="tooltip info"
					routePath="/pools/debase-dai-lp-pool"
					isActive={true}
				>
					<TextSmall>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</TextSmall>
				</PoolCard>
			</Grid>
		);
	};

	return (
		<Switch>
			{!active ? (
				<DisconnectedWalletCard />
			) : (
				<Route exact path={path}>
					<Section label="Stabilizers" info="**update** info about stabilizers">
						{renderStabilizersPools()}
					</Section>
					<Section label="Incentivizers" info="**update** info about incentivizers">
						{renderIncentivizerPools()}
					</Section>
				</Route>
			)}

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
