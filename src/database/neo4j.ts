import neo4j, { Driver, AuthToken, ServerInfo, Session, Neo4jError } from 'neo4j-driver';
import DotEnv from "dotenv"

DotEnv.config();

export async function getDriver(){
  
  const URI = process.env.NEO4J_URI!;
  const USER = process.env.NEO4J_USERNAME!;
  const PASSWORD = process.env.NEO4J_PASSWORD!;
  let driver;
  console.log(URI)
  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log('Conectado com o Neo4j');
    console.log(serverInfo);
  } catch (err : unknown) {
    if(err instanceof Neo4jError){
      console.log(`Erro de conexão\n${err}\nCausa: ${err.message}`);
    } else if (err instanceof Error) {
      console.error(`Erro geral\n${err}`);
    } else {
      console.error(`Erro desconhecido\n${err}`);
    }
  }
  return driver
};
