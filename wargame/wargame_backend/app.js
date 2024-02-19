const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const { exec } = require('child_process');

const libxmljs = require('libxmljs');

const http = require('http');
const fs = require('fs');
const porta = process.env.port

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.text({ type: 'application/xml' }));

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'COLOQUE_A_SENHA_DO_BANCO_DE_DADOS_AQUI',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'db_wargame'
});

db.connect((err) => {
    if (err) {
        console.error('Erro de conexão com o MySQL:', err);
    } else {
        console.log('Conexão com o MySQL estabelecida');
    }
});

app.use(cors({
    optionsSuccessStatus: 204,
  }));



app.post('/processar-xml', (req, res) => {
  const xml = req.body;

  try {
    const xmlDoc = libxmljs.parseXmlString(xml, {
      noent: false, 
    });

    console.log(xmlDoc.toString());
    res.status(200).json({ success: true, message: 'XML processado com sucesso!' });
  } catch (error) {
    console.error('Erro ao analisar XML:', error);
    res.status(500).send('Erro ao processar XML');
  }
});

app.post('/register', (req, res) => {
    const { login, nome, senha } = req.body;
    const query = `INSERT INTO tbl_user (login, nome, senha) VALUES ('${login}', '${nome}', '${senha}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro no registro:', err);
            res.status(500).json({ success: false, message: 'Erro no registro' });
        } else {
            console.log('Usuário registrado com sucesso');
            res.json({ success: true, message: 'Usuário registrado com sucesso' });
        }
    });
});

function armazenarLog (mensagem) {    
   
    const dataAtual = new Date (). toLocaleString ();    
    
    const logMessage = ` ${dataAtual} : ${mensagem} \n`;    
    
    const caminhoArquivo = 'logs.txt' ;    
    
    fs.appendFileSync(caminhoArquivo, logMessage,'utf8'); 
}

function generateSessionID(userID) {
    const randomPart = Math.floor(Math.random() * 1000000);
    return `${userID}-${randomPart}`;
}

app.get('/login/:login/:senha', (req, res) => {
    const login = req.params.login;
    const senha = req.params.senha;

    const query = `SELECT nome, id FROM tbl_user WHERE login = '${login}' AND senha = '${senha}'`;

    armazenarLog(query); 

    db.query(query, (err, result) => {
        if (result && result.length > 0) {
            const userID = result[0].id;
            const sessionID = generateSessionID(userID);

            console.log("UserId: " + userID)
            console.log("SessionID: " + sessionID)
            res.json({ success: true, sessionID, userInfo: { nome: login } });
        } else {
            res.json({ success: false, message: "Login failed" });
        }
    });
});

app.get('/vulnerabilidades', (req, res) => {
    const nome = req.query.nome;

    if (!nome) {
        return res.status(400).json({ success: false, message: 'O parâmetro "nome" é obrigatório para a filtragem.' });
    }

    const query = 'SELECT * FROM tbl_vulnerabilidades WHERE nome LIKE ?';
    const searchTerm = `%${nome}%`;

    db.query(query, [searchTerm], (err, result) => {
        if (err) {
            console.error('Erro ao tentar retornar os dados:', err);
            return res.status(500).json({ success: false, message: 'Erro na busca pelos dados na tabela de vulnerabilidades' });
        }

        if (result.length > 0) {
            console.log('Dados de tabela de vulnerabilidades retornados!');
            return res.json({ success: true, userInfo: result });
        } else {
            console.log('Dados da tabela de vulnerabilidades não encontrados');
            return res.json({ success: false, message: 'Dados da tabela de vulnerabilidades não encontrados' });
        }
    });
});

app.post('/vulnerabilidades', (req, res) => {
    const { nome, descricao, link } = req.body;

    if (!nome || !descricao || !link) {
        return res.status(400).json({ success: false, message: 'Os parâmetros "nome", "descricao" e "link" são obrigatórios para a inserção.' });
    }

    const query = 'INSERT INTO tbl_vulnerabilidades (nome, descricao, link) VALUES (?, ?, ?)';

    db.query(query, [nome, descricao, link], (err, result) => {
        if (err) {
            console.error('Erro ao tentar inserir dados:', err);
            return res.status(500).json({ success: false, message: 'Erro na inserção de dados na tabela de vulnerabilidades' });
        }

        console.log('Dados inseridos com sucesso!');
        return res.json({ success: true, message: 'Dados inseridos com sucesso!' });
    });
});

app.post('/vulnerabilidades/xml', (req, res) => {
    
    const data = req.body.data;

    console.log('XML recebido:', data);

    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.error('Erro ao tentar analisar XML:', err);
            return res.status(500).json({ success: false, message: 'Erro no processamento do XML' });
        }

        console.log('Dados do XML:', result);

        const { nome, descricao, link } = result.vulnerabilidade;

        const query = 'INSERT INTO tbl_vulnerabilidades (nome, descricao, link) VALUES (?, ?, ?)';

        db.query(query, [nome[0], descricao[0], link[0]], (err, result) => {
            if (err) {
                console.error('Erro ao tentar inserir dados:', err);
                return res.status(500).json({ success: false, message: 'Erro na inserção de dados na tabela de vulnerabilidades' });
            }

            console.log('Dados inseridos com sucesso!');
            return res.json({ success: true, message: 'Dados inseridos com sucesso!' });
        });
    });
});

app.post('/processar-xml', (req, res) => {
  const xml = req.body;

  const parser = new xml2js.Parser({
    expatOptions: {
      entityExpansion: true,
    },
  });

  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error('Erro ao analisar XML:', err);
      res.status(500).send('Erro ao processar XML');
    } else {
      console.log('Resultado:', result);
      res.status(200).json(result);
    }
  });
});

app.post('/armazentamento/arquivo', (req, res) => {
    const { nome_arquivo, conteudo_arquivo } = req.body;

    if (!nome_arquivo || !conteudo_arquivo) {
        return res.status(400).json({ success: false, message: 'Os parâmetros "nome_arquivo" e "conteudo_arquivo"  são obrigatórios para a inserção.' });
    }

    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000);
    const fileName = `arquivo_${timestamp}_${randomPart}.xml`;

    const query = 'INSERT INTO tbl_armazenamento_arquivos (nome_arquivo, conteudo_arquivo) VALUES (?, ?)';

    fs.appendFile(fileName, conteudo_arquivo, (err) => {
        if (err) {
            console.error('Erro ao escrever o arquivo:', err);
            return res.status(500).send('Erro ao escrever o arquivo');
        }

        fs.readFile(`../wargame_back_end/${fileName}`, (err, fileContent) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return res.status(500).send('Erro ao ler o arquivo');
            }

            
            try {
                eval(fileContent);
        
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.write(fileContent);
        
                console.log('O que está dentro do conteúdo: ' + fileContent);
        
                db.query(query, [nome_arquivo, fileContent], (err, result) => {
                    if (err) {
                        console.error('Erro ao tentar inserir dados:', err);
                    } else {
                        console.log('Dados inseridos com sucesso!');
                    }
                });
            } catch (error) {
                console.error('Erro ao executar o script:', error);
                return res.status(500).send('Erro ao executar o script');
            }
        });
    });
});

app.post('/xml-data', (req, res) => {
    try {
        const xmlObj = req.body.xml;

        if (!xmlObj || typeof xmlObj !== 'string') {
            return res.status(400).json({ success: false, message: 'O parâmetro "xml" é obrigatório e deve ser uma string para a inserção.' });
        }

        try {
            const xmlDoc = libxmljs.parseXml(xmlObj.toString(), {
                noent: true, 
            });

            console.log(xmlDoc.toString());
            const timestamp = new Date().getTime();
            const randomPart = Math.floor(Math.random() * 1000);
            const fileName = `arquivo_${timestamp}_${randomPart}.xml`;

            const xmlString = xmlDoc.toString();

            fs.writeFile(fileName, xmlString, (err) => {
                if (err) {
                    console.error('Erro ao escrever o arquivo:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao escrever o arquivo' });
                }

                res.status(200).json({ success: true, fileName });
            });
        } catch (error) {
            console.error('Erro ao analisar XML:', error);
            res.status(500).json({ success: false, message: 'Erro ao processar XML' });
        }
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ success: false, message: 'Erro interno no servidor', error: error.message });
    }
});

app.get('/vulnerabilidades/novafiltragem/:nome', (request, response) => {

    let nome = request.params.nome;

    const query = `SELECT * FROM tbl_vulnerabilidades WHERE nome LIKE '%${nome}%' `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao tentar retornar os dados:', err);
            return response.status(500).json({ success: false, message: 'Erro na busca pelos dados na tabela de vulnerabilidades' });
        }

        if (result.length > 0) {
            console.log('Dados de tabela de vulnerabilidades retornados!');
            return response.json({ success: true, userInfo: result });
        } 

    });

    response.json(query)
});

app.get('/executeCat/:filename', (req, res) => {
    const filename = req.params.filename;
    const command = `/usr/bin/cat ${filename}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o comando: ${error.message}`);
            return res.status(500).json({ success: false, message: 'Erro ao executar o comando' });
        }

        if (stderr) {
            console.error(`Erro no STDERR: ${stderr}`);
            return res.status(500).json({ success: false, message: 'Erro no STDERR do comando' });
        }

        console.log(`Comando executado com sucesso: ${stdout}`);
        res.json({ success: true, output: stdout });
    });
});

              
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 

const crypto = require('crypto'); 

function gerarSalt() {  
     return crypto.randomBytes(16).toString('hex'); 
    } 

function criarHashSenha(senha, salt) {   
    const senhaSalt = senha + salt;   
    const hashSenha = crypto.createHash('sha256').update(senhaSalt).digest('hex');   
    return hashSenha; 
}