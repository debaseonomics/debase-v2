const ABI_DEBASEPOLICY = [
	'function priceTargetRate() public view returns(uint256)',
	'function upperDeviationThreshold() public view returns(uint256)',
	'function lowerDeviationThreshold() public view returns(uint256)',
	'function useDefaultRebaseLag() public view returns(bool)',
	'function defaultPositiveRebaseLag() public view returns(uint256)',
	'function defaultNegativeRebaseLag() public view returns(uint256)',
	'function minRebaseTimeIntervalSec() public view returns(uint256)',
	'function rebaseWindowOffsetSec() public view returns(uint256)',
	'function rebaseWindowLengthSec() public view returns(uint256)',
	'function upperLagBreakpoints(uint256) public view returns(uint256)',
	'function lowerLagBreakpoints(uint256) public view returns(uint256)',
	'function lastRebaseTimestampSec() public view returns(uint256)',
	'function stabilizerPools(uint256) public view returns(bool,address)'
];

export default ABI_DEBASEPOLICY;