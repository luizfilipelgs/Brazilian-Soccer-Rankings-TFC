# Boas vindas ao repositório do projeto TFC
 # O que foi desenvolvido  👨‍💻 


  O TFC é um site informativo sobre partidas e classificações de futebol! soccer

  Nesse projeto, foi construido um back-end dockerizado que é consumido por um front-end já desenvolvido. A API utiliza os princípios de POO, SOLID e TDD, e feita a modelagem de dados através do Sequelize. 

   ![Exemplo app front](/front-example.png)  
 
  ---

# Tecnologias utilizadas <a name="tecnologias"></a>

- [**Node JS**](https://nodejs.org/pt-br/)
- [**Express**](https://expressjs.com/pt-br/)
- [**MySQL**](https://www.mysql.com/)
- [**Sequelize**](https://sequelize.org/)
- [**Docker**](https://www.docker.com/)
- [**Mocha**](https://mochajs.org/)
- [**Chai**](https://www.chaijs.com)
- [**Sinon**](https://sinonjs.org/)

# Orientações <a name="orientacoes"></a>


<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O `docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>
<details>
<summary><strong> 🔰 Iniciando o projeto</strong></summary><br />

  1. Clone o repositório
  * `git clone https://github.com/luizfilipelgs/TFC`

  2. Entre na pasta do repositório que você acabou de clonar:
  * `cd TFC`

  3. Instale as dependências (Isso ja ira instalar tanto o front quanto o backend).
  * `npm install`

  4. Execute o docker compose.
  * `npm run compose:up`
  * Obs: São utilizas as portas 3306, 3001 e 3000 , certifique-se que elas estão disponíveis no momento de executar o comando.

  5. Para acessar.
   - Porta Front-End - http://localhost:3000
   - Porta Back-End - http://localhost:3001

  

</details>

<details>

## Testes Integração Back-end 

  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  Para executar os testes localmente, basta executar o comando `npm run test:coverage`.

  Você verá a lista de testes aprovados e a tabela de cobertura deles.
  <br>
</details>

# REST API <a name="rest-api"></a>

## :construction: Documentação da API em Construção ! :construction:

