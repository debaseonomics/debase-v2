import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI_POOL } from '@constants';

export default async () => {
	try {
		const provider = await new ethers.providers.EtherscanProvider(
			'homestead',
			'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE'
		);

		const poolContract = await new ethers.Contract(CONTRACT_ADDRESS.randomizedCounter, ABI_POOL, provider);
		const enabled = await poolContract.poolEnabled();

		console.log(enabled);

		return {
			enabled: enabled
		};
	} catch (err) {
		return { enabled: false };
	}
};
