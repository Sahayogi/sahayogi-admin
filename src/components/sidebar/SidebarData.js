import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import { BiCategory } from "react-icons/bi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Raise Fund",
    icon: <AttachMoneyIcon />,
    path: "/raisefund",
  },
  {
    title: "Operations",
    icon: <BiCategory />,
    path: "/operations",
  },
  {
    title: "Aid Agency",
    icon: <CorporateFareIcon />,
    path: "/aidAgency",
  },

  {
    title: "Donation Projects",
    icon: <MonetizationOnRoundedIcon />,
    path: "/projects",
  },
  {
    title: "Bank",
    icon: <AccountBalanceIcon />,
    path: "/bank",
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
    path: "/logout",
  },
];

export const SidebarDataForA = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Donation Projects",
    icon: <MonetizationOnRoundedIcon />,
    path: "/projects",
  },
  {
    title: "Bank",
    icon: <AccountBalanceIcon />,
    path: "/bank",
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
    title: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];
