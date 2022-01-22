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
        link: "/home"
    },
    {
        title: "About",
        icon: <InfoIcon />,
        link: "/about"
    },
    {
        title: "Donate",
        icon: <MonetizationOnRoundedIcon />,
        link: "/donate"
    },
    {
        title: "Contact",
        icon: <ContactPhoneIcon />,
        link: "/contact"
    },
    {
        title: ""

    },
    {
        title: "Setting",
        icon: <SettingsIcon />,
        link: "/setting"
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/logout"
    },


];


