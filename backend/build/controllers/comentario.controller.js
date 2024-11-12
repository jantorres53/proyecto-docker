"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentarioController = void 0;
const connection_1 = __importDefault(require("../connection"));
class ComentarioController {
    obtenerComentarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMantenimiento } = req.params;
            const areas = yield connection_1.default.query('SELECT * FROM comentario WHERE mantenimientoFk = ?', [idMantenimiento]);
            res.json(areas);
        });
    }
    verComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const area = yield connection_1.default.query('SELECT * FROM comentario WHERE id = ?', [id]);
            if (area.length > 0) {
                return res.json(area[0]);
            }
            res.status(404).json({ text: "El comentario no existe" });
        });
    }
    registrarComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query('INSERT INTO comentario SET ?', [req.body]);
                res.status(201).json({ message: 'Se registró el comentario correctamente', insertedId: result.insertId });
            }
            catch (error) {
                console.error('Error al registrar el comentario:', error);
                res.status(500).json({ message: 'Error al registrar el comentario' });
            }
        });
    }
    // Esta madre es opcional nomás
    modificarComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connection_1.default.query('UPDATE comentario SET ? WHERE id = ?', [req.body, id]);
                res.json({ message: 'El comentario ha sido actualizado' });
            }
            catch (error) {
                console.error('Error al modificar el comentario:', error);
                res.status(500).json({ message: 'Error al modificar el comentario' });
            }
        });
    }
    eliminarComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connection_1.default.query('DELETE FROM comentario WHERE id = ?', [id]);
                res.json({ message: 'El comentario ha sido eliminada' });
            }
            catch (error) {
                console.error('Error al eliminar el comentario:', error);
                res.status(500).json({ message: 'Error al eliminar el comentario' });
            }
        });
    }
}
exports.comentarioController = new ComentarioController();
exports.default = exports.comentarioController;
