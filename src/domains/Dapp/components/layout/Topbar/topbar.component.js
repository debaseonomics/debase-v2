import { useState, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useWeb3React } from '@web3-react/core';

import { DisplayLarge, Button, Tooltip, DisplaySmall } from '@core/components';
import { StatusIndicator } from '@dapp/components';
import { UIContext, WalletContext } from '@dapp/contexts';
import {
    StyledTopbar,
    StyledAccountContainer,
    StyledAccountAddress,
    StyledMobileTopbar,
    StyledMobileTopbarContainer,
    StyledMobileLeftContainer,
    StyledMobileMiddleContainer,
    StyledMobileRightContainer,
    StyledMobileSideItem,
    StyledDebaseLogo,
    StyledMobileTitleContainer
} from './topbar.styles';
import { debaseLogoSVG } from '@assets';

const Topbar = ({ handleSidebarMobileClick }) => {
    const { account, active } = useWeb3React();

    const { ui } = useContext(UIContext);
    const { wallet, walletMethods } = useContext(WalletContext);

    const renderConnectButton = () => {
        if (active) {
            return (
                <StyledAccountContainer>
                    <Tooltip
                        message="Metamask connected"
                        position="left-center"
                        followCursor={true}
                    >
                        <StatusIndicator status="active" />
                    </Tooltip>
                    <StyledAccountAddress>
                        {account}
                    </StyledAccountAddress>
                </StyledAccountContainer>
            );
        }
        return (
            <Button
                isLoading={wallet.isConnecting}
                disabled={wallet.isConnecting}
                onClick={() => walletMethods.connectAccount()}
            >
                connect wallet
            </Button>
        );
    };

    return (
        <>
            <StyledTopbar>
                <DisplayLarge>
                    {ui.activeRoute.label}
                </DisplayLarge>
                {renderConnectButton()}
            </StyledTopbar>
            <StyledMobileTopbar>
                <StyledMobileTopbarContainer>
                    <StyledMobileLeftContainer onClick={handleSidebarMobileClick}>
                        <StyledMobileSideItem />
                        <StyledMobileSideItem />
                        <StyledMobileSideItem />
                    </StyledMobileLeftContainer>
                    <StyledMobileMiddleContainer>
                        <StyledDebaseLogo
                            src={debaseLogoSVG}
                        />
                    </StyledMobileMiddleContainer>
                    <StyledMobileRightContainer>
                        {renderConnectButton()}
                    </StyledMobileRightContainer>
                </StyledMobileTopbarContainer>
                <StyledMobileTitleContainer>
                    <DisplaySmall>
                        {ui.activeRoute.label}
                    </DisplaySmall>
                </StyledMobileTitleContainer>
            </StyledMobileTopbar>
        </>
    );

};

export default Topbar;