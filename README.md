API Usuarios Node.js, Express e PostgreSQL, com calculo de idade e signo.
Este é um exemplo de uma API web construída com Node.js, Express e PostgreSQL para gerenciar usuários. A API permite a criação, leitura, atualização e exclusão (CRUD) de usuários em um banco de dados PostgreSQL.

Configuração do Ambiente
Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

Instale as dependências do projeto: npm install express pg

Configure as variáveis de ambiente:

PORT: Porta em que o servidor será executado.
Dados de acesso ao banco de dados PostgreSQL (user, host, database, password, port).
Comandos iniciais para criação do projeto
npm init -y
npm install express pg
npm install -g nodemon
Criando o Banco de Dados
1 . Antes de iniciar o servidor, é necessário criar o banco de dados no PostgreSQL. Você pode fazer isso executando os comandos no console do PostgreSQL ou em uma ferramenta de administração:

Os comandos encontram-se dentro da pasta db, no arquivo script.sql.
Aviso Importante
Os dados de acesso ao banco de dados estão expostos neste projeto, pois é destinado a fins educacionais como projeto de estudo para alunos. Certifique-se de não utilizar informações sensíveis neste contexto.

Endpoints
POST /usuario: Adiciona um novo usuário.

Corpo da requisição: { "nome": "Nome do Usuário", "email": "email@exemplo.com" }

GET /usuario: Retorna todos os usuários.

Resposta: { "total": 3, "usuarios": [...] }

PUT /usuario/:id: Atualiza um usuário existente.

Parâmetros da URL: id do usuário.

Corpo da requisição: { "nome": "Novo Nome", "email": "novoemail@exemplo.com" }

DELETE /usuario/:id: Exclui um usuário existente.

Parâmetros da URL: id do usuário.
