import { Fragment, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { PoolAprContext } from '@dapp/contexts';
import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, PoolStake, DisconnectedWalletCard } from '@dapp/components';
import { ABI_POOL } from '@constants/index';
import { Spinner } from '@core/components/index';

const DRK = () => {
	const { active } = useWeb3React();
	const { pools } = useContext(PoolAprContext);

	return (
		<Fragment>
			<Section label="DRK" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<PoolStake
							poolAddress={CONTRACT_ADDRESS.degovEthPool}
							lpAddress={CONTRACT_ADDRESS.degovEthLp}
							stakeText="DEGOV-ETH LP"
							poolABI={ABI_POOL}
							apy={pools.degovEthPool ? pools.degovEthPool.apy : <Spinner size="xsmall" />}
							apr={pools.degovEthPool ? pools.degovEthPool.apr : <Spinner size="xsmall" />}
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DRK;
