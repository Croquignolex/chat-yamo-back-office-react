/**
 * This file expose backend's routes
 *
 */


export const AUTH = {
    LOGIN: '/auth/login',
    REGISTER: '/register',
    PROFILE: {
        INFORMATION: 'auth/profile'
    },
    RESET_PASSWORD: {
        MAIN: 'auth/reset-password',
        LINK: 'auth/send-reset-password-link',
    },
};

export const TICKETS = {
    GET_ALL: '/feedbacks/cases',

};
