import {lazy} from "react";

export const Users = lazy(() => import("./users"));
export const TownEvents = lazy(() => import("./townEvents"));
export const Password = lazy(() => import("./pages/Password"));
export const Welcome = lazy(() => import("./../views/Welcome"));
export const Feedbacks = lazy(() => import("./../views/feedbacks"));
export const Notations = lazy(() => import("./../views/notations"));
export const BackofficeUsers = lazy(() => import("./backofficeUsers")); 
export const Verifications = lazy(() => import("./../views/verifications"));
export const OldVerifications = lazy(() => import("./../views/old_verifications"));
export const Login = lazy(() => import("./../views/pages/authentication/login/Login"))
