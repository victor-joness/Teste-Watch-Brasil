# Teste Watch Brasil

> Descrição curta do seu projeto

## Índice

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [API](#api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

O **Nome do Projeto** é uma aplicação desenvolvida para **[descrição do propósito e objetivos do projeto]**. Ele permite aos usuários **[explicar brevemente o que o projeto faz]**.

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

### **Frontend**:
- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn VUE](https://www.shadcn-vue.com/)
- [Axios](https://axios-http.com/)

### **Backend**:
- [Node.js](https://nodejs.org/)
- Utilizado o Node.JS como linguagem do Backend.
- [Express.js](https://expressjs.com/)
- Utilizado o Express.js por conta da sua flexíbilidade. 
- [Drizzle ORM](https://www.drizzle.team/)
- Utilizado o Drizzle para tornar o desenvolvimento mais rápido, já que a maioria das queries sql era de CRUD.

### **Arquitetura**:
A arquitetura do projeto segue o padrão Controller -> Service -> Repository, que ajuda a organizar a aplicação de maneira eficiente e modular. Abaixo, você pode ver um diagrama que ilustra como essas camadas se comunicam entre si para garantir a separação de responsabilidades e promover uma estrutura mais limpa e escalável.
Esse padrão permite que a lógica de controle, a lógica de negócios e a manipulação de dados sejam mantidas em camadas distintas, facilitando a manutenção, testes e futuras expansões do sistema.
Além disso, foi utilizado principios de SOLID.

### **Observabilidade**:
- [OpenTelemetry]()
Framework open-source para coleta de métricas e traces, permitindo rastrear o desempenho da aplicação e entender o comportamento do sistema.
- [Jaeger]()
Sistema de rastreamento distribuído, utilizado para coletar, armazenar e visualizar traces de requisições, facilitando o diagnóstico de problemas de desempenho.
- [Grafana]()
Plataforma de visualização de dados para análise de métricas, utilizada para criar dashboards em tempo real a partir das métricas coletadas pela aplicação.
O monitoramento das métricas da API foi configurado através do Grafana, com dashboards que monitoram 4 métricas principais. Os dados são coletados a partir do Prometheus.
Para visualizar as métricas, basta executar o docker-compose e acessar a aplicação na porta 3000.
- [Prometheus]()
Sistema de monitoramento e alerta baseado em métricas. Utilizado para coletar métricas da aplicação e disponibilizá-las para visualização no Grafana.
Para acessar os dados, execute o docker-compose e abra a aplicação na porta 9090.

### **Banco de Dados**:
- [PostgreSQL](https://www.postgresql.org/)
- Utilizado o banco de dados relacional PostgreSQL.
- Os scripts de migração das tabelas pode ser obetido com o comando npm run migrate:generate
- Depois foi executado manualmente no PGADMIN4.

### **Docker**:
- Foi utilizado o Docker para containerizar as aplicações, garantindo um ambiente isolado e fácil de gerenciar. O docker-compose é usado para orquestrar os containers, e todas as 6 aplicações do projeto são executadas em containers separados, tornando o ambiente de desenvolvimento e produção mais simples e escalável.

### **Swagger**:
- Toda a API foi documentada no SWAGGER.
- Para acessar utilize a porta http://localhost:5005/api/docs

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

### Clonando o repositório

bash
git clone https://github.com/seuusuario/seuprojeto.git
cd

## Instalação
# Para o frontend
cd Frontend
npm install

# Para o backend
cd Backend
npm install

## Telas

- Todas as telas estão responsivas e tem o tema preto e branco.

#Home
- Primeira tela da aplicação, a onde o user pode escolher entre fazer login ou register

#Login
- Tela de login da aplicação

#Register
- Tela de Regfister da aplicação

#Tela de Dashboard
- Tela que tras alguns relatorios simples do sistema de tarefas.

#Tela de Tarefas
- Tela a onde vemos a listagem de tarefas daquele usuario, podendo adicionar novas, editar ou excluir.
- Possibilidade de compartilhar tarefas entre usuarios.

#Tela de Categoria
- Tela a onde vemos a listagem de categorias daquele usuario, podendo adicionar novas, editar ou excluir.

