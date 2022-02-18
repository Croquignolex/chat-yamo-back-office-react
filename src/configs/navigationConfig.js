import React from "react"
import * as Icon from "react-feather"
import {APP} from "../utility/urls/frontend";

const navigationConfig = [
  {
    type: "item",
    id: "feedbacks",
    title: "Feedbacks",
    navLink: APP.FEEDBACKS,
    icon: <Icon.MessageSquare size={20} />,
  },
  {
    type: "item",
    id: "image_verification",
    navLink: APP.VERIFICATION,
    title: "Images Verifications",
    icon: <Icon.Image size={20} />,
  },
]

export default navigationConfig
