import { Request, Response, text } from 'express';

import pool from '../connection';

class AreaController{

    public async obtenerAreas (req: Request, res: Response){
        const { idEmpresa } = req.params
        const areas = await pool.query('SELECT * FROM area WHERE empresaFk = ?',[idEmpresa]);
        res.json(areas);
    }

    public async verArea (req: Request, res: Response){
      const { id } = req.params;
      const area = await pool.query('SELECT * FROM area WHERE id = ?',[id]);
      if (area.length > 0) {
          return res.json(area[0]);
        }
        res.status(404).json({ text: "El servicio/área no existe" });
    }

    public async registrarArea(req: Request, res: Response): Promise<void> {
        try {
          const result = await pool.query('INSERT INTO area SET ?',[req.body]);
          res.status(201).json({ message: 'Se registró el área/servicio correctamente', insertedId: result.insertId });
        } catch (error) {
          console.error('Error al registrar el área/servicio:', error);
          res.status(500).json({ message: 'Error al registrar el área/servicio' });
        }
    }
      
    public async modificarArea(req: Request, res: Response): Promise<void> {
        try {
          const { id } = req.params;
          await pool.query('UPDATE area SET ? WHERE id = ?', [req.body, id]);
          res.json({ message: 'El área/servicio ha sido actualizado' });
        } catch (error) {
          console.error('Error al modificar el área/servicio:', error);
          res.status(500).json({ message: 'Error al modificar el área/servicio' });
        }
    }
      
    public async eliminarArea(req: Request, res: Response): Promise<void> {
        try {
          const { id } = req.params;
          await pool.query('DELETE FROM area WHERE id = ?', [id]);
          res.json({ message: 'El área/servicio ha sido eliminada' });
        } catch (error) {
          console.error('Error al eliminar el área/servicio:', error);
          res.status(500).json({ message: 'Error al eliminar el área/servicio' });
        }
    }
}

export const areaController = new AreaController();
export default areaController;