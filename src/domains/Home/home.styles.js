import styled from 'styled-components';
import {
	background360,
	background1024,
	background1280,
	background1366,
	background1440,
	background1920,
	rectangleSVG,
	brandonGrotesqueLight
} from '@assets';

export const StyledContainer = styled.div`
	width: 100%;
	background-image: url(${background1920});
	min-height: 1080px;

	@media only screen and (max-width: 1440px) {
		background-image: url(${background1440});
		min-height: 900px;
	}
	@media only screen and (max-width: 1366px) {
		background-image: url(${background1366});
		min-height: 768px;
	}
	@media only screen and (max-width: 1280px) {
		background-image: url(${background1280});
		min-height: 768px;
	}
	@media only screen and (max-width: 1024px) {
		background-image: url(${background1024});
		min-height: 768px;
	}
	@media only screen and (max-width: 360px) {
		background-image: url(${background360});
		min-height: 640px;
	}
`;
export const StyledContent = styled.div`
	position: relative;
	margin-left: 235px;
	margin-right: 235px;

	@media only screen and (max-width: 1440px) {
		margin-left: 178px;
		margin-right: 178px;
	}
	@media only screen and (max-width: 1366px) {
		margin-left: 161px;
		margin-right: 161px;
	}
	@media only screen and (max-width: 1280px) {
		margin-left: 137px;
		margin-right: 150px;
	}
	@media only screen and (max-width: 1024px) {
		margin-left: 115px;
		margin-right: 115px;
	}
	@media only screen and (max-width: 360px) {
		margin-left: 21px;
		margin-right: 21px;
	}
`;
export const StyledText = styled.div`
	font-family: 'brandonlight';
	font-size: 72px;
	line-height: 98px;
	letter-spacing: -4.2px;
	margin-top: 303px;
	z-index: 2;

	@media only screen and (max-width: 1440px) {
		font-size: 54px;
		margin-top: 217px;
		line-height: 75px;
		letter-spacing: -3px;
	}
	@media only screen and (max-width: 1366px) {
		font-size: 50px;
		margin-top: 205px;
		line-height: 68px;
		letter-spacing: -2.2px;
	}
	@media only screen and (max-width: 1280px) {
		font-size: 47px;
		margin-top: 189px;
		line-height: 67px;
		letter-spacing: -2px;
	}
	@media only screen and (max-width: 1024px) {
		font-size: 39px;
		margin-top: 199px;
		letter-spacing: -2.2px;
		line-height: 54px;
	}
	@media only screen and (max-width: 360px) {
		font-size: 20px;
		margin-top: 111px;
		letter-spacing: 0px;
		line-height: 31.7px;
		margin-left: 21px;
	}
`;

export const StyledReadMore = styled.div`
	margin-left: 5px;
	margin-top: 90px;
	text-align: left;

	@media only screen and (max-width: 1440px) {
		margin-top: 68px;
	}
	@media only screen and (max-width: 1366px) {
		margin-top: 65px;
	}
	@media only screen and (max-width: 1280px) {
		margin-top: 62px;
	}
	@media only screen and (max-width: 1024px) {
		margin-top: 50px;
	}
	@media only screen and (max-width: 360px) {
		text-align: center;
		margin-top: 25px;
	}
`;

export const StyledReadMoreText = styled.a`
	font-family: 'brandonlight';
	font-size: 24px;
	color: #f26373;

	@media only screen and (max-width: 1440px) {
		font-size: 17px;
	}
	@media only screen and (max-width: 1366px) {
		font-size: 15px;
	}
	@media only screen and (max-width: 1280px) {
		font-size: 14px;
	}
	@media only screen and (max-width: 1024px) {
		font-size: 10px;
	}
	@media only screen and (max-width: 360px) {
		font-size: 10px;
	}
`;

export const StyledIconsContainer = styled.div`
	position: absolute;
	bottom: 35px;
	display: flex;
	width: 100%;
	justify-content: center;
`

export const StyledIconLink = styled.a`
	margin-left: 23px;
	margin-right: 23px;
`;

export const StyledIconImage = styled.img`
	width: 21px;
	height: 21px;
`;