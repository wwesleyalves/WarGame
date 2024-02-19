var input;

function buscarVulnerabilidades(nome) {
    
    if (!nome.trim()) {
        console.log('O campo de busca está vazio.');
        return;
    }

    fetch(`http://localhost:3000/vulnerabilidades?nome=${nome}`)
        .then(res => res.json())
        .then((json) => {
            console.log(json);

            const cards = document.getElementById('cards');
            cards.innerHTML = "";

            if (json.success) {
                json.userInfo.forEach((item) => {
                    const card = document.createElement("div");
                    card.classList.add("card");

                    const cardContent = `
                        <div href="http://localhost:3000/vulnerabilidades/${item.id}">
                            <span class="item-name">${item.nome}</span>
                            <p>${item.descricao}</p>
                            <p class="item-referencia"> Referência:
                            <a href="${item.link}" target="_blank" class="item-link"> ${item.link}</a>
                            </p>
                        </div>
                    `;

                    cardContent.innerHTML = card

                    card.innerHTML = cardContent;

                    cards.appendChild(card);
                });
            } else {
                console.log('Dados da tabela de vulnerabilidades não encontrados');
    
                const mensagem = document.createElement("p");
                mensagem.innerText = "Nenhum dado encontrado na tabela de vulnerabilidades.";
                cards.appendChild(mensagem);

                cards.innerHTML = `${input.value}`;
                
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
}

function filtrar() {
    input = document.getElementById('inputBusca');
    var filter = input.value.toUpperCase();

    buscarVulnerabilidades(filter);
}