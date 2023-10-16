# Disciplina de Banco de Dados 2 (BD2)
## Grupo
- [Gabriella Braga](https://github.com/gabs44)
- [Maria Clara](https://github.com/marysclair)
## Primeiro projeto

### Esse projeto foi desenvolvido com o objetivo de criar uma aplicação para persistir e listar (ou buscar) dados de ocorrências policiais.

## Executando
### Para executar o backend desse projeto (este repositório), é necessário possuir o Docker Desktop instalado no seu computador

1. Caso não possua o Docker, é possível realizar a instalação atráves do site oficial, de acordo com o seu sistema operacional.
[Instalar aqui](https://www.docker.com/products/docker-desktop/)

2. Clone esse repositório em um diretório na sua máquina
```
git clone https://github.com/gabs44/projeto1-bdII.git
```
3. Por fim, execute os seguintes comandos no terminal. Certifique-se de que o Docker Desktop está em execução.

```
cd env
docker-compose up
```
## Documentação

Todas as rotas da aplicação podem ser acessadas com o prefixo `/ocorrencias`.

### Ocorrências

URL | Método | Descrição 
------|------------|-----
/ocorrencias | POST | Recurso de criação de ocorrência, espera um json no corpo da requisição
/ocorrencias | GET | Recurso de listagem de ocorrência, lista todos as ocorrências registradas.


