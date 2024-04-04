import {lazy} from "react";

export const Users = lazy(() => import("./users"));
export const TownEvents = lazy(() => import("./townEvents"));
export const Password = lazy(() => import("./pages/Password"));
export const Welcome = lazy(() => import("./../views/Welcome"));
export const Exports = lazy(() => import("./../views/exports"));
export const Feedbacks = lazy(() => import("./../views/feedbacks"));
export const UserImages = lazy(() => import("./../views/usersImages"));
export const BackofficeUsers = lazy(() => import("./backofficeUsers"));
export const ExportsBlackList = lazy(() => import("./../views/exportsBlacklist"));
export const ProfileNotations = lazy(() => import("./../views/profileNotations"));
export const profileReverifications = lazy(() => import("./../views/profileReverifications"));
export const ManualActivation = lazy(() => import("./../views/manualActivation"));
export const Login = lazy(() => import("./../views/pages/authentication/login/Login"))
