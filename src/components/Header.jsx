import React from 'react';
import { HeaderContainer, Title, WarningMessage, ToggleSwitch } from '../styles';

const Header = () => (
    <HeaderContainer>
        <Title>Dashboard</Title>
        <WarningMessage>System is in a good condition</WarningMessage>
        <ToggleSwitch />
    </HeaderContainer>
);

export default Header;
