import { formatEther } from 'ethers/lib/utils';
import { calcTotalSupply } from './';

export default (index, rebaseArr) => {
    const formattedSupplyAdjustment = parseFloat(formatEther(rebaseArr[index].supplyAdjustment));
	const totalSupply = calcTotalSupply(index - 1, rebaseArr);
	return formattedSupplyAdjustment / totalSupply * 100;
}