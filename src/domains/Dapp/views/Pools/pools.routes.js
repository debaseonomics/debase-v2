import { DegovEthLpPool, DebaseDaiLpPool } from './views';

const POOLS_ROUTES = [
    {
        label: 'Degov/Eth LP Pool',
        path: '/pools/degov-eth-lp-pool',
        component: <DegovEthLpPool />,
    },
    {
        label: 'Debase/Eth LP Bridge Pool',
        path: '/pools/debase-dai-lp-bridge-pool',
        component: <DebaseDaiLpPool />,
    },
];

export default POOLS_ROUTES;
