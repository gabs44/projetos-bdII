import express, {Request, Response} from "express";
const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
  res.send('olá')
})


app.listen(4444, ()=>{
  console.log('servidor rodando na porta 4444')
})
