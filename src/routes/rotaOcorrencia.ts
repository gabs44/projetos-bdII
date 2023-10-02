import express from 'express'
const router = express.Router()
import controladorOcorrencia from "../controller/controladorOcorrencia"


router.get('/ocorrencias', controladorOcorrencia.listar)
router.post('/ocorrencias', controladorOcorrencia.criar)

export default router 