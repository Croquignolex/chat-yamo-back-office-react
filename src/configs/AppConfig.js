const backendBaseUrl = (function (mode) {
    switch (mode) {
        case 'LOCAL':
            return process.env.REACT_APP_API_URL_LOCAL;
        case 'PROD':
            return process.env.REACT_APP_API_URL_PROD;
        default:
            return process.env.REACT_APP_API_URL_DEV;
    }
})(process.env.REACT_APP_BACKEND_MODE);

export const backendConfig = {
    baseUrl : backendBaseUrl,
    timeout: 15000,
};
