import { Request, Response, text } from 'express';

import pool from '../connection';

class EmpresaController{

  // Obtener todas las empresas
  public async obtenerEmpresas (req: Request, res: Response){
      const empresas = await pool.query('SELECT * FROM empresa');
      res.json(empresas);
  }

  // Obtener solo una empresa
  public async verEmpresa (req: Request, res: Response){
      const { id } = req.params
      const empresa = await pool.query('SELECT * FROM empresa WHERE id = ?',[id]);
      res.json(empresa);
      if (empresa.length > 0) {
        return res.json(empresa[0]);
      }
      res.status(404).json({ text: "La empresa no existe" });
  }

  // Registrar empresa
  public async registrarEmpresa(req: Request, res: Response): Promise<void> {
      try {
        const result = await pool.query('INSERT INTO empresa SET ?',[req.body]);
        res.status(200).json({ message: 'Se registró la empresa correctamente', insertedId: result.insertId });
      } catch (error) {
        console.error('Error al registrar la empresa:', error);
        res.status(500).json({ message: 'Error al registrar la empresa' });
      }
  }
  
  // Modificar empresa
  public async modificarEmpresa(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        await pool.query('UPDATE empresa SET ? WHERE id = ?', [req.body, id]);
        res.json({ message: 'La empresa ha sido actualizado' });
      } catch (error) {
        console.error('Error al modificar la empresa:', error);
        res.status(500).json({ message: 'Error al modificar la empresa' });
      }
  }

  // Eliminar empresa
  public async eliminarEmpresa(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        await pool.query('DELETE FROM empresa WHERE id = ?', [id]);
        res.json({ message: 'La empresa ha sido eliminada' });
      } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        res.status(500).json({ message: 'Error al eliminar la empresa' });
      }
  }
}

export const empresaController = new EmpresaController();
export default empresaController;