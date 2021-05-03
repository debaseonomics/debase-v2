import { Fragment, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { PoolAprContext } from '@dapp/contexts';
import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, DisconnectedWalletCard } from '@dapp/components';
import { PoolStakeTriple } from '@dapp/components/index';
import { ABI_POOL_TRIPLE } from '@constants/index';

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
							apr={pools.debaseEthPool ? pools.debaseEthPool.apr + ' %' : '0 %'}
							debaseAPR={pools.debaseEthPool ? pools.debaseEthPool.debaseAPR + ' %' : '0 %'}
							mphAPR={pools.debaseEthPool ? pools.debaseEthPool.mphAPR + ' %' : '0 %'}
							crvAPR={pools.debaseEthPool ? pools.debaseEthPool.crvAPR + ' %' : '0 %'}
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DebaseEthLpPool;
