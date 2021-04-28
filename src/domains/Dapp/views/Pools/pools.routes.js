import { DegovEthLpPool, DebaseDaiLpPool, DebaseEthLpPool } from './views';

const POOLS_ROUTES = [
	{
		label: 'Degov/Eth LP Pool',
		path: '/pools/degov-eth-lp-pool',
		component: <DegovEthLpPool />
	},
	{
		label: 'Debase/Dai LP Pool',
		path: '/pools/debase-dai-lp-pool',
		component: <DebaseDaiLpPool />
	}
	// {
	// 	label: 'Debase/Eth LP Pool',
	// 	path: '/pools/debase-eth-lp-pool',
	// 	component: <DebaseEthLpPool />
	// }
];

export default POOLS_ROUTES;
