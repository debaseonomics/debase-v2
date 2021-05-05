const ABI_POOL_TRIPLE = [
	'function rewardPercentage() public view returns (uint256)',
	'function blockDuration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function userLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function revokeReward() public view returns (bool)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)',
	'function earned(address account) public view returns (uint256,uint256,uint256)',
	'function mph88Reward() public view returns(uint256)',
	'function crvReward() public view returns(uint256)',
	'function rewardsDebase(address) public view returns(uint256)',
	'function stake(uint256) public',
	'function withdraw(uint256) public',
	'function exit() public',
	'function getReward() public'
];

export default ABI_POOL_TRIPLE;
