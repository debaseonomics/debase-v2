import styled from "styled-components";
import { homeBackgroundSVG, brandonGrotesqueLight } from '@assets';

export const StyledContainer = styled.div`
    background-image: url(${homeBackgroundSVG});
    min-width: 100%;
    min-height: 100%;
    overflow-y: auto;
`;
export const StyledContent = styled.div`
    max-width: 1470px;
    margin-left: 217px;
    margin-right: 233px;
    width: 100%;
`;
export const StyledText = styled.p`
    font-family: 'brandonlight';
    font-size: 72px;
    width: 939px;
    height: 266px;
    line-height: 96px;
    letter-spacing: -4.3px;
    margin-left: 18px;
    margin-top: 306px;
`;

export const StyledReadMore = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;
    width: 152px;
    height: 18px;
    margin-left: 25px;
    margin-top: 43px;
    text-align: left;
    color: #F26373;
    display: inline-block;
`;
