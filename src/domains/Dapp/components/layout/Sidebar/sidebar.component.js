import { Button, Flexbox } from '@core/components';
import {
    GithubIcon,
    MediumIcon,
    TelegramIcon,
    TwitterIcon,
    DiscordIcon
} from '@assets'
import {
    StyledSidebar,
    StyledLogo,
    StyledLogoText,
    StyledSection,
    StyledSocialList,
    StyledSocialIcon
} from './sidebar.styles';

const Sidebar = ({
    children
}) => {

    const socialList = [
        {
            title: 'Medium',
            icon: <MediumIcon />,
            url: 'https://debaseonomics.medium.com/'
        },
        {
            title: 'Github',
            icon: <GithubIcon />,
            url: 'https://github.com/debaseonomics/'
        },
        {
            title: 'Twitter',
            icon: <TwitterIcon />,
            url: 'https://twitter.com/account/login_challenge?platform=web&enc_user_id=AAAAEIDcxr7tTgODV0wPPi007dpR-TtqG2EDSofLwqlTcPotNF4nlsHjLsuGjE1oQ-r6ERUt1PM&challenge_type=RetypePhoneNumber&challenge_id=TOQUy57Pxdyyiovz2YKRKRP8JCTsXw3xNjON2A&remember_me=true&redirect_after_login_verification=%2Fdebaseonomics'
        },
        {
            title: 'Discord',
            icon: <DiscordIcon />,
            url: 'https://discord.com/invite/kmt9ESWXKg'
        },
        {
            title: 'Telegram',
            icon: <TelegramIcon />,
            url: 'https://t.me/debaseonomics'
        }
    ];

    const renderSocialList = () => {
        return socialList.map(social => {
            const { title, icon, url } = social;
            return (
                <StyledSocialIcon
                    key={title}
                    title={title}
                    href={url}
                    target="_blank"
                >
                    {icon}
                </StyledSocialIcon>
            );
        });
    };

    return (
        <StyledSidebar>
            <StyledLogo>
                <StyledLogoText>
                    debase
                </StyledLogoText>
            </StyledLogo>
            <StyledSection style={{ flexGrow: 1 }}>
                {children}
            </StyledSection>
            <StyledSection>
                <Flexbox gap="15px">
                    <Button
                        as="a"
                        href="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0x9248c485b0b80f76da451f167a8db30f33c70907"
                        target="_blank"
                    >
                        trade debase
                    </Button>
                    <Button
                        as="a"
                        href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x469e66e06fec34839e5eb1273ba85a119b8d702f"
                        target="_blank"
                    >
                        trade degov
                    </Button>
                </Flexbox>
            </StyledSection>
            <StyledSection>
                <StyledSocialList>
                    {renderSocialList()}
                </StyledSocialList>
            </StyledSection>
        </StyledSidebar>
    );

};

export default Sidebar;