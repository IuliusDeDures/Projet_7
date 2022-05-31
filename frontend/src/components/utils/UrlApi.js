/**
 * liste des URL de l'API pour les commentaire*/
const urlCommentaire = `${process.env.REACT_APP_API_URL}commentaires/`
export { urlCommentaire }
const urlCommentaireAdmin = `${process.env.REACT_APP_API_URL}commentaires/admin/`
export { urlCommentaireAdmin }

/**
 * liste des URL de l'API pour les likes*/
const urlLikeMessaqge = `${process.env.REACT_APP_API_URL}likes/likeMessage/`
export { urlLikeMessaqge }
const urlLikeCommentaire = `${process.env.REACT_APP_API_URL}likes/likeCommentaire/`
export { urlLikeCommentaire }

/**
 * liste des URL de l'API pour les messages */
const urlMessage = `${process.env.REACT_APP_API_URL}messages/`
export { urlMessage }
const urlMessageAdmin = `${process.env.REACT_APP_API_URL}messages/admin/`
export { urlMessageAdmin }

/**
 * liste des URL de l'API pour les reponses de commentaire*/
const urlRepCommentaire = `${process.env.REACT_APP_API_URL}repCommentaires/`
export { urlRepCommentaire }
const urlRepCommentaireAdmin = `${process.env.REACT_APP_API_URL}repCommentaires/admin/`
export { urlRepCommentaireAdmin }

/**
 * liste des URL de l'API pour les utilisateurs*/
const urlLogin = `${process.env.REACT_APP_API_URL}auth/login`
export { urlLogin }
const urlSignup = `${process.env.REACT_APP_API_URL}auth/signup`
export { urlSignup }
const urlDeleteUser = `${process.env.REACT_APP_API_URL}auth/`
export { urlDeleteUser }
const urlDeleteOneUser = `${process.env.REACT_APP_API_URL}auth/deleteOne/`
export { urlDeleteOneUser }
