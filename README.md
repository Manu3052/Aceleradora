# Api Marcação de consultas

Essa api têm como objetivo marcar consultas de seus devidos pacientes.

## Sobre o projeto:

Essa api possui uma arquitetura modular, ou seja, respeita a arquitetura sugerida pelo nest.js, trazendo velocidade e melhor aproveitamento da tecnologia escolhida, outro ponto interessante é notar que é utilizado injeção de dependência afim de facilitar a comunicação entre modulos diferentes.

### Tecnologias:

    - Node
    - Nest
    - Jest
    - Schema
    - Prisma
    - Sqlite


### Arquitetura:
    - Modular
    - Comunicação entre camadas feita através de DTOs
    - Testes unitários
    - Interfaces
    - Api Rest (Request e Response feitos através de Json)
    - Aplicação do conceito Single Responsability do Solid

## Como rodar?

Copie e cole os comandos abaixo:

`
    cd backend
    npm run start:prod
`

## Como rodar os testes?

Os testes foram feitos utilizando Jest, para roda-los utilize:

`
    npm run test
`

## Documentação e schema

Possuindo a documentação feita através de docstrings estilo google-style a api também possui acesso direto as rotas utilizando schema, basta rodar seu servidor e acessar através do link: http://localhost:8000/api

## Como testar a api?

Por não possuir um cliente ou interface, o teste da api pode ser feito através do próprio Swagger
