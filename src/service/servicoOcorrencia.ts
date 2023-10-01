import Ocorrencia from '../model/Ocorrencia';

export default {
  listar: async function(){
    try{
      const ocorrencias = await Ocorrencia.findAll() 
      return ocorrencias;
    } catch (err){
        console.log(err)
        return []
      }
    }
  }
