import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Aid Agency",
    icon: <CorporateFareIcon />,
    path: "/aidAgency",
  },
  {
    title: "Donation Projects",
    icon: <MonetizationOnRoundedIcon />,
    path: "/donate",
  },
  {
    title: "Beneficiaries",
    icon: <PeopleIcon />,
    path: "/beneficiary",
  },
  {
    title: "Vendors",
    icon: <ShoppingCartIcon />,
    path: "/vendor",
  },
  {
    title: "Transactions",
    icon: <CompareArrowsIcon />,
    path: "/transaction",
  },
  {
      title: "Logout",
      icon: <LogoutIcon />,
      path: "/logout"
  },
];
