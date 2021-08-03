// import { encrypt, decrypt } from './crypto';

export const saveAuthToken = (
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
) => {
    /* Tried to perform encryption */
    // localStorage.setItem('accessToken', encrypt(accessToken).toString());

    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());
};

export const removeAuthToken = () => {
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const getAuthToken = () => {
    const tokenType = localStorage.getItem('tokenType') || null;
    const accessToken = localStorage.getItem('accessToken') || null;
    const refreshToken = localStorage.getItem('refreshToken') || null;
    const expiresIn = Number(localStorage.getItem('expiresIn')) || null;

    /* Tried to perform encryption */
    /* return [null, '', 'undefined', undefined].includes(accessToken)
        ? null
        : decrypt(accessToken).toString(); */

    return {
        tokenType,
        expiresIn,
        accessToken,
        refreshToken,
    };
};
