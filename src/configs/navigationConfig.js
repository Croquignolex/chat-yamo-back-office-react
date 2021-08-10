import React from "react"
import * as Icon from "react-feather"
import {TICKETS} from "../utility/urls/frontend";

const navigationConfig = [
  /*{
    id: "dashboard",
    title: "Dashboard",
    type: "collapse",
    icon: <Icon.Home size={20} />,
    badge: "warning",
    badgeText: "2",
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/"
      },
      {
        id: "eCommerceDash",
        title: "eCommerce",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/ecommerce-dashboard"
      }
    ]
  },*/
  {
    id: "email",
    title: "Support",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    // permissions: ["admin", "editor"],
    navLink: TICKETS.LIST,
  },

]

export default navigationConfig
