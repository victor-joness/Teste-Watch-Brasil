# Teste Watch Brasil
## Índice

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [AWS](#aws)
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
- Abaixo, tem um diagrama dessas camadas e a comunicação entre si para garantir a separação de responsabilidades e promover uma estrutura mais limpa e escalável.
- Além disso, foi utilizado principios de SOLID.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/ARQUITETURA.png"
     alt="Arquitetura"
     style="width:100%;" />

### **Observabilidade**:
- [OpenTelemetry](): Framework open-source para coleta de métricas e traces, permitindo rastrear o desempenho da aplicação e entender o comportamento do sistema.
- [Jaeger](): Sistema de rastreamento distribuído, utilizado para coletar, armazenar e visualizar traces de requisições, facilitando o diagnóstico de problemas de desempenho.
- Acesse a porta 8081 para ver;

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
- Foi feito um teste basico de getAll<Entity> com o Jest.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/JEST%2001.png"
     alt="JEST"
     style="width:100%;" />

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

### Para o banco de dados
cd Backend                                                                                     
npm migrate:generate                                                            
exceutar o script no Pgadmin4                                                                                                                       

### Para o Docker
cd Backend                                                                      
docker-compose up -d                                                                                                          
Esperado 6 aplicações no docker                                                                                                                                                                                                                       

## Uso
- Todas as telas estão responsivas e tem o tema preto e branco.

### Home
- Primeira tela da aplicação, a onde o user pode escolher entre fazer login ou register

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20HOME.png"
     alt="HOME"
     style="width:100%;" />

### Login
- Tela de login da aplicação

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20LOGIN.png"
     alt="LOGIN"
     style="width:100%;" />

### Register
- Tela de Regfister da aplicação

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20REGISTER.png"
     alt="REGISTER"
     style="width:100%;" />

### Tela de Dashboard
- Tela de dashboard que traz alguns relatorios simples do sistema de tarefas, como por exemplo a quantidade de categorias, de tarefas, as ultimas 3 tarefas e tarefas completadas/pendentes.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20DASHBOARD.png"
     alt="DASHBOARD"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20TAREFAS%20CONCLUIDA%20%2B%20EM%20ANDAMENTO%2002.png"
     alt="TAREFAS"
     style="width:100%;" />

### Tela de Tarefas
- Tela a onde vemos a listagem de tarefas daquele usuario, podendo adicionar novas, editar ou excluir.
- Possibilidade de compartilhar tarefas entre usuarios, se um dos 2 usuairos que compartilham da mesma tarefa, finalizar ela, em ambos perfils a tarefa é finalizada.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20TAREFAS.png"
     alt="TAREFAS"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20NOVA%20TAREFA.png"
     alt="TAREFAS"
     style="width:100%;" />

### Tela de compartilhamento
- Funcionalidade de compartilhamento

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20COMPARTILHAMENTO.png"
     alt="TAREFAS"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20COMPARTILHAMENTO%2002.png"
     alt="TAREFAS"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20COMPARTILHAMENTO%2003.png"
     alt="TAREFAS"
     style="width:100%;" />

### Tela de Categoria
- Tela a onde vemos a listagem de categorias daquele usuario, podendo adicionar novas, editar ou excluir.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20CATEGORIApng.png"
     alt="TAREFAS"
     style="width:100%;" />
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20adi%C3%A7%C3%A3o%20de%20categoria.png"
     alt="TAREFAS"
     style="width:100%;" />

### Tela de Listagem de todas tarefas
- Tela a onde vemos a listagem de de todas as tarefas do sistema, com informações de titulo, status, prioridade e porcentagem de andamento da tarefa.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20LISTAGEM%20DE%20TAREFAS.png"
     alt="TAREFAS"
     style="width:100%;" />

### Tela de Usuarios
- Tela a onde podemos ver informações do usuario, fazer edição ou excluir.
- Se for um user ADMIN, é possivel ver informações de todos os usuarios, mas não editar.

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20USUARIO.png"
     alt="TAREFAS"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20USUARIO%20ADMIN.png"
     alt="TAREFAS"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20USUARIO%20EDI%C3%87%C3%83O.png"
     alt="TAREFAS"
     style="width:100%;" />

<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/TELA%20NOVO%20USUARIO%20ADMIN.png"
     alt="TAREFAS"
     style="width:100%;" />
     
## AWS
- Feito o deploy da API no AWS LAMBDA + APIGATEWAY;
 
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/AWS1.png"
     alt="TAREFAS"
     style="width:100%;" />
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/AWS2.png"
     alt="TAREFAS"
     style="width:100%;" />
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/API%2003.png"
     alt="TAREFAS"
     style="width:100%;" />
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/API%2002.png"
     alt="TAREFAS"
     style="width:100%;" />
<img src="https://github.com/victor-joness/Teste-Watch-Brasil/blob/main/Imagens/API%2001.png"
     alt="TAREFAS"
     style="width:100%;" />

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

