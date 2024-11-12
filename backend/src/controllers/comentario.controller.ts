import { Request, Response, text } from 'express';

import pool from '../connection';

class ComentarioController{

    public async obtenerComentarios (req: Request, res: Response){
        const { idMantenimiento } = req.params
        const areas = await pool.query('SELECT * FROM comentario WHERE mantenimientoFk = ?',[idMantenimiento]);
        res.json(areas);
    }

    public async verComentario (req: Request, res: Response){
      const { id } = req.params;
      const area = await pool.query('SELECT * FROM comentario WHERE id = ?',[id]);
      if (area.length > 0) {
          return res.json(area[0]);
        }
        res.status(404).json({ text: "El comentario no existe" });
    }

    public async registrarComentario (req: Request, res: Response): Promise<void> {
        try {
          const result = await pool.query('INSERT INTO comentario SET ?',[req.body]);
          res.status(201).json({ message: 'Se registró el comentario correctamente', insertedId: result.insertId });
        } catch (error) {
          console.error('Error al registrar el comentario:', error);
          res.status(500).json({ message: 'Error al registrar el comentario' });
        }
    }
      
    // Esta madre es opcional nomás
    public async modificarComentario(req: Request, res: Response): Promise<void> {
        try {
          const { id } = req.params;
          await pool.query('UPDATE comentario SET ? WHERE id = ?', [req.body, id]);
          res.json({ message: 'El comentario ha sido actualizado' });
        } catch (error) {
          console.error('Error al modificar el comentario:', error);
          res.status(500).json({ message: 'Error al modificar el comentario' });
        }
    }
      
    public async eliminarComentario(req: Request, res: Response): Promise<void> {
        try {
          const { id } = req.params;
          await pool.query('DELETE FROM comentario WHERE id = ?', [id]);
          res.json({ message: 'El comentario ha sido eliminada' });
        } catch (error) {
          console.error('Error al eliminar el comentario:', error);
          res.status(500).json({ message: 'Error al eliminar el comentario' });
        }
    }
}

export const comentarioController = new ComentarioController();
export default comentarioController;