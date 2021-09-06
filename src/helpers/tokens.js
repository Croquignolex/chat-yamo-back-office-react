// import { encrypt, decrypt } from './crypto';

export const saveAuthToken = (
    accessToken,
    userAccessToken,
    tokenType,
    expiresIn,
    refreshToken,
) => {
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userAccessToken', userAccessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());
};

export const removeAuthToken = () => {
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('refreshToken');
};

export const getAuthToken = () => {
    const tokenType = localStorage.getItem('tokenType') || null;
    const accessToken = localStorage.getItem('accessToken') || null;
    const userAccessToken = localStorage.getItem('userAccessToken') || null;
    const refreshToken = localStorage.getItem('refreshToken') || null;
    const expiresIn = Number(localStorage.getItem('expiresIn')) || null;

    return {
        tokenType,
        expiresIn,
        accessToken,
        userAccessToken,
        refreshToken,
    };
};
