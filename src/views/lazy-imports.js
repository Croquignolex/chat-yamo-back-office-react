import {lazy} from "react";

export const Users = lazy(() => import("./../views/users"));
export const Password = lazy(() => import("./pages/Password"));
export const Welcome = lazy(() => import("./../views/Welcome"));
export const Feedbacks = lazy(() => import("./../views/feedbacks"));
export const Verifications = lazy(() => import("./../views/verifications"));
export const Login = lazy(() => import("./../views/pages/authentication/login/Login"))
