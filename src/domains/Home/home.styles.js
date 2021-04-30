import styled from "styled-components";
import { homeBackgroundSVG, rectangleSVG, brandonGrotesqueLight } from '@assets';

export const StyledContainer = styled.div`
    background-image: url(${homeBackgroundSVG});
    width: 100%;
    height: auto;
    overflow: hidden;
    background-repeat: repeat;
`;
export const StyledRectangle = styled.img`
    position: absolute;
    right: 0;
    top: 221px;
    
    @media only screen and (max-width: 1440px) {
        width: 498px;
        height: 448px;
    }
    @media only screen and (max-width: 1336px) {
        width: 448px;
        height: 398px;
    }
    @media only screen and (max-width: 1280px) {
        width: 398px;
        height: 348px;
        top: 271px;
    }
    @media only screen and (max-width: 1024px) {
        width: 348px;
        height: 298px;
        top: 271px;
    }
`;
export const StyledContent = styled.div`
    position: relative;
    margin-left: 219px;
    margin-right: 229px;

    @media only screen and (max-width: 1440px) {
        margin-left: 135px;
        margin-right: 149px;
    }
    @media only screen and (max-width: 1336px) {
        margin-left: 135px;
        margin-right: 145px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 135px;
        margin-right: 139px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 80px;
        margin-right: 133px;
    }
`;
export const StyledText = styled.p`
    position: absolute;
    font-family: 'brandonlight';
    font-size: 72px;
    line-height: 96px;
    letter-spacing: -4.3px;
    margin-left: 21px;
    margin-top: 203px;
    z-index: 2;
    
    @media only screen and (max-width: 1440px) {
        margin-left: 6px;
        font-size: 52px;
        margin-top: 208px;
        letter-spacing: -3px;
    }
    @media only screen and (max-width: 1336px) {
        margin-left: 6px;
        font-size: 48px;
        margin-top: 210px;
        line-height: 79px;
        letter-spacing: -3.3px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 6px;
        font-size: 44px;
        margin-top: 261px;
        line-height: 64px;
        letter-spacing: -1.3px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 10px;
        font-size: 31px;
        margin-top: 236px;
        letter-spacing: -0.3px;
        line-height: 55px;
    }
`;

export const StyledReadMore = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;144
    width: 152px;
    height: 18px;
    margin-left: 28px;
    margin-top: 590px;
    text-align: left;
    color: #F26373;
    display: inline-block;
    
    @media only screen and (max-width: 1440px) {
        font-size: 20px;
        margin-top: 541px;
        margin-left: 23px;
    }
    @media only screen and (max-width: 1336px) {
        font-size: 20px;
        margin-top: 491px;
        margin-left: 22px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 16px;
        margin-top: 494px;
        margin-left: 10px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 14px;
        margin-top: 444px;
        margin-left: 21px;
    }
`;
