import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    title: "About",
    icon: <InfoIcon />,
    path: "/about",
  },
  {
    title: "Donation Projects",
    icon: <MonetizationOnRoundedIcon />,
    path: "/donate",
  },
  {
    title: "Beneficiaries",
    icon: <PeopleIcon />,
    path: "/Beneficiary",
  },
  {
    title: "Vendors",
    icon: <ShoppingCartIcon />,
    path: "/Vendor",
  },
  {
      title: "Logout",
      icon: <LogoutIcon />,
      path: "/logout"
  },
];
