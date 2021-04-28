import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';

import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, DisconnectedWalletCard } from '@dapp/components';
import { PoolStakeTriple } from '@dapp/components/index';
import ABI_INCENTIVIZER_TRIPLE from '@constants/abi-incentivizer-triple.constant';

const DebaseEthLpPool = () => {
	const { active } = useWeb3React();

	return (
		<Fragment>
			<Section label="Degov Eth Lp Pool" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<PoolStakeTriple
							poolAddress={CONTRACT_ADDRESS.debaseEthPool}
							lpAddress={CONTRACT_ADDRESS.debaseEthLp}
							stakeText="DEBASE/ETH LP"
							poolABI={ABI_INCENTIVIZER_TRIPLE}
						/>
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DebaseEthLpPool;
