import React, { Fragment } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import { TextSmall } from '@core/components';
import { Section, DisconnectedWalletCard, Grid, PoolCard } from '@dapp/components';
import { StyledPools } from './pools.styles';
import POOLS_ROUTES from './pools.routes';

const Pools = ()  => {

    const { path } = useRouteMatch();
    const { active } = useWeb3React();

    const renderIncentivizerPools = () => {
        if (!active) return <DisconnectedWalletCard />
        return (
            <Grid>
                <PoolCard
                    label="Degov/ETH LP POOL"
                    info="tooltip info"
                    routePath="/pools/degov-eth-lp-pool"
                    isActive={true}
                >
                    <TextSmall>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </TextSmall>
                </PoolCard>
            </Grid>
        );
    };

    const renderStabilizersPools = () => {
        if (!active) return <DisconnectedWalletCard />
        return (
            <Grid>
                <PoolCard
                    label="DEBASE/DAI LP POOL"
                    info="tooltip info"
                    routePath="/pools/debase-dai-lp-bridge-pool"
                    isActive={true}
                >
                    <TextSmall>
                        Pool that bridges DEBASE/DAI LP deposits you have made on the DEBASE/DAI LP bridge on Ethereum. To
                        allow you to mine UwU in return.
                        <br />
                        <br />
                        This pool will give out a total of 15000 UwU over its life time. With initially giving out 7500 UwU
                        over a period of 3.5 days. After which the given will half to 3750 UwU given again over a period of
                        another 3.5 days.
                        <br />
                        <br />
                        This reward halving process will until the 15000 UwU are distributed.
                    </TextSmall>
                </PoolCard>
            </Grid>
        );
    };

    return (
        <Switch>
            <Route exact path={path}>
                <Section
                        label="Stabilizers"
                        info="**update** info about stabilizers"
                >
                    {renderStabilizersPools()}
                </Section>
                <Section
                    label="Incentivizers"
                    info="**update** info about incentivizers"
                >
                    {renderIncentivizerPools()}
                </Section>
            </Route>

            {POOLS_ROUTES.map((route, i) => {
                const { label, path, component } = route;
                return (
                    <Route
                        key={label}
                        path={path}
                    >
                        {component}
                    </Route>
                );
            })}

        </Switch>
    );

};

export default Pools;
