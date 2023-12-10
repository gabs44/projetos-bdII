import { Ocorrencia } from "../model/Ocorrencia";
import { Point } from "geojson";
import IOcorrencia from "../interfaces/IOcorrencia";
import INovaOcorrencia from "../interfaces/INovaOcorrencia";
import { OcorrenciaError } from "../utils/erros";
import { getDriver } from "../database/neo4j";
import { extrairHorasPrimeirosDoisValores } from "../utils/formatarHorario";

type Params = {
  id: string;
};

async function inserirOcorrenciaNeo4j(horario: string , ocorrenciaId: string){
  const driver = await getDriver()
  const horas = extrairHorasPrimeirosDoisValores(horario)
  let resultadoOcorrencia = await driver.executeQuery(
      `MATCH (h:Horario {startTime: '${horas}'})
      CREATE (o:Ocorrencia {
        ocorrenciaId: '${ocorrenciaId}'
      })-[:OCORREU_EM]->(h)
      RETURN o`,
      {},
      { database: 'neo4j' }
    )
    return resultadoOcorrencia
}

export default {
  listar: async function (): Promise<IOcorrencia[]> {
    try {
      const ocorrencias: IOcorrencia[] = await Ocorrencia.find({}).sort({data: -1});
      console.log(ocorrencias)
      return ocorrencias;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  criar: async (novaOcorrencia: INovaOcorrencia) => {
    const localizacaoGeografica = novaOcorrencia.localizacaoGeografica;
    const ponto: Point = {
      type: "Point",
      coordinates: localizacaoGeografica,
    };
    const ocorrencia = await Ocorrencia.create({
      titulo: novaOcorrencia.titulo,
      tipo: novaOcorrencia.tipo,
      data: novaOcorrencia.data,
      hora: novaOcorrencia.hora,
      localizacaoGeografica: ponto,
    });
    if (ocorrencia) {
      inserirOcorrenciaNeo4j(ocorrencia.hora, ocorrencia.id)
      return ocorrencia;
    }
    throw new Error("Algo deu errado");
  },
  atualizar: async ({
    id,
    titulo,
    tipo,
    data,
    hora,
    localizacaoGeografica,
  }: INovaOcorrencia) => {
    try {
      const ocorrenciaExiste = await Ocorrencia.find({ id });
      if (!ocorrenciaExiste) {
        throw new OcorrenciaError("Ocorrencia não existe");
      }
      const ponto: Point = {
        type: "Point",
        coordinates: localizacaoGeografica,
      };
      const atualizarOcorrencia = await Ocorrencia.findByIdAndUpdate(
        id,
        { titulo, tipo, data, hora, localizacaoGeografica:ponto },
        { new: true }
      );
      return atualizarOcorrencia;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },
  deletar: async ({ id }: Params) => {
    try {
      const ocorrenciaExiste = await Ocorrencia.find({ id });
      if (!ocorrenciaExiste) {
        throw new OcorrenciaError("Ocorrencia não existe");
      }
      const deleteOcorrencia = await Ocorrencia.findByIdAndDelete(id);
      return deleteOcorrencia;
    } catch (err) {
      throw err;
    }
  },
};
