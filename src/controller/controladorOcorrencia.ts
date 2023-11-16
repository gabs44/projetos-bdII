import { Request, Response } from "express"

import servicoOcorrencia from '../service/servicoOcorrencia';

export default {
  listar: async function (req: Request, res: Response) {
    const ocorrencias = await servicoOcorrencia.listar();
    res.json(ocorrencias)
  },
  criar: async function(req: Request, res: Response){
    const novaOcorrencia = req.body
    await servicoOcorrencia.criar(novaOcorrencia)
     .then((r: any)=>{
        res.json(r)
      }).catch((error: { message: any; }) =>{
        res.status(404).json(error.message)
      })
  },
  deletar: async function(req: Request, res: Response) {
    const {id} = req.params
    try{
      await servicoOcorrencia.deletar({id})
      res.status(200).json({message: "Ocorrência deletada com sucesso"})
    }catch(error:unknown){
      res.status(404).json({error: "Erro ao deletar"})
    }
  }
}