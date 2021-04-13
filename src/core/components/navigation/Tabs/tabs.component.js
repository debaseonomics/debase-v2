import React, { useState, useEffect } from 'react';

/* import styles */
import { StyledTabs, StyledTabsNavigation, StyledTabButton, StyledTabContent } from './tabs.styles';

const Tabs = props => {

    const { defaultTab, children, onChange, style, ...other } = props;
    const [ activeTab, SetActiveTab ] = useState(defaultTab);

    const onChangeTab = eventKey => {
        if (onChange) {onChange(eventKey)}
        SetActiveTab(eventKey);
    };

    const renderTabsNavigation = () => {
        const localChildren = Array.isArray(children) ? children : [children];
        return (localChildren.map(tab => {
            const { eventKey, label } = tab.props;
            return (
                <StyledTabButton
                    key={eventKey}
                    onClick={() => onChangeTab(eventKey)}
                    active={activeTab === eventKey}
                    {...other}
                >
                    {label}
                </StyledTabButton>
            );
        }));
    };

    const renderActiveTabContent = () => {
        if (activeTab === '') {return null}
        const localChildren = Array.isArray(children) ? children : [children];
        return localChildren.find(tab => tab.props.eventKey === activeTab);
    };

    useEffect(() => {
        SetActiveTab(defaultTab);
    }, [defaultTab]);

    return (
        <StyledTabs 
            style={style}
            {...other}
        >   
            <StyledTabsNavigation {...other}>
                {renderTabsNavigation()}
            </StyledTabsNavigation>
            {renderActiveTabContent()}
        </StyledTabs>
    );
};

export const Tab = props => {

    const { children } = props;

    return (
        <StyledTabContent>
            {children}
        </StyledTabContent>
    );
};

export default Tabs;