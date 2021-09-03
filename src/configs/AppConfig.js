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
    baseUrlWithService : backendBaseUrl + '/service',
    timeout: 15000,
};

export const urlConfig = {
    params: {
        caseId: "ci"
    }
};

export const BACK_OFFICE_USER_ID = process.env.REACT_APP_BACK_OFFICE_USER_ID;
export const APP_SERVICE_JWT = process.env.REACT_APP_SERVICE_JWT;