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
exports.mantenimientoController = void 0;
const connection_1 = __importDefault(require("../connection"));
const nodemailer = require("nodemailer");
class MantenimientoController {
    // Obtener mantenimientos por área
    obtenerMantenimientosArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArea } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.id, m.nombre, m.descripcion, m.fechaRegistro, CASE m.aceptado WHEN 0 THEN 'Pendiente' WHEN 1 THEN 'Aceptado' END AS aceptado, m.costo, m.estadoPago, CASE m.finalizado WHEN 0 THEN 'Pendiente' WHEN 1 THEN 'Finalizado' END AS finalizado, m.fechaFin, concat(e.nombre,' ',e.apePaterno,' ',e.apeMaterno) as empleado  FROM mantenimiento as m INNER JOIN usuario as e ON e.id = m.empleadoFk WHERE m.areaFk = ? ORDER BY m.fechaRegistro DESC", [idArea]);
            res.json(mantenimientos);
        });
    }
    // Obtener mantenimientos completados para cliente y empleado
    obtenerMentenimientosCompletosCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(e.nombre,' ',e.apePaterno,' ',e.apeMaterno) as empleado FROM mantenimiento as m INNER JOIN usuario as e ON m.empleadoFk = e.id INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk WHERE usuarioFk = ? AND finalizado = 1 ORDER BY m.aceptado DESC, m.fechaFin DESC;", [idCliente]);
            res.json(mantenimientos);
        });
    }
    obtenerMentenimientosCompletosEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEmpleado } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(c.nombre,' ',c.apePaterno,' ',c.apeMaterno) as cliente FROM mantenimiento as m  INNER JOIN usuario as c ON m.usuarioFk = c.id INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk WHERE empleadoFk = ? AND finalizado = 1 ORDER BY m.aceptado DESC, m.fechaFin DESC;", [idEmpleado]);
            res.json(mantenimientos);
        });
    }
    // Obtener mantenimientos incompletos para cliente y empleado
    obtenerMentenimientoIncompletosCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(e.nombre,' ',e.apePaterno,' ',e.apeMaterno) as empleado FROM mantenimiento as m INNER JOIN usuario as e ON m.empleadoFk = e.id INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk WHERE m.usuarioFk = ? and m.finalizado = 0 and aceptado = 1 ORDER BY m.aceptado DESC, m.fechaFin ASC;", [idCliente]);
            res.json(mantenimientos);
        });
    }
    obtenerMentenimientosIncompletosEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEmpleado } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(c.nombre,' ',c.apePaterno,' ',c.apeMaterno) as cliente FROM mantenimiento as m INNER JOIN usuario as c ON m.usuarioFk = c.id INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk WHERE empleadoFk = ? AND finalizado = 0 AND aceptado = 1 ORDER BY m.aceptado DESC, m.fechaFin ASC;", [idEmpleado]);
            res.json(mantenimientos);
        });
    }
    // Obtener solicitudes de mantenimientos
    obtenerSolicitudesCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(e.nombre,' ',e.apePaterno,' ',e.apeMaterno) as empleado FROM mantenimiento as m INNER JOIN usuario as e ON m.empleadoFk = e.id INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk WHERE usuarioFk = ? AND aceptado = 0 AND finalizado != 1 ORDER BY m.fechaRegistro DESC;", [idCliente]);
            res.json(mantenimientos);
        });
    }
    obtenerSolicitudesEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEmpleado } = req.params;
            const mantenimientos = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(c.nombre,' ',c.apePaterno,' ',c.apeMaterno) as cliente FROM mantenimiento as m INNER JOIN usuario as c ON m.usuarioFk = c.id INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk WHERE empleadoFk = ? AND aceptado = 0 AND finalizado != 1 ORDER BY m.fechaRegistro DESC;", [idEmpleado]);
            res.json(mantenimientos);
        });
    }
    // Ver detalles de un mantenimiento en específio
    verMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const mantenimiento = yield connection_1.default.query("SELECT m.*, emp.nombre as empresa, a.nombre as area, concat(c.nombre,' ',c.apePaterno,' ',c.apeMaterno) as cliente, c.email as emailCliente, c.telefono as telefonoCliente, concat(e.nombre,' ',e.apePaterno,' ',e.apeMaterno) as empleado, e.email as emailEmpleado, e.telefono as telefonoEmpleado FROM mantenimiento as m INNER JOIN usuario as c ON m.usuarioFk = c.id  INNER JOIN area as a ON a.id = m.areaFk INNER JOIN empresa as emp ON emp.id = a.empresaFk INNER JOIN usuario as e ON e.id = m.empleadoFk WHERE m.id = ?;", [id]);
            if (mantenimiento.length > 0) {
                return res.json(mantenimiento[0]);
            }
            res.status(404).json({ text: "El mantenimiento no existe" });
        });
    }
    // Registrar un mantenimiento
    registrarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query('INSERT INTO mantenimiento SET ?', [req.body]);
                res.status(201).json({ message: 'Se registró el mantenimiento correctamente', insertedId: result.insertId });
            }
            catch (error) {
                console.error('Error al registrar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al registrar el mantenimiento' });
            }
        });
    }
    // Modificar un mantenimiento
    modificarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connection_1.default.query('UPDATE mantenimiento SET ? WHERE id = ?', [req.body, id]);
                res.json({ message: 'El mantenimiento ha sido actualizado' });
            }
            catch (error) {
                console.error('Error al modificar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al modificar el mantenimiento' });
            }
        });
    }
    // Aceptar un mantenimiento
    aceptarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, costo, fechaFin } = req.params;
                // Actualizar el mantenimiento
                yield connection_1.default.query("UPDATE mantenimiento SET aceptado = 1, costo = ?, estadoPago = 'Pendiente', fechaFin = ? WHERE id = ?", [costo, fechaFin, id]);
                // Obtener el email y el nombre del usuario
                const [rows] = yield connection_1.default.query("SELECT u.email, concat(u.nombre,' ',u.apePaterno,' ',u.apeMaterno) as cliente, m.nombre as mantenimiento FROM usuario u INNER JOIN mantenimiento m ON u.id = m.usuarioFk WHERE m.id = ?", [id]);
                if (rows) {
                    const email = rows.email;
                    const nombre = rows.cliente; // Cambié 'nombre' por 'cliente' para reflejar el alias en la consulta
                    const mantenimiento = rows.mantenimiento;
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "agendajart@gmail.com",
                            pass: "hrwp tjwr emfp hwqz",
                        },
                    });
                    const mailOptions = {
                        from: "agendajart@gmail.com",
                        to: email,
                        subject: "¡Tu mantenimiento ha sido aceptado!",
                        html: `<H2>¡Hola ${nombre}!, un gusto vernos de nuevo.</H2>
                       <p>Tu mantenimiento llamado "${mantenimiento}" ha sido aceptado.</p>
                       <p>Te recomendamos realizar el pago de tu mantenimiento para que el empleado asignado realice el mantenimiento lo antes posible.</p>`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error("Error al enviar el correo electrónico:", error);
                            return res.status(500).json({ message: "Error al enviar el correo electrónico" });
                        }
                        else {
                            console.log("Correo electrónico enviado: " + info.response);
                            return res.status(200).json({ message: "El mantenimiento ha sido aceptado y se ha enviado la notificación al cliente" });
                        }
                    });
                }
                else {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
            catch (error) {
                console.error('Error al aceptar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al aceptar el mantenimiento' });
            }
        });
    }
    // Rechazar un mantenimiento
    rechazarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Actualizar el mantenimiento
                yield connection_1.default.query("UPDATE mantenimiento SET aceptado = 0, costo = 0, estadoPago = 'Pagado', finalizado = 1, fechaFin = CURDATE() WHERE id = ?", [id]);
                // Obtener el email y el nombre del usuario
                const [rows] = yield connection_1.default.query("SELECT u.email, concat(u.nombre, ' ', u.apePaterno, ' ', u.apeMaterno) as cliente, m.nombre as mantenimiento FROM usuario u INNER JOIN mantenimiento m ON u.id = m.usuarioFk WHERE m.id = ?", [id]);
                if (rows) {
                    const email = rows.email;
                    const nombre = rows.cliente; // Alias cliente usado en la consulta
                    const mantenimiento = rows.mantenimiento;
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "agendajart@gmail.com",
                            pass: "hrwp tjwr emfp hwqz",
                        },
                    });
                    const mailOptions = {
                        from: "agendajart@gmail.com",
                        to: email,
                        subject: "Tu mantenimiento ha sido rechazado",
                        html: `<H2>Hola ${nombre},</H2>
                           <p>Lamentamos informarte que tu mantenimiento llamado "${mantenimiento}" ha sido rechazado.</p>
                           <p>Te recomendamos buscar otras opciones para que recibas tu mantenimiento</p>`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error("Error al enviar el correo electrónico:", error);
                            return res.status(500).json({ message: "Error al enviar el correo electrónico" });
                        }
                        else {
                            console.log("Correo electrónico enviado: " + info.response);
                            return res.status(200).json({ message: "El mantenimiento ha sido rechazado y se ha enviado la notificación al cliente" });
                        }
                    });
                }
                else {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
            catch (error) {
                console.error('Error al rechazar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al rechazar el mantenimiento' });
            }
        });
    }
    // Cancelar un manteniminto
    cancelarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Actualizar el mantenimiento
                yield connection_1.default.query("UPDATE mantenimiento SET aceptado = 0, costo = 0, estadoPago = 'Pagado', finalizado = 1, fechaFin = CURDATE() WHERE id = ?", [id]);
                // Obtener el email y el nombre del usuario
                const [rows] = yield connection_1.default.query("SELECT u.email, concat(u.nombre, ' ', u.apePaterno, ' ', u.apeMaterno) as cliente, m.nombre as mantenimiento FROM usuario u INNER JOIN mantenimiento m ON u.id = m.usuarioFk WHERE m.id = ?", [id]);
                if (rows) {
                    const email = rows.email;
                    const nombre = rows.cliente; // Alias cliente usado en la consulta
                    const mantenimiento = rows.mantenimiento;
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "agendajart@gmail.com",
                            pass: "hrwp tjwr emfp hwqz",
                        },
                    });
                    const mailOptions = {
                        from: "agendajart@gmail.com",
                        to: email,
                        subject: "Tu mantenimiento ha sido cancelado",
                        html: `<H2>Hola ${nombre},</H2>
                           <p>Lamentamos informarte que tu mantenimiento llamado "${mantenimiento}" ha sido cancelado por el empleado asignado.</p>
                           <p>Te recomendamos buscar otras opciones para que recibas tu mantenimiento</p>`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error("Error al enviar el correo electrónico:", error);
                            return res.status(500).json({ message: "Error al enviar el correo electrónico" });
                        }
                        else {
                            console.log("Correo electrónico enviado: " + info.response);
                            return res.status(200).json({ message: "El mantenimiento ha sido cancelado y se ha enviado la notificación al cliente" });
                        }
                    });
                }
                else {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
            catch (error) {
                console.error('Error al rechazar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al rechazar el mantenimiento' });
            }
        });
    }
    // Terminar un mantenimiento
    terminarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Actualizar el mantenimiento
                yield connection_1.default.query("UPDATE mantenimiento SET finalizado = 1, fechaFin = CURDATE() WHERE id = ?", [id]);
                // Obtener el email y el nombre del usuario
                const [rows] = yield connection_1.default.query("SELECT u.email, concat(u.nombre, ' ', u.apePaterno, ' ', u.apeMaterno) as cliente, m.nombre as mantenimiento FROM usuario u INNER JOIN mantenimiento m ON u.id = m.usuarioFk WHERE m.id = ?", [id]);
                if (rows) {
                    const email = rows.email;
                    const nombre = rows.cliente; // Alias cliente usado en la consulta
                    const mantenimiento = rows.mantenimiento;
                    const transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "agendajart@gmail.com",
                            pass: "hrwp tjwr emfp hwqz",
                        },
                    });
                    const mailOptions = {
                        from: "agendajart@gmail.com",
                        to: email,
                        subject: "Mantenimiento terminado",
                        html: `<H2>Hola ${nombre},</H2>
                           <p>Te informamos que tu mantenimiento llamado "${mantenimiento}" ha sido terminado satisfactoriamente.</p>`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error("Error al enviar el correo electrónico:", error);
                            return res.status(500).json({ message: "Error al enviar el correo electrónico" });
                        }
                        else {
                            console.log("Correo electrónico enviado: " + info.response);
                            return res.status(200).json({ message: "El mantenimiento ha sido terminado y se ha enviado la notificación al cliente" });
                        }
                    });
                }
                else {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
            catch (error) {
                console.error('Error al terminar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al terminar el mantenimiento' });
            }
        });
    }
    eliminarMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield connection_1.default.query('DELETE FROM mantenimiento WHERE id = ?', [id]);
                res.json({ message: 'El mantenimiento ha sido eliminada' });
            }
            catch (error) {
                console.error('Error al eliminar el mantenimiento:', error);
                res.status(500).json({ message: 'Error al eliminar el mantenimiento' });
            }
        });
    }
}
exports.mantenimientoController = new MantenimientoController();
exports.default = exports.mantenimientoController;
