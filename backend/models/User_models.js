const mysql = require("mysql");

let SignupQuery = connection.query({
    sql: `
    START TRANSACTION ; 

        INSERT INTO user_connect [(email_H, password_H)] VALUE(?,?);

        INSERT INTO user_identity [(firstname, lastname, email_Crypt, job, photo_URL, division, active)] VALUE(?,?,?,?,?,?);

    COMMIT; ` ,SignupUser, function (error, results, fields) 
  });
  
  

  module.exports = mysql.model("Utilisateur", SignupQuery);
