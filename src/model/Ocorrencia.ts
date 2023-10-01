import { UUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model, Sequelize } from "sequelize";
import { Point } from "geojson";


const sequelize = new Sequelize('projeto01', 'postgis', 'postgis', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

class Ocorrencia extends Model {
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

async function doStuffWithUserModel() {
  const newUser = await Ocorrencia.create({
    id: uuidv4(),
    tipo: "latrocínio",
    data: new Date(),
    hora: "19:40",
    localizacaoGeografica: {
      type: "Point",
      coordinates: [0, 0]
    }
  });


}

(async () => {
  await sequelize.sync();
  await doStuffWithUserModel();
})();
export default Ocorrencia;