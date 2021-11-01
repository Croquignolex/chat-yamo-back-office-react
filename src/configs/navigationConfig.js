import React from "react"
import * as Icon from "react-feather"
import {TICKETS} from "../utility/urls/frontend";

const navigationConfig = [
  {
    type: "item",
    id: "feedbacks",
    title: "Feedbacks",
    navLink: TICKETS.LIST,
    icon: <Icon.MessageSquare size={20} />,
  }
]

export default navigationConfig
