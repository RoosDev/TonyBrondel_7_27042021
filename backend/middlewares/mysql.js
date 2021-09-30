//Récupération des variables d'environnement pour la connexion
const dotenv = require("dotenv");
dotenv.config();
const SQLhost = process.env.MYSQL_URL;
const SQLuser = process.env.MYSQL_User;
const SQLpass = process.env.MYSQL_Pass;
const SQLdb = process.env.MYSQL_DBName;
const SQLport = process.env.MYSQL_Port;


// Lancement de la connexion 
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : SQLhost,
  user     : SQLuser,
  password : SQLpass,
  database : SQLdb, 
  port     : SQLport,
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


 
connection.end();