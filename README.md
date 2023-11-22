# Disciplina de Banco de Dados 2 (BD2)
## Grupo
- [Gabriella Braga](https://github.com/gabs44)
- [Maria Clara](https://github.com/marysclair)
## Segundo projeto

### O projeto foi desenvolvido com o objetivo de criar uma aplicação para persistir, listar, atualizar e excluir dados de ocorrências policiais, utilizando MongoDB Atlas e Mongo Charts.


#### Para utilizar esse projeto, crie um arquivo ```.env``` com a variável de ambiente no formato abaixo e preencha com a url do seu MongoDB Atlas
```
MONGO_URL = 
```

## Documentação


### Ocorrências

URL | Método | Descrição 
------|------------|-----
/ocorrencias | POST | Recurso de criação de ocorrência, espera um json no corpo da requisição
/ocorrencias | GET | Recurso de listagem de ocorrência, lista todos as ocorrências registradas.
/ocorrencias/:id | PATCH | Recurso de atualização de ocorrências, espera um json no corpo da requisição e recebe o id do recurso como parâmetro.
/ocorrencias/:id | DELETE | Recurso de exclusão de ocorrências que recebe um id como parâmetro


#### A entidade ocorrência possui a seguinte interface
```typescript

enum TipoOcorrencia {
  ASSALTO = 'Assalto',
  FURTO = 'Furto',
  OUTROS = 'Outros',
}

interface INovaOcorrencia {
  id?: string,
  titulo: string;
  tipo: TipoOcorrencia;
  data: Date;
  hora: string;
  localizacaoGeografica: [latitude: number, longitude: number];
}
```
Para acessar o frontend desse projeto, acesse este [repositório](https://github.com/marysclair/Projeto-1-BANCO-II)
