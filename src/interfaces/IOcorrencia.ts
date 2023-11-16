import { UUID } from "crypto";
import { Point } from "geojson";
import { ObjectId } from "mongodb";

interface IOcorrencia {
  _id: ObjectId,
  titulo: string,
  tipo: string;
  data: Date;
  hora: string;
  localizacaoGeografica: Point;
}

export default IOcorrencia