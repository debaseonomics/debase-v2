import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { CONTRACT_ADDRESS, ABI_LP } from '@constants';

export default async () => {

    try {

        const provider = await new ethers.providers.EtherscanProvider('homestead', 'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE');

        const contract = await new ethers.Contract(CONTRACT_ADDRESS.debase, ABI_LP, provider);
        const totalSupply = await contract.totalSupply();
        const stabilizerBalance = await contract.balanceOf(CONTRACT_ADDRESS.debasePolicy);
        const pool1Balance = await contract.balanceOf(CONTRACT_ADDRESS.debaseDaiPool);
        const pool2Balance = await contract.balanceOf(CONTRACT_ADDRESS.debaseDaiLpPool);
        const debaseCircSupply = formatEther(totalSupply.sub(stabilizerBalance).sub(pool1Balance).sub(pool2Balance));

        return debaseCircSupply;

    } catch {
        
    }

};