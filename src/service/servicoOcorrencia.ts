import { Ocorrencia } from "../model/Ocorrencia";
import { Point } from "geojson";
import IOcorrencia from "../interfaces/IOcorrencia";
import INovaOcorrencia from "../interfaces/INovaOcorrencia";
import { OcorrenciaError } from "../utils/erros";
import { getDriver } from "../database/neo4j";
import { extrairHorasPrimeirosDoisValores } from "../utils/formatarHorario";

type Params = {
  id: string;
  horario?: string
};

async function inserirOcorrenciaNeo4j(horario: string , ocorrenciaId: string, tipo: string){
  const driver = await getDriver()
  const horas = extrairHorasPrimeirosDoisValores(horario)
  let resultadoOcorrencia = await driver.executeQuery(
      `MATCH (h:Horario {startTime: '${horas}'})
      CREATE (o:Ocorrencia {
        ocorrenciaId: '${ocorrenciaId}'
      })-[:OCORREU_EM {tipo: '${tipo}'}]->(h)
      RETURN o`,
      {},
      { database: 'neo4j' }
    )
    return resultadoOcorrencia
}

async function filtrarOcorrenciaNeo4j(horario: string, tipo?: string) {
  const driver = await getDriver()
  const horas = extrairHorasPrimeirosDoisValores(horario)
  let resultadoOcorrencias = await driver.executeQuery(
    `MATCH (o:Ocorrencia)-[:OCORREU_EM]->(h:Horario)
    WHERE h.startTime = '${horas}'
    RETURN o.ocorrenciaId as ocorrenciaId
    `,
    {},
    { database: 'neo4j' }
  )
  if(tipo){
    resultadoOcorrencias = await driver.executeQuery(
      `MATCH (o:Ocorrencia)-[:OCORREU_EM]->(h:Horario {startTime: '${horario}'})
      WHERE EXISTS((o)-[:OCORREU_EM {tipo: '${tipo}'}]->(h))
      RETURN o`,
      {},
      { database: 'neo4j' }
    )
  }
  const ocorrencias = resultadoOcorrencias.records.map(record => {
    return record.get('ocorrenciaId');
  });
return ocorrencias
}

async function removerOcorrenciaNeo4j(horario: string, ocorrenciaId: string) {
  const driver = await getDriver()
  const horas = extrairHorasPrimeirosDoisValores(horario)
      let resultadoOcorrencia = await driver.executeQuery(
          `MATCH (o:Ocorrencia {ocorrenciaId: "${ocorrenciaId}"})-[r:OCORREU_EM]-> (h:Horario {startTime: '${horas}'})
          DELETE r, o
          `,
          {},
          { database: 'neo4j' }
        )
      return resultadoOcorrencia
}

async function atualizarRelacionamentoNeo4j(novoHorario: string, velhorHorario: string, ocorrenciaId: string, tipo: string){
  const driver = await getDriver()
  const horas = extrairHorasPrimeirosDoisValores(velhorHorario)
  const novasHoras = extrairHorasPrimeirosDoisValores(novoHorario)
  await driver.executeQuery(
      `MATCH (o:Ocorrencia {ocorrenciaId: "${ocorrenciaId}"})-[r:OCORREU_EM]-> (h:Horario {startTime: '${horas}'})
      DELETE r
      `,
      {},
      { database: 'neo4j' }
    )
  await driver.executeQuery(
    `MATCH (o:Ocorrencia {ocorrenciaId: '${ocorrenciaId}'}), (h:Horario {startTime: '${novasHoras}'})
    CREATE (o)-[:OCORREU_EM {tipo: '${tipo}}'}]->(h)
    `,
      {},
      { database: 'neo4j' }
    )

}
export default {
  listar: async function (horario?: string, tipo?: string): Promise<IOcorrencia[]> {
    if(horario){
      if(tipo){
        return await this.filtrar(horario, tipo)
      }
      return await this.filtrar(horario)
    }
    try {
      const ocorrencias: IOcorrencia[] = await Ocorrencia.find({}).sort({data: -1});
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
      await inserirOcorrenciaNeo4j(ocorrencia.hora, ocorrencia.id, ocorrencia.tipo)
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
      const ocorrenciaExiste = await Ocorrencia.find({ _id: id });
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
      await atualizarRelacionamentoNeo4j(atualizarOcorrencia.hora, ocorrenciaExiste[0].hora, atualizarOcorrencia.id, atualizarOcorrencia.tipo)
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
      await removerOcorrenciaNeo4j(deleteOcorrencia.hora, deleteOcorrencia.id)
      return deleteOcorrencia;
    } catch (err) {
      throw err;
    }
  }, filtrar: async(horario: string, tipo?: string ) =>{
      try {
        const ocorrenciasFiltradas = await filtrarOcorrenciaNeo4j(horario as string, tipo);

        const ocorrencias = await Promise.all(
          ocorrenciasFiltradas.map(async (element) => {
            const busca = await Ocorrencia.findOne({ _id: element });
            return busca;
          })
        );
        
        return ocorrencias;
      } catch (error) {
        return []
      }

  }
};
