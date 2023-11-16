import {mongoose} from '../database/mongoose'
const {Schema} = mongoose;

const ocorrenciaSchema = new Schema({
    titulo: String,
    descricao: String,
    data: Date,
    hora: String,
    tipo: {
        type: String,
        enum: ['Assalto', 'Furto', 'Outros'],
        default:  'Assalto' 
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