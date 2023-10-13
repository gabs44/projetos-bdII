import { UUID } from "crypto";
import { Point } from "geojson";

interface IOcorrencia {
  id: UUID,
  titulo: string,
  tipo: string;
  data: Date;
  hora: string;
  localizacaoGeografica: Point;
}

export default IOcorrencia