import { Request, Response } from "express"
import servicoOcorrencia from '../service/servicoOcorrencia';
import {TipoOcorrencia} from '../model/Ocorrencia'
import INovaOcorrencia from "../interfaces/INovaOcorrencia";

export default {
  listar: async function (req: Request, res: Response) {
    const horario = req.query.horario as string
    const tipo = req.query.tipo as string
    const ocorrencias = await servicoOcorrencia.listar(horario, tipo);
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
  atualizar: async function(req: Request, res: Response) {
    const {id} = req.params
    const dadosOcorrencia:INovaOcorrencia = {id, ...req.body}

    if (!Object.values(TipoOcorrencia).includes(dadosOcorrencia.tipo) && !!dadosOcorrencia.tipo) {
      return res.status(400).json({ error: "Tipo de ocorrência inválido" });
    }
    try{
      const ocorrencia= await servicoOcorrencia.atualizar(dadosOcorrencia)
      res.status(200).json(ocorrencia)
    }catch(error: unknown){
      res.status(404).json({error: "ocorrencia não encontrada"})
    }
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