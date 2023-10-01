import express from 'express'
const router = express.Router()
import controladorOcorrencia from "../controller/controladorOcorrencia"
router.get('/ocorrencias', controladorOcorrencia.listar)

export default router 