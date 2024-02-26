# WarGame - Nova8

<div align="center">
  <img src="./img/wargame-nova8.png" alt="WarGame_Checkmarx_One" width="700">
</div>


## Introdução WarGame

Este repositório introduz o WarGame, no qual é um WebGoat em JavaScript, sendo desenvolvido pela equipe de consultoria da Nova8,
com o intuito de dar um treinamento para toda Nova8, afim de aprender como resolver algumas vulnerabilidades, como SQL Injection, DOM XSS, XXE entre várias outras vulnerabilidades.

---
## Sumário   
- [Introdução WarGame](#introdução-wargame)
- [Sumário](#sumário)
- [O que é um WebGoat](#o-que-é-um-webgoat)
- [Antes de começar](#antes-de-começar)
- [Instalações](#instalações)
  - [Instalação Git](#instalação-git)
  - [Instalação MySQL](#instalação-mysql)
  - [Instalação do Node](#instalação-do-node)
- [Configurando MySQL](#configurando-mysql)
- [Clonando o projeto](#clonando-o-projeto)
- [Instalação das bibliotecas do lado do servidor](#instalação-das-bibliotecas-do-lado-do-servidor)
- [Configurando a conexão com o Banco de Dados](#configurando-a-conexão-com-o-banco-de-dados)
- [Começando O WarGame](#começando-o-wargame)
- [Após fazer as modificações](#após-fazer-as-modificações)

---

## O que é um WebGoat

Com base no site da OWASP: 

"WebGoat é um aplicativo deliberadamente inseguro que permite que desenvolvedores interessados como você testem vulnerabilidades comumente encontrado em aplicativos baseados em Java que usam componentes de código aberto comuns e populares."

[Clique aqui para entender melhor sobre o que é um WebGoat.](https://owasp.org/www-project-webgoat/) 

---

## Antes de começar

⚠️ **ATENÇÃO** ⚠️

Antes de começar a corrigir as vulnerabilidades, você precisa dos seguintes pré-requisitos:

- Instale o git
- Instale e configure o banco de dados MySQL
- Instale e configure o Node.js
- Instale todas as bibliotecas necessárias do lado do servidor(Back-end)
- Tenha conhecimento de programação em HTML e CSS
- Tenha conhecimento de programação em JavaScript
- Tenha conhecimento de programação em MySQL

---

# Instalações

## Instalação Git

Este link vai redirecionar você ao site oficial do Git, para a instalçao do Git, no SO Windows.

[Clique aqui para ir até a instação do Git](https://git-scm.com/downloads) 

---

## Instalação MySQL

Este link vai redirecionar você ao site oficial do MySQL, para a instação do MySQL.

[Clique aqui para ir até a instação do MySQL](https://www.mysql.com/downloads/) 

⚠️ **ATENÇÃO** ⚠️

Caso tenha dúvida de como instalar e configurar o MySQL, acesse:

[Como instalar o MySQL](https://www.youtube.com/watch?v=VSh-B7yC8kc) 

---

## Instalação do Node

Este link vai redirecionar você a um guia de como instalar o Node.js

[Clique aqui para ir até o guia de instalação do Node.js](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos) 

Este link vai redirecionar você ao site oficial do Nodejs, para a instalação do Node.js

[Clique aqui para ir até a instalação do Node.js](https://nodejs.org/en/download) 

---

## Clonando o projeto

⚠️ **ATENÇÃO** ⚠️

Lembre-se de já ter instalado e configurado o Node.

Para clonar o projeto, você precisa fazer um "Fork" do projeto, no qual irá criar um repositório no seu perfil do GitHub, que estará conectado a este repositório aqui.

Depois, você precisa criar uma pasta no seu computador, no local a onde você vai colocar o projeto, e vai abrir o git bash dentro dessa pasta e colocar o comando:

```bash
git init
```

E depois coloque o comando:

```bash
git clone https://github.com/Nova-8/WarGame.git
```

Após isso, você vai acessar a sua Branch pelo git bash utilizando o comando:

```bash
git checkout -b Nome_da_sua_branch
```

Com esses comandos você estará acessando a sua branch no projeto e poderá fazer as modificações que desejar.

---

## Configurando MySQL

⚠️ **ATENÇÃO** ⚠️

**JAMAIS** utilize a instalação "MySQL Community (GPL) Downloads »" do MySQL **em meio de produção**, somente para fins educacionais, como é o caso deste WarGame.

Após instalar o MySQL, você irá abrir o MySQL Workbench, e vai criar uma nova conexão clicando no + do MySQL Connections, depois vai aparecer para você configurar essa nova conexão, você precisara colocar o nome da conexão, o método de conexão você pode deixar como Standard (TCP/IP), depois irá mudar o Hostname, para "localhost" deixar a porta 3306, username você vai deixar o "root".

Após fazer essas modificações, você vai clicar em "ok" e vai precisar colocar a senha que você definiu para seu Banco de Dados na hora da instalação, para poder acessar a conexão que você criou, depois você vai clicar em "File" e depois em "Open SQL Script..." e irá selecionar o arquivo "wargame_sql.sql" que estará nesse repositório.

Depois de abrir o arquivo você vai executar o comando "create database db_wargame", depois "use db_wargame", após isso você criará a tabela tbl_user, utilizando todo o comando "create table tbl_user", após isso você vai selecionar o comando "select * from tbl_user;" para conferir se a sua tabela foi criada corretamente, depois você criará a tabela tbl_vulnerabilidades, utilizando todo o comando "create table tbl_vulnerabilidades" e novamente irá executar o comando "select * from tbl_vulnerabilidades;" para verificar se a tabela de vulnerabilidades foi criada, depois você vai selecionar todos os insert na tbl_vulnerabilidades, utilizando todo o comando "insert into tbl_vulnerabilidades", você vai selecionar desde "###### VULNERABILIDADE 1 - Broken Access Control" até o ultimo insert, logo abaixo de "###### VULNERABILIDADE 10 - Server Side Request Forgery" e irá executar, para poder inserir alguns dados na tabela de vulnerabilidades, após isso você irá criar a tabela tbl_armazenamento_arquivos, utilizando todo o comando "create table tbl_armazenamento_arquivos", logo após isso você irá executar o comando "select * from tbl_armazenamento_arquivos;" para verificar se a tabela de armazenamento de arquivos foi criada.

E assim o seu Banco de Dados estará pronto para ser usado.

---

## Instalação das bibliotecas do lado do servidor

Aqui contêm a lista de todos os comandos que é preciso colocar para instalar as bibliotecas necessárias
do lado do servidor, na seguinte ordem:

1. Express:

```bash
npm install express
```

---

2. Body-parser:

```bash
npm install body-parser
```

---

3. MySQL:

```bash
npm install mysql
```

---

4. Dotenv:

```bash
npm install dotenv
```

---

5. Cors:

```bash
npm install cors
```

---

6. Child Process (incluído no Node.js padrão, não requer instalação separada).

---

7. Libxmljs:

```bash
npm install libxmljs
```

---

8. HTTP (incluído no Node.js padrão, não requer instalação separada).

---

9. FS (File System) (incluído no Node.js padrão, não requer instalação separada).

---

10. Multer:

```bash
npm install multer
```

---

## Configurando a conexão com o Banco de Dados

Dentro da pasta "wargame_backend", nos arquivos ".env" e "app.js" têm uma configuração padrão para uma conexão com um Banco de Dados MySQL, é preciso que você mude o "DB_PASSWORD" presentes nesses dois arquivos, para a senha que você estabeleceu no seu Banco de Dados e configurar a conexão conforme a instância que você criou no "MySQL Connections" dentro do seu Banco de Dados MySQL.

---

## Começando O WarGame

Após ter concluído a instalação dos recursos necessários, é preciso iniciar o terminal, com o comando " Ctrl + ' ". ou simplismente clicando em "Terminal" e "New Terminal" e ir até a o arquivo "app.js" que está dentro da pasta "wargame_backend".

Ao chegar nesse arquivo, é preciso colocar o seguinte comando para subir o servidor:

```bash
node .\app.js
```

Após esse comando, o servidor estará funcionando normalmente, e você já pode iniciar o arquivo index.html para subir a aplicação Web.

---

## Após fazer as modificações

⚠️ **ATENÇÃO** ⚠️

Após realizar alguma modificação no projeto e queira subir para o repositório, utilize os seguintes comandos nessa ordem:

```bash
git add .
```

```bash
git commit -m "Escreva_algum_comentário_sobre_sua_atualização"
```

```bash
git push origin Nome_da_sua_branch
```

Depois você vai precisar ir até o repositório do Fork, que estará no seu perfil, e lá vai aparecer para você fazer um "Pull Request", no qual você colocará um título e um comentário sobre a atualização que você estará fazendo, assim basta esperar um colaborador aceitar seu Pull Request, e todas as modificações que você fez localmente, serão atribuidas no repositório principal do projeto, na sua branch.

---