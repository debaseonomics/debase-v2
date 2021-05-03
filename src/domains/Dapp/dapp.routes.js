import { DashboardIcon, TuneIcon, AccountTreeIcon, InsightsIcon, QuestionAnswerIcon } from '@assets';
import { Dashboard, Pools, Rebase, Roadmap, Faq } from '@dapp/views';

const DAPP_ROUTES = [
	{
		label: 'dashboard',
		path: '/dashboard',
		icon: <DashboardIcon />,
		component: <Dashboard />
	},
	{
		label: 'pools',
		path: '/pools',
		icon: <AccountTreeIcon />,
		component: <Pools />
	},
	{
		label: 'rebase',
		path: '/rebase',
		icon: <TuneIcon />,
		component: <Rebase />
	},
	{
		label: 'roadmap',
		path: '/roadmap',
		icon: <InsightsIcon />,
		component: <Roadmap />
	},
	{
		label: 'faq',
		path: '/faq',
		icon: <QuestionAnswerIcon />,
		component: <Faq />
	}
];

export default DAPP_ROUTES;
