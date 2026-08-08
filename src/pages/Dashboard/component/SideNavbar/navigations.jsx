import {
  FiHome,
  FiSettings,
} from "react-icons/fi";

export const navigationMainMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    id: "Products",
    label: "Products",
    path: "/dashboard/products",
    icon: FiHome
  },
  {
    id: "Discount",
    label: "Discount",
    path: "/dashboard/discount",
    icon: FiHome
  },
  
];

export const other = [
  {
    id: "settings",
    label: "Settings",
    path: "/dashboard/settings",
    icon: FiSettings,
  },
];