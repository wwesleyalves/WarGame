const input = document.querySelector('#arquivo');
const preview = document.querySelector('#preview');
const btnDownload = document.querySelector('#download');
const btnEnviarParaBanco = document.querySelector('#enviarParaBanco');

const timestamp = new Date().getTime();
const randomPart = Math.floor(Math.random() * 1000); 

const fileName = `arquivo_${timestamp}_${randomPart}.xml`;


input.addEventListener('change', function(){
    const arquivo = this.files[0];
    const leitor = new FileReader();
    
    console.log("resultado do arquivo" + arquivo);

    console.log("resultado do this.files" + this.files);

    leitor.addEventListener('load', function(){
        console.log("resultado do leitor" + leitor.result )
        preview.value = leitor.result;
    });

    if(arquivo){
        leitor.readAsText(arquivo);
    }
});

const enviarParaXmlData = function (conteudo) {
    const xmlObj = { xml: conteudo }; 

    fetch('http://localhost:3000/xml-data', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(xmlObj),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert(`Dados XML processados com sucesso!`);
        } else {
            alert(`Erro ao processar XML: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro na requisição:', error));
};

const download = function(){
    const a = document.createElement('a');
    a.style = 'display: none';
    document.body.appendChild(a);

    return function(conteudo, nomeArquivo){
        const blob = new Blob([conteudo], { type: 'octet/stream' });

        console.log("resultado do conteudo e do arquivo" + conteudo + nomeArquivo)

        console.log("resultado somente do conteudo" + conteudo)

        console.log("resultado somento do nome do arquivo" + nomeArquivo)

        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = nomeArquivo;
        a.click();
        window.URL.revokeObjectURL(url);

        console.log("resultado da URL" + url)

    }
}

btnDownload.addEventListener('click', function(){
    download()(preview.value, fileName);
    console.log("resultado do DOWNLOAD " + preview.value)
})

btnEnviarParaBanco.addEventListener('click', function () {
    const xmlString = preview.value.trim(); 

    if (!xmlString) {
        alert('O conteúdo XML não pode estar vazio.');
        return;
    }

    enviarParaXmlData(xmlString);
});
