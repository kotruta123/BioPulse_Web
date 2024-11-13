import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarContainer, IconButton, AvatarContainer, ActiveIconButton } from '../styles';
import { Home, Power, HelpOutline, Water, Nature, CameraAlt, Notifications, Backup, Description } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

const Sidebar = () => (
    <SidebarContainer>
        <ActiveIconButton><Link to="/dashboard"><Home /></Link></ActiveIconButton>
        <IconButton><Link to="/plant-management"><Nature /></Link></IconButton>
        <IconButton><Link to="/sensor-management"><Water /></Link></IconButton>
        <IconButton><Link to="/camera-settings"><CameraAlt /></Link></IconButton>
        <IconButton><Link to="/notifications"><Notifications /></Link></IconButton>
        <IconButton><Link to="/backup"><Backup /></Link></IconButton>
        <IconButton><Link to="/data-export"><Description /></Link></IconButton>
        <AvatarContainer>
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
        </AvatarContainer>
    </SidebarContainer>
);

export default Sidebar;
