1. CREER LA BASE DE DONNEE "groupomania" ET CES DIFFERENTES TABLES DANS L'ORDRE SUIVANT   
    1. LA TABLE "users"
    2. LA TABLE "messages"
    3. LA TABLE "commentaires"
    4. LA TABLE "reponsecommentaires"
    5. LA TABLE "likesmessages"
    6. LA TABLE "likescommentaires"
AVEC LA COMMANDE : run sql (nécessite MySQL 8)

CONFIG BASE DE DONNEE = 
  username:'Groupomania',
  password:'$Group001',
  database:'groupomania',
  dialect:'mysql',
  host:'localhost',


2. DEPUIS LE DOSSIER BACKEND INSTALLER LES ELEMENTS DU BACKEND AVEC LA COMMANDE : npm install

3. DEMARRER LE SERVEUR DU BACKEND AVEC LA COMMANDE : nodemon server (PORT 8000)

4. DEPUIS LE DOSSIER FRONTEND INSTALLER LES ELEMENTS DU FRONTEND AVEC LA COMMANDE : npm install

5. CREER UN FICHIER '.env' DANS LE DOSSIER 'frontend' CONTENANT LA LIGNE SUIVANT: REACT_APP_API_URL=http://127.0.0.1:8000/api/

6. DEMARRER L'APLICATION FRONTEND AVEC LA COMMANDE : npm start (PORT 3000)