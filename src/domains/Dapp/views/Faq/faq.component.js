import React, { Fragment } from 'react';

import { Accordion, Flexbox } from '@core/components';
import { Section } from '@dapp/components';
//import { StyledFaq } from './faq.styles';

const Faq = () => {

    return (
        <Fragment>
            <Section label="General">
                <Flexbox gap="30px">
                    <Accordion question="What is Debase? Is it a stable coin?">
                        Debase is not meant to be a pegged algo-stable as much as a reserve asset, whose marketcap (not price) reflects the value created by the protocol. It does rebase. However the rebasing is asymmetric; i.e., the % supply expansions when average price over a day is &gt; 1.05 is high while the % supply expansions when average price over a day is &lt; 0.95 is low.
                    </Accordion>
                    <Accordion question="How can I benefit as an investor?">
                        Your share as an investor in the total market cap, remains the same, so any increase in the market cap is reflected in your wallet. This means price is not as important as Marketcap which is a price x supply.
                    </Accordion>
                    <Accordion question="Is there a treasury and how does it benefit Debase?">
                        he treasury consists of ~350k worth of assets (USDT, ETH) (need to check on this part). It also has a stake in Dopex, an on-chain institutional facing options protocol. The treasury assets are in an multi-sig where signatories are <span style={{color: '#F96CC3'}}>@anon18382</span>, <span style={{color: '#F96CC3'}}>@jusTaPunkk</span>, and the auditor <span style={{color: '#F96CC3'}}>@VidarTheAuditor</span>. The treasury investment strategy is advised on by Lisa Tan (<span style={{color: '#F96CC3'}}>@lisajyt</span>), founding economist at Economics Design amongst others. Starting in the first week of April, Degov holders will manage these funds, allowing the community to shape the direction of debase. The treasury is used to create sources of protocol revenue, form partnerships with other protocols, hire marketing agencies, perform other marketing ventures to gain more exposure for Debase etc. It also is used to hire devs.
                    </Accordion>
                    <Accordion question="What is the connection with UwU?">
                        Some of the people who worked on Debase also work on UwU, a BSC reserve asset for stablecoins. Part of the sale for UwU was contributed to the Debase treasury. A cross-chain bridge between UwU and Debase is planned at sufficient maturity of both projects.
                    </Accordion>
                </Flexbox>
            </Section>
            <Section label="Rebase">
                <Flexbox gap="30px">
                    <Accordion question="What is a rebase?">
                        Rebasing refers to the change in supply of token in a non-inflationary way, as the change in total supply is reflected in every single wallet holding the token, and the magnitude and direction of supply change is a function of a price oracle.
                        <br/>
                        Imagine that the price of Debase is $2 and total supply is 100 Debase: a rebase function can change the supply to 200 Debase. This supply change is reflected in every wallet holding Debase (everyone’s Debase balance doubles). Such a supply change is called non-inflationary because the change in supply is equal for everyone, as opposed to real world systems, there the inflow of new money goes to certain interests first, who then enjoy the benefits of this arrangement. For rebase tokens this is not the case.
                    </Accordion>
                </Flexbox>
            </Section>
            <Section label="Pools">
                <Flexbox gap="30px">
                    <Accordion question="What are stabilizer pools?">
                        They are arbitrary smart contracts, that can be composed with the protocol, which is used to manage stable coins built on top of Debase. One example is dStable. Read more about it here:&nbsp;
                        <a href="https://debaseonomics.medium.com/stabilizer-pool-4-fractional-reserve-and-hedging-5436bd5c4805" style={{color: '#F96CC3', textDecorationLine: 'underline'}} target="_blank">https://debaseonomics.medium.com/stabilizer-pool-4-fractional-reserve-and-hedging-5436bd5c4805</a>
                        <br/>
                        Is this project Audited?
                        <br/>
                        Yes, the codebase has been audited twice. The first by <span style={{color: '#F96CC3'}}>@VidarTheAuditor</span>, who audits all new code added to the protocol, and it was also reviewed by BlueSwarm and NCyotee
                    </Accordion>
                </Flexbox>
            </Section>
        </Fragment>
    );
};

export default Faq;
