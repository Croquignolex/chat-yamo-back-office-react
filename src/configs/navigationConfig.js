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
    icon: <Icon.UserCheck size={20} />,
    permissions: ['admin', 'writer', 'reader']
  },
  {
    id: "tonw-events",
    type: "item",
    title: "Town-events",
    navLink: APP.TOWN_EVENTS,
    icon: <Icon.Calendar size={20} />,
    permissions: ['admin', 'writer', 'reader']
  },
  {
    type: "item",
    id: "feedbacks",
    title: "Feedbacks",
    navLink: APP.FEEDBACKS,
    icon: <Icon.MessageSquare size={20} />,
    permissions: ['admin', 'writer', 'reader']
  },
  {
    type: "item",
    id: "verification",
    title: "Verifications",
    navLink: APP.VERIFICATIONS,
    icon: <Icon.Image size={20} />,
    permissions: ['admin', 'imageverifier']
  },
  {
    type: "item",
    id: "notations",
    title: "Notations",
    navLink: APP.NOTATIONS,
    icon: <Icon.Star size={20} />,
    permissions: ['admin', 'imagechecker']
  }, 
  {
    type: "item",
    id: "old-notations",
    title: "Old notations",
    navLink: APP.OLD_VERIFICATIONS,
    icon: <Icon.Archive size={20} />,
    permissions: ['admin', 'imagechecker']
  },
]

export default navigationConfig
