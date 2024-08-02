import api from "../utility/api";

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
 * Generate an unique id
 *
 * @returns {number}
 */
export const getUniqueId = () => {
    return new Date().getTime();
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
    return new Promise(function(resolve, reject) {
        const img = new Image();
        img.onload = function() {
            resolve(url);
        }
        img.onerror = function() {
            reject();
        }
        img.src = url;
    });
}

/**
 *
 * @param msg
 */
export const formatMessage = msg => msg;

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