create database db_wargame;

use db_wargame;

create table tbl_user (
	id int not null primary key auto_increment,
    login varchar(50) not null,
    nome varchar(100) not null,
    senha varchar(255) not null,
    
    unique index(id)
);

select * from tbl_user;

create table tbl_vulnerabilidades (
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    descricao text(1000) not null,
    link varchar (255) not null,
    
    unique index(id)
);

select * from tbl_vulnerabilidades;

###### VULNERABILIDADE 1 - Broken Access Control
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Broken Access Control",
                                  "O controle de acesso impõe a política de modo que os usuários não possam agir fora de suas permissões pretendidas. Falhas geralmente levam a falhas não autorizadas divulgação, modificação ou destruição de todos os dados ou executar uma função de negócios fora dos limites do usuário.",
                                  "https://owasp.org/Top10/A01_2021-Broken_Access_Control/");
                                
                                
###### VULNERABILIDADE 2 - Cryptographic Failures
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Cryptographic Failures",
                                  "A primeira coisa é determinar as necessidades de proteção dos dados em trânsito e em repouso. Por exemplo, senhas, números de cartão de crédito, saúde Registros, informações pessoais e segredos comerciais exigem mais proteção, principalmente se esses dados se enquadrarem nas leis de privacidade, por exemplo, da UE Regulamento Geral de Proteção de Dados (RGPD), ou regulamentos, por exemplo, proteção de dados financeiros, como o PCI Data Security Standard (PCI DSS).",
                                  "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/");
                                
###### VULNERABILIDADE 3 - Injection
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Injection",
                                  "Algumas das injeções mais comuns são SQL, NoSQL, comando OS, Object Mapeamento relacional (ORM), LDAP e linguagem de expressão (EL) ou objeto Injeção de Graph Navigation Library (OGNL). O conceito é idêntico entre todos os intérpretes. A revisão do código-fonte é o melhor método de detectar se os aplicativos são vulneráveis a injeções. Automatizado teste de todos os parâmetros, cabeçalhos, URL, cookies, JSON, SOAP e XML A entrada de dados é fortemente incentivada. As organizações podem incluir ferramentas de teste de segurança de aplicativos estáticos (SAST), dinâmicos (DAST) e interativos (IAST) no CI/CD pipeline para identificar falhas de injeção introduzidas antes da produção implantação.",
                                  "https://owasp.org/Top10/A03_2021-Injection/"
								);
                                
                                
###### VULNERABILIDADE 4 - Insecure Design
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Insecure Design",
                                  "O design inseguro é uma categoria ampla que representa diferentes fraquezas, expressas como \"projeto de controle ausente ou ineficaz\". O design inseguro não é a fonte para todas as outras categorias de risco Top 10. Há uma diferença entre design inseguro e implementação insegura. Diferenciamos entre falhas de projeto e defeitos de implementação por um motivo, eles têm diferentes causas raiz e correção. Um design seguro ainda pode ter defeitos de implementação que levam a vulnerabilidades que podem ser exploradas. Um design inseguro não pode ser corrigido por uma implementação perfeita, pois, por definição, os controles de segurança necessários nunca foram criados para se defender contra ataques específicos. Um dos fatores que contribuem para o design inseguro é a falta de perfil de risco de negócios inerente ao software ou sistema que está sendo desenvolvido e, portanto, a falha em determinar qual nível de design de segurança é necessário.",
                                  "https://owasp.org/Top10/A04_2021-Insecure_Design/");
                                  
###### VULNERABILIDADE 5 - Security Misconfiguration
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Security Misconfiguration",
                                  "Sem uma configuração de segurança de aplicativo concertada e repetível processo, os sistemas estão em maior risco.",
                                  "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/");
                                  
                                  
###### VULNERABILIDADE 6 - Vulnerable and Outdated Components
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Vulnerable and Outdated Components",
                                  "Componentes vulneráveis são um problema conhecido que nós luta para testar e avaliar o risco e é a única categoria a não ter quaisquer CVEs (Common Vulnerability and Exposures) mapeadas para as CWEs incluídas, portanto, um padrão de exploração/impacto peso de 5,0 é usado.",
                                  "https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/");
                                  
###### VULNERABILIDADE 7 - Identification and Authentication
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Identification and Authentication",
                                  "Confirmação da identidade, autenticação e sessão do usuário O gerenciamento é fundamental para proteger contra autenticação Ataques.",
                                  "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/");
                                  
###### VULNERABILIDADE 8 - Identification and Authentication
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Software and Data Integrity Failures",
                                  "Falhas de integridade de software e dados estão relacionadas a código e infraestrutura que não protege contra violações de integridade. Um exemplo disso é quando um aplicativo depende de plugins, bibliotecas ou módulos de fontes, repositórios e conteúdo não confiáveis redes de entrega (CDNs). Um pipeline de CI/CD inseguro pode introduzir o potencial para acesso não autorizado, código mal-intencionado ou comprometimento do sistema. Por fim, muitos aplicativos agora incluem a funcionalidade de atualização automática, onde as atualizações são baixadas sem verificação de integridade suficiente e aplicado ao aplicativo anteriormente confiável. Os atacantes poderiam potencialmente carregar suas próprias atualizações para serem distribuídas e executadas em todos Instalações. Outro exemplo é onde objetos ou dados são codificados ou serializados em uma estrutura que O invasor pode ver e modificar está vulnerável à desserialização insegura.",
                                  "https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/");
                                  
                                  
###### VULNERABILIDADE 9 - Security Logging and Monitoring Failures
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Security Logging and Monitoring Failures",
                                  "Voltando ao OWASP Top 10 2021, esta categoria é para ajudar a detectar, escalar e responder a violações ativas. Sem registro e monitoramento, violações não podem ser detectadas.",
                                  "https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/");
                                  
###### VULNERABILIDADE 10 - Server Side Request Forgery
insert into tbl_vulnerabilidades 
(nome, descricao, link) values (
                                  "Server Side Request Forgery",
                                  "Falhas de SSRF ocorrem sempre que um aplicativo Web está buscando um controle remoto sem validar a URL fornecida pelo usuário. Permite que um atacante para coagir o aplicativo a enviar uma solicitação criada para um inesperado destino, mesmo quando protegido por um firewall, VPN ou outro tipo de lista de controle de acesso à rede (ACL).",
                                  "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/");

create table tbl_armazenamento_arquivos (
	id int not null primary key auto_increment,
    nome_arquivo varchar(255) not null,
    conteudo_arquivo text(2000) not null,
    
    unique index(id)
);

select * from tbl_armazenamento_arquivos;

                                  