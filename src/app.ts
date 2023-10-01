import express, {Request, Response} from "express";
import Ocorrencia from './model/Ocorrencia'
const app = express();
app.use(express.json())
import routes from './routes/index';
app.use(routes)


app.get('/', (req: Request, res: Response)=>{
  res.send(Ocorrencia.findAll())
})


app.listen(4444, ()=>{
  console.log('servidor rodando na porta 4444')
})
