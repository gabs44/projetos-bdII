import { UUID } from "crypto";
import sequelize from "../database/sequelize";
import { DataTypes, Model } from "sequelize";
import { Point } from "geojson";
import IOcorrencia from "../interfaces/IOcorrencia";


class Ocorrencia extends Model implements IOcorrencia {
  declare titulo: string;
  declare id: UUID;
  declare tipo: string;
  declare data: Date;
  declare hora: string;
  declare localizacaoGeografica: Point;
}

Ocorrencia.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora:{
      type: DataTypes.STRING,
      allowNull:false
    },
    localizacaoGeografica:{
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    }
  },
  {
    tableName: 'ocorrencias',
    sequelize, // passing the `sequelize` instance is required
  },
);


(async () => {
  await sequelize.sync();
})();
export default Ocorrencia;