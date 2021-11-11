import _ from 'lodash';
import {formatMessage} from "./helpers";
import ERRORS, {ERROR_500} from '../data/errors';
import {NotificationManager} from "react-notifications";

/**
 * Get all error into an array
 * @type {Array}
 */
const errorItems = _.flattenDeep(Object.values(ERRORS).map(i => Object.values(i)));

/**
 * Map errors and display them
 * @param errors
 * @param customOptions
 */
export const errorManager = (errors, customOptions = null) => {
    let found = false;

    if (errors) {
        if (Array.isArray(errors)) {
            errors.forEach(error => {
                const errorItem = errorItems.find(e => e.CODE === error.message);
                if (errorItem) {
                    NotificationManager.error(formatMessage(errorItem.MESSAGE), null, null, true);
                    found = true;
                }
            });
        } else {
            const errorItem = errorItems.find(e => e.CODE === errors.message);
            console.log("errorItem => ", {errorItem, errors});
            if (errorItem) {
                NotificationManager.error(formatMessage(errorItem.MESSAGE), null, null, true);
                found = true;
            }
        }
    }

    // Display Error 500 in case of no match
    if (!found) {
        NotificationManager.error(formatMessage(ERROR_500), null, null, true);
    }
};
