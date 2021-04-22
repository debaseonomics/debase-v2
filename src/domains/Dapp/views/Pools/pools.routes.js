import { DegovEthLpPool, DebaseDaiLpPool } from './views';

const POOLS_ROUTES = [
    {
        label: 'Degov/Eth LP Pool',
        path: '/pools/degov-eth-lp-pool',
        component: <DegovEthLpPool />,
    },
    {
        label: 'Debase/Dai LP Bridge Pool',
        path: '/pools/debase-dai-lp-bridge-pool',
        component: <DebaseDaiLpPool />,
    },
    {
        label: 'pool3',
        path: '/pools/pool3',
        component: <div>pool example 3</div>,
    }
];

export default POOLS_ROUTES;
