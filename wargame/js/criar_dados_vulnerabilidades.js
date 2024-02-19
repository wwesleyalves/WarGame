function inserirVulnerabilidade() {
    const nome = document.getElementById('input_nome_vulnerabilidade').value; 
    const descricao = document.getElementById('input_descricao_vulnerabilidade').value; 
    const link = document.getElementById('input_link_vulnerabilidade').value; 

    const data = {
        nome: nome,
        descricao: descricao,
        link: link
    };

    fetch('http://localhost:3000/vulnerabilidades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);

        alert(`Dados inseridos  -> ${data}`)
    
    })
    .catch(error => console.error('Erro na requisição:', error));
}