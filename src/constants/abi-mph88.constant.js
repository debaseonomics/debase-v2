const ABI_MPH88 = [
	'function deposit(uint256) public returns(uint256)',
	'function lockPeriod() view returns (uint256)',
	'function treasury() view returns (address)',
	'function debaseRewardPercentage() view returns (uint256)',
	'function blockDuration() view returns (uint256)',
	'function deposits(uint256) view returns (address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)',
	'function depositIds(address,uint256) view returns(uint256)',
	'function lpDeposits(address) view returns (uint256)',
	'function depositLength() view returns (uint256)',
	'function daiFee() view returns (uint256)',
	'function mphFee() view returns (uint256)',
	'function periodFinish() view returns (uint256)',
	'function debaseRewardDistributed() view returns (uint256)',
	'function poolEnabled() view returns (bool)',
	'function allowEmergencyWithdraw() view returns (bool)',
	'function maxDepositLimit() view returns (uint256)',
	'function totalLpLimit() view returns (uint256)',
	'function totalLpLimitEnabled() view returns (bool)',
	'function maxDepositLimitEnabled() view returns (bool)',
	'function totalLpLocked() view returns (uint256)',
	'function earned(uint256) view returns (uint256)'
];

export default ABI_MPH88;