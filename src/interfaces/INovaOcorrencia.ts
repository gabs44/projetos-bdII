
interface INovaOcorrencia {
  titulo: string;
  tipo: string;
  data: Date;
  hora: string;
  localizacaoGeografica: [latitude: number, longitude: number];
}

export default INovaOcorrencia