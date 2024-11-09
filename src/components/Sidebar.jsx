import React from 'react';
import { SidebarContainer, IconButton, AvatarContainer, ActiveIconButton } from '../styles';
import { Home, Power, HelpOutline, Water } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

const Sidebar = () => (
    <SidebarContainer>
        <ActiveIconButton><Home /></ActiveIconButton>
        <IconButton><Power /></IconButton>
        <IconButton><HelpOutline /></IconButton>
        <IconButton><Water /></IconButton>
        <AvatarContainer>
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
        </AvatarContainer>
    </SidebarContainer>
);

export default Sidebar;
