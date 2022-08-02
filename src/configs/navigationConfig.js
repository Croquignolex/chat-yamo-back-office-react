import React from "react"
import * as Icon from "react-feather"
import {APP} from "../utility/urls/frontend";

const navigationConfig = [
  {
    id: "backoffice-users",
    type: "item",
    title: "Backoffice Users",
    navLink: APP.BACKOFFICE_USERS,
    icon: <Icon.Users size={20} />,
    permissions: ['admin']
  },
  {
    id: "users",
    type: "item",
    title: "Users",
    navLink: APP.USERS,
    icon: <Icon.UserCheck size={20} />
  },
  {
    type: "item",
    id: "feedbacks",
    title: "Feedbacks",
    navLink: APP.FEEDBACKS,
    icon: <Icon.MessageSquare size={20} />
  },
  {
    type: "item",
    id: "verification",
    title: "Verifications",
    navLink: APP.VERIFICATIONS,
    icon: <Icon.Image size={20} />
  },
  {
    type: "item",
    id: "old-verification",
    title: "Old verifications",
    navLink: APP.OLD_VERIFICATIONS,
    icon: <Icon.Archive size={20} />
  },
]

export default navigationConfig
