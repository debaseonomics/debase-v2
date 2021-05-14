import { Fragment, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { PoolAprContext } from '@dapp/contexts';
import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, DisconnectedWalletCard } from '@dapp/components';
import { PoolStakeTriple } from '@dapp/components/index';
import { ABI_POOL_TRIPLE } from '@constants/index';
import { Spinner } from '@core/components/index';

const DebaseEthLpPool = () => {
	const { active } = useWeb3React();
	const { pools } = useContext(PoolAprContext);

	return (
		<Fragment>
			<Section label="DEBASE ETH LP Pool" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<PoolStakeTriple
							poolAddress={CONTRACT_ADDRESS.debaseEthPool}
							lpAddress={CONTRACT_ADDRESS.debaseEthLp}
							stakeText="DEBASE-ETH LP"
							poolABI={ABI_POOL_TRIPLE}
							apy={pools.debaseEthPool ? pools.debaseEthPool.apy : <Spinner size="xsmall" />}
							apyVested={pools.debaseEthPool ? pools.debaseEthPool.apyVested : <Spinner size="xsmall" />}
							debaseAPY={pools.debaseEthPool ? pools.debaseEthPool.debaseAPY : <Spinner size="xsmall" />}
							mphAPY={pools.debaseEthPool ? pools.debaseEthPool.mphAPY : <Spinner size="xsmall" />}
							crvAPY={pools.debaseEthPool ? pools.debaseEthPool.crvAPY : <Spinner size="xsmall" />}

							apr={pools.debaseEthPool ? pools.debaseEthPool.apr : <Spinner size="xsmall" />}
							aprVested={pools.debaseEthPool ? pools.debaseEthPool.aprVested : <Spinner size="xsmall" />}
							debaseAPR={pools.debaseEthPool ? pools.debaseEthPool.debaseAPR : <Spinner size="xsmall" />}
							mphAPR={pools.debaseEthPool ? pools.debaseEthPool.mphAPR : <Spinner size="xsmall" />}
							crvAPR={pools.debaseEthPool ? pools.debaseEthPool.crvAPR : <Spinner size="xsmall" />}
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DebaseEthLpPool;
