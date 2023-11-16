import { TipoOcorrencia } from "../model/Ocorrencia";

interface INovaOcorrencia {
  id?: string,
  titulo: string;
  tipo: TipoOcorrencia;
  data: Date;
  hora: string;
  localizacaoGeografica: [latitude: number, longitude: number];
}



export default INovaOcorrencia