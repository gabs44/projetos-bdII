import express from 'express'
const router = express.Router()
import controladorOcorrencia from "../controller/controladorOcorrencia"


router.get('/ocorrencias', controladorOcorrencia.listar)
router.post('/ocorrencias', controladorOcorrencia.criar)
router.delete('/ocorrencias/:id', controladorOcorrencia.deletar)


export default router 