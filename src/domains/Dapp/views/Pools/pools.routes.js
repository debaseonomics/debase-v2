import { DegovEthLpPool, DebaseDaiLpPool, DebaseEthLpPool, RandomizedCounterPool } from './views';

const POOLS_ROUTES = [
	{
		label: 'Degov/Eth LP Pool',
		path: '/pools/active/degov-eth-lp-pool',
		component: <DegovEthLpPool />
	},
	{
		label: 'Debase/Eth LP Pool',
		path: '/pools/active/debase-eth-lp-pool',
		component: <DebaseEthLpPool />
	},
	{
		label: 'Debase/Dai LP Pool',
		path: '/pools/inactive/debase-dai-lp-pool',
		component: <DebaseDaiLpPool />
	},
	{
		label: 'Randomized Counter Pool',
		path: '/pools/inactive/randomized-counter-pool',
		component: <RandomizedCounterPool />
	}
];

export default POOLS_ROUTES;
