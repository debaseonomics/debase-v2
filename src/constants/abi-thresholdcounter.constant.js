const ABI_THRESHOLDCOUNTER = [
	'function rewardPercentage() public view returns (uint256)',
	'function countInSequence() public view returns (bool)',
	'function countThreshold() public view returns (uint256)',
	'function beforePeriodFinish() public view returns (bool)',
	'function duration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function userLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function revokeRewardPrecentage() public view returns (uint256)',
	'function revokeRewardDuration() public view returns (uint256)',
	'function revokeReward() public view returns (bool)',
	'function count() public view returns (uint256)',
	'function normalDistributionMean() public view returns (uint256)',
	'function normalDistributionDeviation() public view returns (uint256)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)',
	'function normalDistribution(uint256) external view returns(uint256)'
];

export default ABI_THRESHOLDCOUNTER;