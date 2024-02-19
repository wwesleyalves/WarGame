function salvarEmXMLEEnviarParaBanco() {
    
    const nome = document.getElementById('input_nome_vulnerabilidade').value;
    const descricao = document.getElementById('input_descricao_vulnerabilidade').value;
    const link = document.getElementById('input_link_vulnerabilidade').value;
 
    const xmlData = `
    <?xml version="1.0" encoding="UTF-8"?>
        <vulnerabilidade>
            <nome>${nome}</nome>
            <descricao>${descricao}</descricao>
            <link>${link}</link>
        </vulnerabilidade>
    `;
 
    fetch('http://localhost:3000/vulnerabilidades/xml', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: `data=${xmlData}`
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);

        alert(`Dados inseridos na forma de XML -> ${xmlData}`)
 
    })
    .catch(error => console.error('Erro na requisição:', error));
}



