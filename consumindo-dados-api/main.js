async function consultaCep(numeroCep) {

    let msgErro = document.getElementById('erro')
    msgErro.innerHTML = "";

    try {
        const cep = await fetch(`http://viacep.com.br/ws/${numeroCep}/json/`)
        const retornoCep = await cep.json()
            if (retornoCep.erro) {
                throw Error('CEP não encontrado')
            }
            var cidade = document.getElementById('cidade')
            var logradouro = document.getElementById('endereco')
            var estado = document.getElementById('estado')
            var bairro = document.getElementById('bairro')

            cidade.value = retornoCep.localidade;
            logradouro.value = retornoCep.logradouro;
            estado.value = retornoCep.uf;
            bairro.value = retornoCep.bairro;

            console.log(retornoCep)

            return retornoCep
        } catch (erro) {
            msgErro.innerHTML = `<p>CEP inválido!</p>`
            console.log("erro")
        }
}

var cep = document.getElementById("cep")
cep.addEventListener('focusout', () => consultaCep(cep.value))


// let ceps = ['01001000', '01001001']; // Array
// let conjuntoCeps = ceps.map(valores => consultaCep(valores))
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas)) // Conjunto de promisses

