import styled from 'styled-components';

export const StyledPoolStake = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const StyledInputs = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

export const StyledCardInner = styled.div`gap: 0;`;

export const StyledAprText = styled.div`gap: 0px;`;

export const StyledDepositContainer = styled.div`
    position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	border: 2px solid ${(props) => props.theme.colors[props.color + 'Light']};
	background-color: ${(props) => props.theme.colors.background};
	box-shadow: ${(props) => props.theme.shadows[props.color]};

	&:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: ${(props) => props.theme.colors[props.color]};
		border-radius: 5px;
		opacity: .05;
	}
`;

export const StyledDepositIds = styled.div`
    position: relative;
	display: flex;
	justify-content: space-between;
	height: 30px;
	padding: 15px 34px 10px 34px;
`;

export const StyledLabel = styled.div`
    font-size: 16px;
	font-weight: 500;
	letter-spacing: 1px;
`;
