import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { CONTRACT_ADDRESS, ABI_LP } from '@constants';

export default async () => {

    try {

        const provider = await new ethers.providers.EtherscanProvider('homestead', 'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE');

        const contractDegov = await new ethers.Contract(CONTRACT_ADDRESS.degov, ABI_LP, provider);
        const totalSupplyDegov = await contractDegov.totalSupply();
        const pool2BalanceDegov = await contractDegov.balanceOf(CONTRACT_ADDRESS.degovDaiLpPool);
        const degovCircSupply = formatEther(totalSupplyDegov.sub(pool2BalanceDegov));

        return degovCircSupply;

    } catch {
        
    }
};