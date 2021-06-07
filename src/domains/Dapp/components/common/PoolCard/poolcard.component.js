import { Link } from 'react-router-dom';

import { HelpIcon } from '@assets';
import { Card, Button, IconButton, Tooltip, DisplaySmall, Flexbox } from '@core/components';
import { StatusIndicator } from '@dapp/components';

import { StyledPoolCard, StyledPoolCardInner, StyledHeader, StyledInfoIcon } from './poolcard.styles';

const PoolCard = ({ children, type, label = 'pool', info, linkData, routePath = '/', isActive = false, burn }) => {
	return (
		<StyledPoolCard>
			<StyledPoolCardInner>
				<StyledHeader>
					<Tooltip message={isActive ? 'Staking enabled' : 'Staking disabled'} followCursor={true}>
						<StatusIndicator status={isActive ? 'active' : 'inactive'} />
					</Tooltip>
					<DisplaySmall color="primary">{label}</DisplaySmall>

					{info &&
					info !== '' && (
						<StyledInfoIcon>
							<Tooltip message={info} followCursor={true}>
								<HelpIcon />
							</Tooltip>
						</StyledInfoIcon>
					)}
				</StyledHeader>
				<Card isActive={isActive} gutter={0}>
					{children}
				</Card>
				<Button as={Link} to={routePath}>
					{burn ? 'burn' : type !== 'inactive' ? 'Stake/Claim' : 'Withdraw/Claim'}
				</Button>
			</StyledPoolCardInner>

			{linkData &&
			linkData.length !== 0 && (
				<Flexbox gap="15px">
					{linkData.map((link, i) => {
						const { icon, info, url } = link;
						return (
							<Tooltip key={`poollink-${i}`} message={info} followCursor={true}>
								<IconButton as="a" href={url} target="_target">
									{icon}
								</IconButton>
							</Tooltip>
						);
					})}
				</Flexbox>
			)}
		</StyledPoolCard>
	);
};

export default PoolCard;
