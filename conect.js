
const sequelize = new Sequelize('projeto01', 'postgis', 'postgis', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

async function conectar(){
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

conectar();

module.exports = sequelize;


//mapear a tabela de coisa
//tipo ponto do postgis

//criar rota de listar e inserir

class Ocorrencia extends Model<InferAttributes<Ocorrencia>, InferCreationAttributes<Ocorrencia>>{
declare id: UUID;
declare titulo: string;
declare tipo: string;
declare data: Date;
declare hora: string;
declare localizacaoGeografica: string
}

Ocorrencia.init(
{
id:{
  type: DataTypes.UUID,
  primarykey: true
},
titulo:{
  type: DataTypes.STRING,
  allownull: false
},
tipo:{
  type: DataTypes.STRING,
  allownull: false
},
data:{
  type:DataTypes.DATE,
  allownull:false
},
hora:{
  type: DataTypes.TIME,
  allownull: false
},
localizacaoGeografica:{
  type: DataTypes.GEOMETRY('POINT'),
  allownull:false
},
{
  sequelize,
  tableName: 'Ocorrencias'
}
}
)