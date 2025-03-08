# Teste Watch Brasil
## Índice

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [AWS](#AWS)
- [API](#api)

## Descrição

Teste para desenvolvedor FullStackJR para a Watch Brasil, solicitado o front e backend de uma sistema de tarefas.

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

### **Frontend**:
- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn VUE](https://www.shadcn-vue.com/)
- [Axios](https://axios-http.com/)

### **Backend**:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/) 
- [Drizzle ORM](https://www.drizzle.team/): Utilizado o Drizzle para tornar o desenvolvimento mais rápido, já que a maioria das queries sql era de CRUD.

### **Arquitetura**:
- A arquitetura do projeto segue o padrão Controller -> Service -> Repository, que ajuda a organizar a aplicação de maneira eficiente e modular. 
- Abaixo, tem um diagrama dessas camadas que se comunicam entre si para garantir a separação de responsabilidades e promover uma estrutura mais limpa e escalável.
- Além disso, foi utilizado principios de SOLID.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/ARQUITETURA.png"
     alt="Arquitetura"
     style="width:100%;" />

### **Observabilidade**:
- [OpenTelemetry](): Framework open-source para coleta de métricas e traces, permitindo rastrear o desempenho da aplicação e entender o comportamento do sistema.
- [Jaeger](): Sistema de rastreamento distribuído, utilizado para coletar, armazenar e visualizar traces de requisições, facilitando o diagnóstico de problemas de desempenho.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/JAEGER%2001.png"
     alt="Jaeger"
     style="width:100%;" />
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/JAEGER%2002.png"
     alt="Jaeger"
     style="width:100%;" />

- [Grafana](): Plataforma de visualização de dados para análise de métricas, utilizada para criar dashboards em tempo real a partir das métricas coletadas pela aplicação.
- O monitoramento das métricas da API foi configurado através do Grafana, com dashboards que monitoram 4 métricas principais. Os dados são coletados a partir do Prometheus.
- Para visualizar as métricas, basta executar o docker-compose e acessar a aplicação na porta 3000.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/GRAFANA%2001.png"
     alt="Grafana"
     style="width:100%;" />

- [Prometheus](): Sistema de monitoramento e alerta baseado em métricas. Utilizado para coletar métricas da aplicação e disponibilizá-las para visualização no Grafana.
- Para acessar os dados, execute o docker-compose e abra a aplicação na porta 9090.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/PROMETHEUS%2001.png"
     alt="Prometheus"
     style="width:100%;" />

### **Banco de Dados**:
- [PostgreSQL](https://www.postgresql.org/)
- Os scripts de migração das tabelas podem ser obtidos com o comando npm run migrate:generate
- Depois foi executado manualmente no PGADMIN4.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/POSTGRESS%2001.png"
     alt="Postgress"
     style="width:100%;" />

### **Docker**:
- Foi utilizado o Docker para containerizar as aplicações, garantindo um ambiente isolado e fácil de gerenciar. O docker-compose é usado para orquestrar os containers, e todas as 6 aplicações do projeto são executadas em containers separados, tornando o ambiente de desenvolvimento e produção mais simples e escalável.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/DOCKER%2001%5B.png"
     alt="Docker"
     style="width:100%;" />

### **Swagger**:
- Toda a API foi documentada no SWAGGER.
- Para acessar utilize a porta http://localhost:5005/api/docs

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/SWAGGER%2001.png"
     alt="SWAGGER"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/SWAGGER%2002.png"
     alt="SWAGGER"
     style="width:100%;" />

### **Testes JEST**:

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

### Clonando o repositório

git clone [https://github.com/victor-joness/Teste-Watch-Brasil.git]

## Instalação e Starter
### Para o frontend
cd Frontend
npm install
npm run dev

### Para o backend
cd Backend
npm install
npm run dev

### Para o Docker
cd Backend
docker-compose up -d 
- Esperado 6 aplicações no docker

## Uso

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

## AWS

## Api
- A api é composta por basicamente esses endpoints (Auth, Category, Comment, Invitation, Report, Task, User).
- Feito o uso de Criptografia da senha.
- Proteção das rotas com Bearer Token + JWT

📦Routes                                                                                          
 ┣ 📜AuthRoutes.ts                                                                                      
 ┣ 📜CategoryRoutes.ts                                                                      
 ┣ 📜CommentRoutes.ts                                                                                               
 ┣ 📜InvitationRoutes.ts                                                                                          
 ┣ 📜ReportRoutes.ts                                                                 
 ┣ 📜TaskRoutes.ts                                                                                
 ┗ 📜UserRoutes.ts                                                                                                                             

