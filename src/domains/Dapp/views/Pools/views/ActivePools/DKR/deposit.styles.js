import styled from 'styled-components';

export const StyledPoolStake = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const StyledConversionText = styled.div`
	color: ${(props) => props.theme.colors.primaryLight};
	text-shadow: ${(props) => props.theme.shadows.primaryText};
	padding-left: 22px;
`;

export const StyledCardInner = styled.div`gap: 0;`;

export const StyledAprText = styled.div`gap: 0px;`;
