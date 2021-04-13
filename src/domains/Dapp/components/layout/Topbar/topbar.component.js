import { useContext } from 'react';
import { useWeb3React } from '@web3-react/core';

import { DisplayLarge, Button, Tooltip } from '@core/components';
import { StatusIndicator } from '@dapp/components';
import { UIContext, WalletContext } from '@dapp/contexts';
import {
    StyledTopbar,
    StyledAccountContainer,
    StyledAccountAddress
} from './topbar.styles';

const Topbar = () => {

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
        <StyledTopbar>
            <DisplayLarge>
                {ui.activeRoute.label}
            </DisplayLarge>
            {renderConnectButton()}
        </StyledTopbar>
    );

};

export default Topbar;