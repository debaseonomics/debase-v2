import styled from 'styled-components';

export const StyledSidebar = styled.div`
    position: fixed;
    width: 213px;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
	flex-direction: column;
    align-items: center;
    background: #1E101E;
    z-index: 101;
`;

export const StyledMenu = styled.div`
    font-family: 'bladerunner', sans-serif;
	font-size: 26px;
	font-weight: 500;
	line-height: 100%;
	text-transform: lowercase;
	color: ${(props) => props.theme.colors.text};
	text-shadow: ${(props) => props.theme.shadows.secundaryText};
	user-select: none;
    display: flex;
    margin-top: 10px;
`;

export const StyledSocialList = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	width: 173px;
	margin: 20px;
`;

export const StyledSocialIcon = styled.a`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: ${(props) => props.theme.colors.primaryLight};
	fill: ${(props) => props.theme.colors.primaryLight};
	filter: drop-shadow(${(props) => props.theme.shadows.primaryText});

	svg {
		width: 20px;
		height: 20px;
	}
`;
