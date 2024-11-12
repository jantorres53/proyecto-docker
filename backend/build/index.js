"use strict";
var _importDefault = (this && this._importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = _importDefault(require("express"));
const morgan_1 = _importDefault(require("morgan"));
const cors_1 = _importDefault(require("cors"));
const usuario_routes_1 = _importDefault(require("./routes/usuario.routes"));
const empresa_routes_1 = _importDefault(require("./routes/empresa.routes"));
const area_routes_1 = _importDefault(require("./routes/area.routes"));
const mantenimiento_routes_1 = _importDefault(require("./routes/mantenimiento.routes"));
const comentario_routes_1 = _importDefault(require("./routes/comentario.routes"));

class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            allowedHeaders: "Content-Type,Authorization",
            credentials: true,
        }));
        this.app.options('*', cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.get('/favicon.ico', (req, res) => res.status(204));
    }
    routes() {
        this.app.use('/api/usuarios', usuario_routes_1.default);
        this.app.use('/api/empresa', empresa_routes_1.default);
        this.app.use('/api/area', area_routes_1.default);
        this.app.use('/api/mantenimiento', mantenimiento_routes_1.default);
        this.app.use('/api/comentario', comentario_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();