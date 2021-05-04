import React from 'react';

import { debaseLogoPNG, roadmapRectPNG, roadmapActivePNG, roadmapInactivePNG, roadmapTitle1PNG, roadmapTitle2PNG} from '@assets';
import {
	StyledRoadmap,
	StyledHeader,
	StyledLogo,
	StyledHeaderTitle1,
	StyledHeaderTitle2,
	StyledHeaderSplitter,
	StyledContent,
	StyledRectIcon,
	StyledRectNone,
	StyledCircleIcon,
	StyledSplitter,
	StyledItem,
	StyledTextContainer,
	StyledSpanPink,
	StyledSpanLink
} from './roadmap.styles';

const Roadmap = () => {
	return (
		<StyledRoadmap>
			<StyledHeader>
				<StyledLogo src={debaseLogoPNG} />
				<StyledHeaderTitle1 src={roadmapTitle1PNG} />
				<StyledHeaderTitle2 src={roadmapTitle2PNG} />
				{/* <StyledHeaderText1>
					debaseonomics
				</StyledHeaderText1>
				<StyledHeaderText2>roadmap q2/2021</StyledHeaderText2> */}
			</StyledHeader>

			<StyledHeaderSplitter />

			<StyledContent>
				<StyledSplitter />

				<StyledItem>
					<StyledRectNone />
					<StyledCircleIcon src={roadmapActivePNG} />
					<StyledTextContainer>
						<StyledSpanPink>Injection of liquidity</StyledSpanPink> in treasury, without selling/diluting
						<br />
						Debase holders
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectIcon src={roadmapRectPNG} />
					<StyledCircleIcon src={roadmapActivePNG} />
					<StyledTextContainer>
						DEBASE investment strategy, advised by <StyledSpanPink>Lisa Tan</StyledSpanPink>,
						<br />
						founder of <StyledSpanPink>Economics Design</StyledSpanPink>,
						<br />
						Part of the investment in our partner protocol <StyledSpanPink>88MPH</StyledSpanPink>
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectNone />
					<StyledCircleIcon src={roadmapActivePNG} />
					<StyledTextContainer>
						Investment in{' '}
						<StyledSpanLink href="https://dopexio.gitbook.io/dopex/" target="_blank">
							DOPEX
						</StyledSpanLink>, an on-chain options protocol
						<br />
						with several innovations in pricing options
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectNone />
					<StyledCircleIcon src={roadmapActivePNG} />
					<StyledTextContainer>
						Partnership with <StyledSpanPink>WXY</StyledSpanPink>, for outreach for Debase in China
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectNone />
					<StyledCircleIcon src={roadmapActivePNG} />
					<StyledTextContainer>
						Expand team; two devs and one designer, hired by the <StyledSpanPink>Debase DAO</StyledSpanPink>
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectNone />
					<StyledCircleIcon src={roadmapActivePNG} />
					<StyledTextContainer>
						<StyledSpanPink>Debase Website V2</StyledSpanPink> goes live! Incorporates feedback from
						community
						<br />
						to optimize for user experience
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectNone />
					<StyledCircleIcon src={roadmapInactivePNG} />
					<StyledTextContainer>
						Release new version of pool with{' '}
						<StyledSpanLink href="https://88mph.app/" target="_blank">
							88MPH
						</StyledSpanLink>, No deposit
						<br />
						limits and more gas efficient than previous pool with 88mph
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectIcon src={roadmapRectPNG} />
					<StyledCircleIcon src={roadmapInactivePNG} />
					<StyledTextContainer>
						Release of full economic model of <StyledSpanPink>SP4</StyledSpanPink> (the mechanism that
						creates
						<br />
						and backs <StyledSpanPink>dSTABLE</StyledSpanPink>) with backtested results
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectIcon src={roadmapRectPNG} />
					<StyledCircleIcon src={roadmapInactivePNG} />
					<StyledTextContainer>
						Integration with on-chain options protocol for <StyledSpanPink>SP4</StyledSpanPink>
					</StyledTextContainer>
				</StyledItem>

				<StyledItem>
					<StyledRectIcon src={roadmapRectPNG} />
					<StyledCircleIcon src={roadmapInactivePNG} />
					<StyledTextContainer>
						<StyledSpanPink>SP4 MVP</StyledSpanPink> development work commences and{' '}
						<StyledSpanPink>dSTABLE</StyledSpanPink> launches,
						<br />
						backed by fractional reserve with hedging
					</StyledTextContainer>
				</StyledItem>
			</StyledContent>
		</StyledRoadmap>
	);
};

export default Roadmap;
