import express, {Request, Response} from "express";
import User from './model/User'
const app = express();
app.use(express.json())


app.get('/', (req: Request, res: Response)=>{
  res.send(User.findAll())
})


app.listen(4444, ()=>{
  console.log('servidor rodando na porta 4444')
})
