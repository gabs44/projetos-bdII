import { UUID, randomUUID } from 'crypto';
import Ocorrencia from '../model/Ocorrencia';
import { Point } from 'geojson';
import IOcorrencia from '../interfaces/IOcorrencia';
import INovaOcorrencia from '../interfaces/INovaOcorrencia';

export default {
  listar: async function():Promise<IOcorrencia[]>{
    try{
      const ocorrencias:IOcorrencia[] = await Ocorrencia.findAll() 
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
      const novoId: UUID = randomUUID()
      const ocorrencia = Ocorrencia.build({
        id: novoId,
        titulo: novaOcorrencia.titulo,
        tipo: novaOcorrencia.tipo,
        data: novaOcorrencia.data,
        hora: novaOcorrencia.hora,
        localizacaoGeografica: ponto

      })
      await ocorrencia.save()
      if(ocorrencia){
        return ocorrencia;
      }
      throw new Error('Algo deu errado')
    
  }
}
