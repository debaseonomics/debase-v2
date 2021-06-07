const ABI_DKR = [
	'function debaseExchangeRate() external view returns(uint256)',
	'function degovExchangeRate() external view returns(uint256)',
	'function debaseDeposited(address) external view returns(uint256)',
	'function degovDeposited(address) external view returns(uint256)',
	'function iouBalance(address) external view returns(uint256)',
	'function depositEnabled() external view returns(bool)',
	'function depositDebase(uint256)',
	'function depositDegov(uint256)'
];

export default ABI_DKR;
