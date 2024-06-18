import _ from 'lodash';
import moment from 'moment';
import api from "../utility/api";
import {NotificationManager} from 'react-notifications';

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (!str) {
        return "";
    }
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD';
    return moment(date, formatDate).unix();
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}

export const getLocaleFromBrowser = () => {
    const browserLanguage = window.navigator.userLanguage || window.navigator.language;
    return browserLanguage.split('-')[0];
};

/**
 * Deep mapping an object
 * @param obj
 * @param callback function to apply to the key
 */
export function deepMapObject(obj, callback) {
    let rtn = obj;
    if (typeof (obj) === 'object') {
        if (obj instanceof Array) {
            rtn = obj.map(item => deepMapObject(item, callback));
        } else {
            rtn = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // apply the change on the string
                    const newKey = callback(key);

                    // Falsy or primitive value
                    if (!obj[key] || typeof obj[key] !== 'object')
                        rtn[newKey] = obj[key];
                    // nested object
                    else rtn[newKey] = deepMapObject(obj[key], callback);
                }
            }
        }
    }
    return rtn;
}

/**
 * Convert an object to camelCase
 * @param obj
 */
export function toCamelCase(obj) {
    // function to execute on each key
    const callback = key => key.replace(/(_\w)/g, k => k[1].toUpperCase());

    // call a generic method
    return deepMapObject(obj, callback);
}

/**
 * Convert an object to snake case
 * @param obj
 */
export function toSnakeCase(obj) {
    // function to execute on each key
    const callback = key => key.replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');

    // call a generic method
    return deepMapObject(obj, callback);
}

export const objectToFormData = (obj) => {
    let formData = new FormData();
    if (obj instanceof FormData) {
        formData = obj;
    } else {
        Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    }
    return formData;
};

/**
 * Get query of url
 * @param useLocation
 * @returns {URLSearchParams}
 */
export const useQuery = (useLocation) => new URLSearchParams(useLocation().search);

/**
 * Perform a global search on any data type
 * @param data
 * @param searched
 * @returns {Array|*}
 */
export const globalSearch = (data, searched) => {
    if (!searched) {
        return data;
    }

    const _searched = typeof searched === 'string' ? searched.toLowerCase() : searched;
    return _.filter(data, o => {
        return Object.values(o)
            .filter(f => typeof f === 'string' || typeof f === 'number')
            .join(' ')
            .toLowerCase()
            .includes(_searched)
    });
};

/**
 * Extension of can action to handle array
 * @param permissions {Array}
 * @param some {boolean}
 * @returns {boolean|*}
 */
export const canArray = (permissions, some = true) => {
    if (permissions && Array.isArray(permissions)) {
        // If the array is empty then the user have permissions since there is no restrictions to that
        if (permissions.length === 0) return true;

        return permissions.reduce((a,b) => some
            ? a || b
            : a && b
        );
    }

    return false;
};


/**
 * Generate an unique id
 *
 * From StackOverFlow https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 *
 * @returns {number}
 */
export const getUniqueId = () => {
    /*const d0 = Math.random()*0xffffffff|0;
    const d1 = Math.random()*0xffffffff|0;
    const d2 = Math.random()*0xffffffff|0;
    const d3 = Math.random()*0xffffffff|0;
    return TABLE_OF_256_HEXADECIMAL[d0&0xff]+TABLE_OF_256_HEXADECIMAL[d0>>8&0xff]+TABLE_OF_256_HEXADECIMAL[d0>>16&0xff]+TABLE_OF_256_HEXADECIMAL[d0>>24&0xff]+'-'+
        TABLE_OF_256_HEXADECIMAL[d1&0xff]+TABLE_OF_256_HEXADECIMAL[d1>>8&0xff]+'-'+TABLE_OF_256_HEXADECIMAL[d1>>16&0x0f|0x40]+TABLE_OF_256_HEXADECIMAL[d1>>24&0xff]+'-'+
        TABLE_OF_256_HEXADECIMAL[d2&0x3f|0x80]+TABLE_OF_256_HEXADECIMAL[d2>>8&0xff]+'-'+TABLE_OF_256_HEXADECIMAL[d2>>16&0xff]+TABLE_OF_256_HEXADECIMAL[d2>>24&0xff]+
        TABLE_OF_256_HEXADECIMAL[d3&0xff]+TABLE_OF_256_HEXADECIMAL[d3>>8&0xff]+TABLE_OF_256_HEXADECIMAL[d3>>16&0xff]+TABLE_OF_256_HEXADECIMAL[d3>>24&0xff];*/

    return new Date().getTime();
};

/**
 * Get or create session id
 * @returns {string}
 */
export const getSessonId = () => {
    const sessionId = localStorage.getItem('ssid');
    if (sessionId) {
        return sessionId;
    } else {
        const newSessionId = getUniqueId();
        localStorage.setItem('ssid', newSessionId);
        return newSessionId;
    }
};

export const copyToClipboard = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
            } else {
                const textField = document.createElement('textarea');
                textField.innerText = text;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();
            }

            NotificationManager.success("Lien copié", null, 5000);
            resolve();
        } catch (e) {
            NotificationManager.error("Impossible de copier le lien", null, 5000, null, true);
            reject();
        }
    })
};

/**
 * Perform normal request
 * @param verb
 * @param url
 * @param data
 * @param config
 * @returns {Promise<any>}
 */
export const makeRequest = (verb, url, data = null, config = {}) => {
    return new Promise((resolve, reject) => {
        let _url = url;
        if ((verb === 'get' || verb === 'delete') && data) {
            Object.entries(data).forEach(item => {
                const encoded = encodeURIComponent(item[1]);
                const character = _url.includes('?') ? '&' : '?';
                // TODO: auto add entityId to request
                _url = `${_url}${character}${toSnakeCase(item[0])}=${encoded}`
            });
        }
        const params = (verb === 'get' || verb === 'delete') ? [_url, config] : [_url, data, config];
        api[verb](...params)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

/**
 * Perform action request
 * @param verb
 * @param url
 * @param typeBase
 * @param dispatch
 * @param data
 * @param config
 * @returns {Promise<any> | * | Promise<T | never> | undefined}
 */
export const makeActionRequest = (verb, url, typeBase, dispatch, data = null, config = {} ) => {
    dispatch({ type: typeBase });
    return makeRequest(verb, url, data, config)
        .then((response) => {
            dispatch({ type: `${typeBase}_SUCCESS`, payload: response });
            return Promise.resolve(response);
        })
        .catch((error) => {
            dispatch({ type: `${typeBase}_FAILURE` });
            return Promise.reject(error);
        });
};


/**
 * Download a file
 * @param fileUrl
 * @param filename
 * @returns {Promise<any>}
 */
export const downloadFile = (fileUrl, filename = '') => {
    return new Promise((resolve, reject) => {
        try {
            const a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);

            a.href = fileUrl;
            a.target = "_blank";
            a.download = filename;
            // a.download = 'Content-Disposition: attachment; filename="' + filename + '"';

            // Trigger the download by simulating click
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
            resolve();
        } catch (e) {
            reject(e);
        }
    })
};

export const imageExistsStepByStep = (image) => {
    return new Promise(function(resolve) {
        imageExists(image?.enhancedPreSignedUrl)
            .then((chosenUrl) => resolve(chosenUrl))
            .catch(() => {
                imageExists(image?.compressedPreSignedUrl)
                    .then((chosenUrl) => resolve(chosenUrl))
                    .catch(() => {
                        imageExists(image?.originalPreSignedUrl)
                            .then((chosenUrl) => resolve(chosenUrl))
                            .catch(() => {
                                imageExists(image?.compressedUrl)
                                    .then((chosenUrl) => resolve(chosenUrl))
                                    .catch(() => {
                                        imageExists(image?.originalUrl)
                                            .then((chosenUrl) => resolve(chosenUrl))
                                            .catch(() => {
                                                resolve(null);
                                            })
                                    })
                            })
                    })
            })
    });
}

export const imageExists = (url) => {
    return new Promise(function(resolve) {
        const img = new Image();
        img.onload = function() {
            resolve(url);
        }
        img.onerror = function() {
            resolve(null);
        }
        img.src = url;
    });
}

/**
 * Get price with a currency according to nation
 * @param price
 * @returns {string}
 */
export const getPriceWithCurrency = (price) => {
    const currency = localStorage.getItem('currencyCode');
    return currency ? `${price} ${currency}` : `${price}`;
};

/**
 * Get currency according to nation
 * @returns {string}
 */
export const getCurrency = () => {
    return localStorage.getItem('currencyCode');
};

/**
 * Reverse object.entries operation
 * @param arr {Array}
 * @returns {Object}
 */
export const fromEntries = (arr) => {
    return arr.reduce((acc,[k,v])=>({...acc,[k]:v}),{});
};

/**
 *
 * @param msg
 */
export const formatMessage = msg => msg;

/**
 * Get the value of a given parameter in the browser url
 * @param param
 * @returns {string}
 */
export const searchUrlParams = (param) => {
    const url = new URL(window.location);
    return url.searchParams.get(param);
};

/**
 *
 * @param number
 * @returns {*|string}
 */
export const twoDigitDisplay = (number) => {
    return (number > 9) ? number : "0" + number;
}

/**
 *
 * @param input
 * @returns {*|{isValid: boolean}|{isValid: boolean, errorMessage: string}}
 */
export const requiredChecker = (input) => {
    return (input.data?.toString().length > 0)
        ? {...input, isValid: true}
        : {...input, isValid: false, errorMessage: "Valeur du champ réquis"};
};

/**
 *
 * @param allowedRoles
 * @param userRoles
 * @returns {boolean}
 */
export const checkRole = (allowedRoles, userRoles) => {
    const needleRole = allowedRoles.find((role) => userRoles.includes(role));
    //return needleRole.length !== 0;
    return !!needleRole
};

/**
 *
 * @param file
 * @returns {Promise<unknown>}
 */
export const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.addEventListener('error', (error) => reject(error));
        reader.readAsDataURL(file);
    });
};

/**
 *
 * @param base64Image
 * @returns {Promise<unknown>}
 */
const base64ToImageObject = (base64Image) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = base64Image;
    });
};

/**
 *
 * @param imageSrc
 * @param pixelCrop
 * @returns {Promise<unknown>}
 */
export const extractCroppedImage = (imageSrc, pixelCrop) => {
    return new Promise((resolve, reject) => {
        base64ToImageObject(imageSrc)
            .then((image) => {
                // Data
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Ensure that context has been created
                (!ctx) && reject("Unable to create image context");

                // Set canvas width to final desired crop size
                canvas.width =  pixelCrop.width
                canvas.height = pixelCrop.height

                // Build crouped image
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );

                resolve(canvas.toDataURL('image/jpeg'))
            })
            .catch((error) => reject(error));
    });
};

export const formatString = (text, maxCharacters) => {
    try {
        if(text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
    } catch (e) {
        console.log("Format string function error", {text, maxCharacters, exception: e});
    }
    return text;
};