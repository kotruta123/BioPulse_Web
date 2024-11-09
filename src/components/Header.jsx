import React from 'react';
import { HeaderContainer, Title, WarningMessage, ToggleSwitch } from '../styles';

const Header = () => (
    <HeaderContainer>
        <Title>Dashboard</Title>
        <WarningMessage>Water level is too low</WarningMessage>
        <ToggleSwitch />
    </HeaderContainer>
);

export default Header;
