import React from "react";
import * as Icon from "react-feather";
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
    icon: <Icon.User size={20} />,
    permissions: ['admin', 'writer', 'reader', 'imageverifier', 'imagechecker']
  },
  {
    id: "users-images",
    type: "item",
    title: "Users images",
    navLink: APP.USERS_IMAGES,
    icon: <Icon.Image size={20} />,
    permissions: ['admin', 'writer', 'reader', 'imageverifier', 'imagechecker']
  },
  {
    id: "town-events",
    type: "item",
    title: "Town-events",
    navLink: APP.TOWN_EVENTS,
    icon: <Icon.Calendar size={20} />,
    permissions: ['admin', 'writer', 'reader', 'imageverifier', 'imagechecker']
  },
  {
    id: "exports",
    type: "item",
    title: "Exports",
    navLink: APP.EXPORTS,
    icon: <Icon.Share size={20} />,
    permissions: ['admin', 'userlistviewer']
  },
  {
    type: "item",
    id: "feedbacks",
    title: "Feedbacks",
    navLink: APP.FEEDBACKS,
    icon: <Icon.MessageSquare size={20} />,
    permissions: ['admin', 'writer', 'reader', 'imageverifier', 'imagechecker']
  },
  {
    type: "item",
    id: "profile-notations",
    title: "Profile notations",
    navLink: APP.PROFILE_NOTATIONS,
    icon: <Icon.Star size={20} />,
    permissions: ['admin', 'imagechecker', 'imageverifier']
  },
]

export default navigationConfig
