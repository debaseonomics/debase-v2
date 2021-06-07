import { Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { CONTRACT_ADDRESS } from '@constants';
import { Section, Grid, DisconnectedWalletCard } from '@dapp/components';
import { ABI_DKR } from '@constants/index';
import Deposit from './deposit.component';

const DRK = () => {
	const { active } = useWeb3React();

	return (
		<Fragment>
			<Section label="DKR IOUs" info="**update**">
				{!active ? (
					<DisconnectedWalletCard />
				) : (
					<Grid>
						<Deposit poolAddress={CONTRACT_ADDRESS.degovEthPool} poolABI={ABI_DKR} />
					</Grid>
				)}
			</Section>
		</Fragment>
	);
};

export default DRK;
