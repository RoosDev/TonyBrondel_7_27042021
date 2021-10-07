// Chargement des packages

const http = require("http");
const https = require("https");
const app = require("./app");
const dotenv = require("dotenv");
const fs = require('fs');

// import du module
// import { existsSync } from 'fs';

// Chargement des variables d'environnement 
dotenv.config();
const APP_PORTS = process.env.PORTS;
const APP_PORT = process.env.PORT;
const KEY_HTTPS = process.env.Key_Path_HTTPS;
const CERT_HTTPS = process.env.Cert_Path_HTTPS;

// Test pour HTTPS ou HTTP
if( fs.existsSync(KEY_HTTPS) && fs.existsSync(CERT_HTTPS) ){
    const options = {
        key: fs.readFileSync(KEY_HTTPS),
        cert: fs.readFileSync(CERT_HTTPS)
    };
    
    https.createServer(options, (req, res) => {
        res.writeHead(200);
        res.end(app);
    }).listen(APP_PORTS);
    console.log('hello world\n Let\' go !!\n || Listening on '+ APP_PORTS )
}else{

    const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
    };
    const port = normalizePort(APP_PORT);
    app.set("port", port);

    const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
        console.error(bind + " requires elevated privileges.");
        process.exit(1);
        break;
        case "EADDRINUSE":
        console.error(bind + " is already in use.");
        process.exit(1);
        break;
        default:
        throw error;
    }
    };

    const server = http.createServer(app);

    server.on("error", errorHandler);
    server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Not secure !! but listening on " + bind);
    });

    server.listen(port);
}