const ABI_INCENTIVIZER = [
	'function rewardPercentage() public view returns (uint256)',
	'function blockDuration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function userLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function revokeReward() public view returns (bool)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)'
];

export default ABI_INCENTIVIZER;