import { DegovEthLpPool, DebaseDaiLpPool, DebaseEthLpPool, RandomizedCounterPool } from './views';

const POOLS_ROUTES = [
	{
		label: 'Degov-ETH LP Pool',
		path: '/dashboard/pools/active/degov-eth-lp-pool',
		component: <DegovEthLpPool />
	},
	{
		label: 'DEBASE-ETH LP Pool',
		path: '/dashboard/pools/active/debase-eth-lp-pool',
		component: <DebaseEthLpPool />
	},
	{
		label: 'DEBASE-DAI LP Pool',
		path: '/dashboard/pools/inactive/debase-dai-lp-pool',
		component: <DebaseDaiLpPool />
	},
	{
		label: 'Randomized Counter Pool',
		path: '/dashboard/pools/inactive/randomized-counter-pool',
		component: <RandomizedCounterPool />
	}
];

export default POOLS_ROUTES;
