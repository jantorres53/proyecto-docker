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
exports.areaController = void 0;
const connection_1 = __importDefault(require("../connection"));
class AreaController {
    obtenerAreas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEmpresa } = req.params;
            const areas = yield connection_1.default.query('SELECT * FROM area WHERE empresaFk = ?', [idEmpresa]);
            res.json(areas);
        });
    }
    verArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const area = yield connection_1.default.query('SELECT * FROM area WHERE id = ?', [id]);
            if (area.length > 0) {
                return res.json(area[0]);
            }
            res.status(404).json({ text: "El servicio/área no existe" });
        });
    }
    registrarArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query('INSERT INTO area SET ?', [req.body]);
                res.status(201).json({ message: 'Se registró el área/servicio correctamente', insertedId: result.insertId });
            }
            catch (error) {
                console.error('Error al registrar el área/servicio:', error);
                res.status(500).json({ message: 'Error al registrar el área/servicio' });
            }
        });
    }
    modificarArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connection_1.default.query('UPDATE area SET ? WHERE id = ?', [req.body, id]);
                res.json({ message: 'El área/servicio ha sido actualizado' });
            }
            catch (error) {
                console.error('Error al modificar el área/servicio:', error);
                res.status(500).json({ message: 'Error al modificar el área/servicio' });
            }
        });
    }
    eliminarArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connection_1.default.query('DELETE FROM area WHERE id = ?', [id]);
                res.json({ message: 'El área/servicio ha sido eliminada' });
            }
            catch (error) {
                console.error('Error al eliminar el área/servicio:', error);
                res.status(500).json({ message: 'Error al eliminar el área/servicio' });
            }
        });
    }
}
exports.areaController = new AreaController();
exports.default = exports.areaController;
