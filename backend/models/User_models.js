const mysql = require("mysql");
const { connect } = require("../app");

let SignupQuery = connection.query({
    sql: `
    START TRANSACTION ; 

        INSERT INTO user_connect [(email_H, password_H)] VALUE(?,?);

        INSERT INTO user_identity [(firstname, lastname, email_Crypt, job, photo_URL, division, active)] VALUE(?,?,?,?,?,?);

    COMMIT; ` ,SignupUser, function (error, results, fields) ;
  });
  

let UsersQuery = connection.query({
    sql: `
    SELECT * FROM user_connect ;

    
    ` , SelectUser, function(error, results, fields)
})  ;


  module.exports = mysql.model("userAdd", SignupQuery);
  module.exports = mysql.model("userList", UsersQuery);

