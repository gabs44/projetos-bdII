import express from "express";
import cors from 'cors';
import routes from './routes/index';
const app = express();
app.use(cors());
app.use(express.json())
app.use(routes)


app.listen(4444, ()=>{
  console.log('servidor rodando na porta 4444')
})
