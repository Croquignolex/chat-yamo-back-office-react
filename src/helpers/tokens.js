// import { encrypt, decrypt } from './crypto';

export const saveAuthToken = (
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    entityId,
) => {
    localStorage.setItem('entityId', entityId);
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());
};

export const removeAuthToken = () => {
    localStorage.removeItem('entityId');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const getAuthToken = () => {
    const entityId = localStorage.getItem('entityId') || null;
    const tokenType = localStorage.getItem('tokenType') || null;
    const accessToken = localStorage.getItem('accessToken') || null;
    const refreshToken = localStorage.getItem('refreshToken') || null;
    const expiresIn = Number(localStorage.getItem('expiresIn')) || null;

    return {
        entityId,
        tokenType,
        expiresIn,
        accessToken,
        refreshToken,
    };
};
