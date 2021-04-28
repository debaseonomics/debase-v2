import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';

import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, PoolStake, DisconnectedWalletCard } from '@dapp/components';

const DebaseBridgePool = () => {
	const { active } = useWeb3React();

	return (
		<Fragment>
			<Section label="Degov Eth Lp Pool" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<PoolStake
							poolAddress={CONTRACT_ADDRESS.degovEthPool}
							lpAddress={CONTRACT_ADDRESS.degovEthLp}
							stakeText="DEGOV/ETH LP"
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DebaseBridgePool;
