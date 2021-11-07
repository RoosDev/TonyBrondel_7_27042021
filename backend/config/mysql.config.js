// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const SQLhost = process.env.MYSQL_URL;
const SQLuser = process.env.MYSQL_User;
const SQLpass = process.env.MYSQL_Pass;
const SQLdb = process.env.MYSQL_DBName;
const SQLport = process.env.MYSQL_Port;
const PerPage = process.env.LIST_PER_PAGE;

const config = {
  db: { 
  host: SQLhost,
  user: SQLuser,
  database: SQLdb, 
  password: SQLpass,
  port: SQLport,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  },
  listPerPage: PerPage || 10,
};


module.exports = config;