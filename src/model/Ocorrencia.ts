import {mongoose} from '../database/mongoose'
const {Schema} = mongoose;

export enum TipoOcorrencia {
  ASSALTO = 'Assalto',
  FURTO = 'Furto',
  OUTROS = 'Outros',
}

const ocorrenciaSchema = new Schema({
    titulo: String,
    descricao: String,
    data: Date,
    hora: String,
    tipo: {
      type: String,
      enum: Object.values(TipoOcorrencia),
      default: TipoOcorrencia.ASSALTO,
    },
    localizacaoGeografica: {
        type: {
          type: String,
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

export const Ocorrencia = mongoose.model('Ocorrência', ocorrenciaSchema);