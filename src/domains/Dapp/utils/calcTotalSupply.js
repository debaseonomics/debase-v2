import { formatEther } from 'ethers/lib/utils';

export default (index, rebaseArr) => {
    let baseValue = 1000000;
	for (let i = 0; i <= index; i++) {
		const formattedSupplyAdjustment = parseFloat(formatEther(rebaseArr[i].supplyAdjustment));
		baseValue += formattedSupplyAdjustment;
	}
	return baseValue;
}