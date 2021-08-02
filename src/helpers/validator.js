export const requiredValidatorObject = {
    // required: true,
    required: 'form.error.requiredField',
    message: 'form.error.requiredFielddsds',
};

export const emailValidatorObject = {
    regex: /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i,
    message: 'form.error.validEmail'
};

export const subDomainValidatorObject = {
    regex: /^\w[\w.-]+\w$/i,
    message: 'form.error.subDomain'
};

export const subDomainRestrictedValidatorObject = {
    regex: /^\w+$/i,
    message: 'form.error.subDomain'
};

export const dateValidatorObject = {
    regex: /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
    message: 'form.error.validDate'
};

export const minMaxValidatorObject = {
    minMessage: 'form.error.minCharacters',
    maxMessage: 'form.error.maxCharacters',
};

export const passwordValidatorObject = {
    passwordConfirmation: 'form.error.passwordConfirmation',
};
