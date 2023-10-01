import express from 'express';
const router = express.Router()
import rotaOcorrencia from './rotaOcorrencia';

router.use(rotaOcorrencia);

export default router