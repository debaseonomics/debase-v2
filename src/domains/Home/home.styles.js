import styled from "styled-components";
import { homeBackgroundSVG, brandonGrotesqueLight } from '@assets';

export const StyledContainer = styled.div`
    background-image: url(${homeBackgroundSVG});
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-size: 100% 100%;
`;
export const StyledContent = styled.div`
    margin-left: 219px;
    margin-right: 233px;
    
    @media only screen and (max-width: 1440px) {
        margin-left: 165px;
        margin-right: 174px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 145px;
        margin-right: 155px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 115px;
        margin-right: 124px;
    }
`;
export const StyledText = styled.p`
    font-family: 'brandonlight';
    font-size: 72px;
    line-height: 85px;
    letter-spacing: -4.3px;
    margin-left: 15px;
    margin-top: 298px;
    
    @media only screen and (max-width: 1440px) {
        margin-left: 12px;
        font-size: 56px;
        margin-top: 263px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 12px;
        font-size: 51px;
        margin-top: 267px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 10px;
        font-size: 41px;
        margin-top: 311px;
        letter-spacing: -3.3px;
    }
`;

export const StyledReadMore = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;144
    width: 152px;
    height: 18px;
    margin-left: 25px;
    margin-top: 8px;
    text-align: left;
    color: #F26373;
    display: inline-block;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
        margin-top: 69px;
        margin-left: 17px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 15px;
        margin-top: 73px;
        margin-left: 20px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 12px;
        margin-top: 40px;
        margin-left: 16px;
    }
`;
