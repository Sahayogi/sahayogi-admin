import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [


    {
        title: "Home",
        icon: <HomeIcon />,
        path: "/"
    },
    {
        title: "About",
        icon: <InfoIcon />,
        path: "/about"
    },
    {
        title: "Donate",
        icon: <MonetizationOnRoundedIcon />,
        path: "/donate"
    },
    {
        title: "Contact",
        icon: <ContactPhoneIcon />,
        path: "/contact"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        path: "/setting"
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        path: "/logout"
    },


];


