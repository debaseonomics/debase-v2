import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, PoolStake, DisconnectedWalletCard } from '@dapp/components';
import { ABI_POOL } from '@constants/index';

const DebaseDaiLpPool = () => {
	const { active } = useWeb3React();

	return (
		<Fragment>
			<Section label="Debase Dai Lp Pool" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<PoolStake
							poolAddress={CONTRACT_ADDRESS.debaseDaiV3Pool}
							lpAddress={CONTRACT_ADDRESS.debaseDaiLp}
							stakeText="DEBASE-DAI LP"
							poolABI={ABI_POOL}
							apr="0 %"
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DebaseDaiLpPool;
