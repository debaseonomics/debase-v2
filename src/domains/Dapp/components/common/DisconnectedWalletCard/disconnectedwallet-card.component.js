import { useContext } from 'react';

import { Button, Card, DisplaySmall, TextSmall } from '@core/components';
import { PowerOffIcon } from '@assets';
import { WalletContext } from '@dapp/contexts';
import {
    StyledDisconnectedWalletCard,
    StyledDisconnectedWalletDecoration,
    StyledContent,
    StyledContentHeading,
    StyledContentFooter
} from './disconnectedwallet-card.styles';

const DisconnectedWalletCard = () => {

    const { wallet, walletMethods } = useContext(WalletContext);

    return (
        <StyledDisconnectedWalletCard>
            <Card>
                <StyledContent>
                    <StyledContentHeading>
                        <DisplaySmall
                            color="primary"
                            style={{ 
                                'fontSize': '34px'
                            }}
                        >
                            not connected
                        </DisplaySmall>
                    </StyledContentHeading>
                    <TextSmall>
                        Please connect to a MetaMask account to view this page
                    </TextSmall>
                    <StyledContentFooter>
                        <Button
                            isLoading={wallet.isConnecting}
                            isDisabled={wallet.isConnecting}
                            onClick={() => walletMethods.connectAccount()}
                        >
                            connect wallet
                        </Button>
                    </StyledContentFooter>
                </StyledContent>
                <StyledDisconnectedWalletDecoration 
                    data-db-el="disconnectedwallet-card-decoration"
                >
                    <PowerOffIcon />
                </StyledDisconnectedWalletDecoration>
            </Card>
        </StyledDisconnectedWalletCard>
    );

};

export default DisconnectedWalletCard;