const backendBaseUrl = (function (mode) {
    switch (mode) {
        case 'LOCAL': return process.env.REACT_APP_API_URL_LOCAL;
        case 'PROD': return process.env.REACT_APP_API_URL_PROD;
        default: return process.env.REACT_APP_API_URL_DEV;
    }
})(process.env.REACT_APP_BACKEND_MODE);

export const backendConfig = {
    baseUrl : backendBaseUrl,
    baseUrlWithService : backendBaseUrl + '/service',
    timeout: 15000,
};

export const REACT_APP_CHAT_BACKOFFICE_USER_ID = process.env.REACT_APP_CHAT_BACKOFFICE_USER_ID;
