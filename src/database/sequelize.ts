const { Sequelize } = require('sequelize');

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


