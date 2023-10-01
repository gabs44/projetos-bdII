import { Request, Response } from "express"

import servicoOcorrencia from '../service/servicoOcorrencia';

export default {
  listar: async function (req: Request, res: Response) {
    const ocorrencias = await servicoOcorrencia.listar();
    res.json(ocorrencias)
  }
}