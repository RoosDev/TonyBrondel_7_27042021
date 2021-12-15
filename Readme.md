# **Groupomania**  --  *by RoosDev* 

## Project 7 - OpenClassRooms  -- *Create a corporate Social Network*
---

![Groupomania App - Responsive](./readme/Readme-Grouporama-800.png "Responsive Design")

---
## **The Techno.**
---

### **FRONT END** <br />
<img src="./readme/vueJS.png" width="150px" alt="VueJS 3.23 - SFC - Script Setup & Composition API"> with
<img src="./readme/Typescript.png" width="70px" alt="TypeScript - FrontEnd"><img src="./readme/html5.png" width="60px" alt="HTML5"><img src="./readme/css3.png" width="60px" alt="CSS3">g<img src="./readme/sass.png" width="100px" alt="SASS">
<br />
<br />
<br />

### **BACK END** <br />
<img src="./readme/nodeJS.png" width="120px" alt="NodeJS v16.x"><img src="./readme/expressJS.png" width="150px" alt="Express"><img src="./readme/sequelize-logo.png" width="60px" alt="Sequelize"><img src="./readme/Axios.png" width="150px" alt="Axios">
 <br />
 <br />

---
## **Install & run**
---

1. Clone the repository

* ### The BACK END
2. Create Database and tables.
   1. Create de Databse in MySQL 
   2. Go in folder : **/DB**
   3. Import in the databse created in MySQL the .sql file
   4. All settings to connect to the Database must be updated in the file  : **/backend/.env**
3. In a Shell :
   1. Go in folder : **/backend**
   2. Run *(to install)* :   <br /> 
    **``` npm install ```**
   3. then run *(to start)*:<br /> 
    **``` node server.js ```**

=> In the Shell you should read  :<br /> 
      *``` Executing (default): SELECT 1+1 AS result```*

* ### The FRONT END
4. In a shell :
   1. Go in folder : **/web**
   2. Run *(to install)* :   <br /> 
    **``` npm install ```**
   3. Be sure that folders listed below are created, if not you have to create them : <br /> 
         - **.\web\public\Public_Images\Profile**
         - **.\web\public\Public_Images\Posts**<br />
   4. Run *(to start)*:<br /> 
   **``` npm run serve ```**<br /> 
   *(if you want to build the web version to published, you can use : **```npm run build```** )*
    
---
## **Admin**
---

To create the first administrator : 

1. Go on the homepage : http://localhost:8080 
2. Sign in with the default admin account :
   - **login :**  *admin@groupomania.com*
   -  **password :** *Change-Me1*
3. When our are logged in, **you have to change email address and password for security** 

---
