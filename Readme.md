# **Groupomania**  --  *by RoosDev* 

## Projet 7 - OpenClassRooms  -- *Créer un réseau social d'entreprise*
---

![Groupomania App - Responsive](./readme/Readme-Grouporama-800.png "Aperçu des Devices")

---
## **Les Technologies**

### **FRONT END** <br />
<img src="./readme/vueJS.png" width="150px" alt="VueJS 3.23 - SFC - Script Setup & Composition API"> with
<img src="./readme/Typescript.png" width="70px" alt="TypeScript - FrontEnd">
<img src="./readme/html5.png" width="60px" alt="HTML5">
<img src="./readme/css3.png" width="60px" alt="CSS3">
<img src="./readme/sass.png" width="100px" alt="SASS">
<br />
<br />
<br />

### **BACK END** <br />
<img src="./readme/nodeJS.png" width="120px" alt="NodeJS v16.x">
<img src="./readme/expressJS.png" width="150px" alt="Express">
<img src="./readme/sequelize-logo.png" width="60px" alt="Sequelize">
<img src="./readme/Axios.png" width="150px" alt="Axios">
 <br />
 <br />

---

 <br />

## **Installation**


1. Cloner le repository complet

* ### Le BACK END
2. Créer la base de données et ses tables.
   1. Pour cela aller dans le dossier : **/DB**
   2. Importer le fichier présent dans ce dossier dans MySQL
   3. L'ensemble des éléments de connexion à la base de donnée sont présent dans le fichier : /backend/.env 
3. Dans une console :
   1. se rendre dans le dossier : /backend
   2. lancer la commande :   
    ``` npm install ```
   3. lancer node server.js

=> La console devrait vous afficher :``` Executing (default): SELECT 1+1 AS result```

* ### Le FRONT END
4. Dans une console :
   1. se rendre dans le dossier : **/web**
   2. lancer la commande :
   ``` npm run serve ```
   *(si vous souhaiter générer la version de prod, utiliser la commande : ```npm run build``` )
    
---

## **Administration**

Pour créer l'administrateur initial: 

1. Rendez-vous sur la page d'accueil : http://localhost:8080 
2. Inscrivez vous comme n'importe quel utilisateur via le formulaire
3. Allez dans MySql 
   1. entrer sur la table *groupo_prod*   =>    ``` use groupo_prod;``` 
   2. puis accéder à la table *users* 
   3. sur la ligne de votre utilisateur passer le ```role_Id``` à 3 <br /> avec la commande *(si votre utilisateur à l'id 1)*: <br />
    ```UPDATE users SET role_Id = 3 WHERE id = 1; ```  

---
