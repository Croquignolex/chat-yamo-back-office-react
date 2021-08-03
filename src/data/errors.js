export default {
    OTHERS: {
        AUTH_FAILED: {
            CODE: 'AUTH_FAILED',
            MESSAGE: "Login et/ou mot de passe incorrect",
            DESCRIPTION: `"The plan with name " +name+ " already exists"`
        },
        USER_NOT_FOUND: {
            CODE: 'USER_NOT_FOUND',
            MESSAGE: "Utilisateur non trouvé",
            DESCRIPTION: `"The plan with name " +name+ " already exists"`
        },
    },
};

export const ERROR_401 = "Votre connection a expiré. Veuillez vous reconnecter";
export const ERROR_403 = "Vous n'avez pas les droits pour effectuer cette action";
export const ERROR_404 = 'Non trouvé. Veuillez ressayer plus tard';
export const ERROR_500 = 'Une erreur est survenue. Veuillez ressayer plus tard';
export const ERROR_UNKNOWN = 'Impossible d\'effectuer toutes requetes. Veuillez verifier votre connexion internet et ressayer. Si le problème persiste veuillez contacter le support.';
