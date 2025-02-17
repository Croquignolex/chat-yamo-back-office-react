import axios from 'axios';
import {errorManager} from "../helpers/request";
import {backendConfig} from "../configs/AppConfig";
import {NotificationManager} from "react-notifications";
import {getAuthToken, removeAuthToken} from "../helpers/tokens";
import {objectToFormData, toSnakeCase, formatMessage} from "../helpers/helpers";
import {ERROR_401, ERROR_403, ERROR_404, ERROR_500, ERROR_UNKNOWN} from "../data/errors";

const customAxios = axios.create({
    baseURL: backendConfig.baseUrlWithService,
    // timeout: backendConfig.timeout,
});

customAxios.interceptors.request.use(
    async (config) => {
        try {
            // Get auth token
            const { accessToken } = getAuthToken();

            if (accessToken && !config.shouldSkipToken) {
                config.headers['Authorization'] = 'Bearer ' + accessToken;
            }

            /*if (config.multipart) {
                config.headers['content-type'] = 'multipart/form-data';
            }*/

            if (config.isJson) {
                config.headers['content-type'] = 'application/json';
            }

            // Check if post or put to perform some operation
            if ((config.method === 'post' || config.method === 'put' || config.method === 'delete') && config.shouldParseFormData) {
                // Create an object to store file data
                const fileData = {};

                // Check if fileData is present
                if (config.fileData) {
                    config.fileData.forEach(f => {
                        fileData[f] = config.data[f];
                        delete config.data[f];
                    });
                }

                // Parse object to snakeCase and Form data
                const data = toSnakeCase(config.data);
                config.data = objectToFormData(data);

                // Append files to data to send
                if (config.fileData) {
                    Object.entries(fileData).forEach(item => {
                        config.data.append(item[0], item[1]);
                    });
                }
            }

            // config.headers['Content-Type'] = 'application/json';
            return config;
        } catch (e) {
            return config;
        }

    },
    error => Promise.reject(error));

customAxios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const originalRequest = error.config;
        if (error) {
            if (error.response) {
                if (!originalRequest.skipError) {
                    switch (error.response.status) {
                        case 400:
                            errorManager(error.response.data);
                            return Promise.reject(error);
                        case 401:
                            NotificationManager.error(formatMessage(ERROR_401), null, 300);
                            return Promise.reject(error);
                        case 403:
                            NotificationManager.error(formatMessage(ERROR_403), null, 300);
                            // With redirect to login page (consider rooter)
                            removeAuthToken();
                            return window.location.reload();
                        case 404:
                            NotificationManager.error(formatMessage(ERROR_404), null, 300);
                            return Promise.reject(error);
                        case 500:
                            NotificationManager.error(formatMessage(ERROR_500), null, 300);
                            return Promise.reject(error);
                        default:
                            NotificationManager.error(formatMessage(ERROR_500), null, 300);
                            return Promise.reject(error);
                    }
                }
            } else if (!originalRequest.skipError) NotificationManager.error(formatMessage(ERROR_UNKNOWN), null, 300);
        } else if (!originalRequest.skipError) NotificationManager.error(formatMessage(ERROR_UNKNOWN), null, 300);

        return Promise.reject(error);
    });

export default customAxios;
