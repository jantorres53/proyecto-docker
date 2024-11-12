"use strict";
var _importDefault = (this && this._importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = _importDefault(require("promise-mysql"));

// Crear el pool de conexión
const pool = promise_mysql_1.default.createPool({
    host: "mysql-db",  
    port: 3306,
    user: "admin",  
    password: "admin",  
    database: "agenda",  
});

// Función para reintentar la conexión a la base de datos
const retry = async (fn, retriesLeft = 5, interval = 5000) => {
    try {
        return await fn();
    } catch (error) {
        if (retriesLeft <= 0) {
            throw new Error("Max retries reached. Unable to connect to the database.");
        }
        console.log(`Retrying connection to database... attempts left: ${retriesLeft}`);
        await new Promise((r) => setTimeout(r, interval));
        return retry(fn, retriesLeft - 1, interval);
    }
};

// Esperar 10 segundos antes de intentar conectarse a la base de datos
setTimeout(() => {
    retry(() => pool.getConnection(), 5)
        .then((connection) => {
            pool.releaseConnection(connection);
            console.log("DB is Connected");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
        });
}, 10000); // Esperar 10 segundos antes de intentar conectarse

exports.default = pool;