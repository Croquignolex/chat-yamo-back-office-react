export const saveAuthToken = (
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    entityId,
    userDetails,
) => {
    localStorage.setItem('entityId', entityId);
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());
    localStorage.setItem('userDetails', JSON.stringify(userDetails || "{}"));
};

export const removeAuthToken = () => {
    localStorage.removeItem('entityId');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const getAuthToken = () => {
    const entityId = localStorage.getItem('entityId') || null;
    const tokenType = localStorage.getItem('tokenType') || null;
    const userDetails = localStorage.getItem('userDetails') || "{}";
    const accessToken = localStorage.getItem('accessToken') || null;
    const refreshToken = localStorage.getItem('refreshToken') || null;
    const expiresIn = Number(localStorage.getItem('expiresIn')) || null;

    return {
        entityId,
        tokenType,
        expiresIn,
        accessToken,
        refreshToken,
        userDetails: JSON.parse(userDetails),
    };
};
