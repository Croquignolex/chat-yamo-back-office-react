export default {
    OTHERS: {
        AUTH_FAILED: {
            CODE: 'AUTH_FAILED',
            MESSAGE: "Login et/ou mot de passe incorrect",
            DESCRIPTION: `"The plan with name " +name+ " already exists"`
        },
        INVALID_TOKEN_ERROR: {
            CODE: 'INVALID_TOKEN_ERROR',
            MESSAGE: "Connexion expiré. Veuillez vous reconnectez",
            DESCRIPTION: `INVALID_TOKEN_ERROR`
        },
        BAD_IMAGE_TYPE: {
            CODE: 'BAD_IMAGE_TYPE',
            MESSAGE: "Format d'image non autorisé. Veuillez changer ce format svp.",
            DESCRIPTION: `BAD_IMAGE_TYPE`
        },
    },
};

export const ERROR_401 = "Votre connection a expiré. Veuillez vous reconnecter";
export const ERROR_403 = "Vous n'avez pas les droits pour effectuer cette action";
export const ERROR_404 = 'Non trouvé. Veuillez ressayer plus tard';
export const ERROR_500 = 'Une erreur est survenue. Veuillez ressayer plus tard';
export const ERROR_UNKNOWN = 'Impossible d\'effectuer toutes requetes. Veuillez verifier votre connexion internet et ressayer. Si le problème persiste veuillez contacter le support.';
