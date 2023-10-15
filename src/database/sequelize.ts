require('dotenv').config();
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_DATABASE as string, process.env.PG_USER as string, process.env.PG_PASSWORD as string, {
  host: process.env.PG_HOST as string,
  dialect: 'postgres',
  port: parseInt(process.env.PG_PORT as string)
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

export default sequelize;


