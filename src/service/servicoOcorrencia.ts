import { UUID, randomUUID } from 'crypto';
import {Ocorrencia} from '../model/Ocorrencia';
import { Point } from 'geojson';
import IOcorrencia from '../interfaces/IOcorrencia';
import INovaOcorrencia from '../interfaces/INovaOcorrencia';
import { OcorrenciaError } from "../utils/erros";

type Params = {
  id: string
}

export default {
  listar: async function():Promise<IOcorrencia[]>{
    try{
      const ocorrencias:IOcorrencia[] = await Ocorrencia.find() 
      return ocorrencias;
    } catch (err){
        console.log(err)
        return []
      }
    },
    criar: async(novaOcorrencia: INovaOcorrencia) =>{
      const localizacaoGeografica = novaOcorrencia.localizacaoGeografica
      const ponto: Point = {
        type: "Point",
        coordinates: localizacaoGeografica
      }
      const ocorrencia = await Ocorrencia.create({
        titulo: novaOcorrencia.titulo,
        tipo: novaOcorrencia.tipo,
        data: novaOcorrencia.data,
        hora: novaOcorrencia.hora,
        localizacaoGeografica: ponto
      })
      if(ocorrencia){
        return ocorrencia;
      }
      throw new Error('Algo deu errado')
    
  },
  deletar: async({id} : Params)=>{
    try{
      const ocorrenciaExiste = await Ocorrencia.find({id})
      if (!ocorrenciaExiste) {
        throw new OcorrenciaError('Ocorrencia não existe');
      }
        const deleteOcorrencia = await Ocorrencia.findByIdAndDelete(id)
      return deleteOcorrencia
    }catch(err){
      throw err
    }
  }
}
