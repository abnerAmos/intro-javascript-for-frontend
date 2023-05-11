const form = document.getElementById("novoItem")
const list = document.getElementById("lista") // cria uma lista com os itens da tag
const itens = JSON.parse(localStorage.getItem("itens")) || []

// forEach para buscar os itens em localStore e iterar no HTML e tornar os itens viziveis
itens.forEach( (element) => {
    createElement(element)
    
});

// addEventListener: aguarda a função informada no parametro ("submit") ser ativada pelo event
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'].value;
    const quantidade = event.target.elements['quantidade'].value;

    const exist = itens.find(element => element.nome === nome)
    console.log(exist)
    const currentItem = { // gerando um objeto
        "nome": nome,
        "quantidade" : quantidade
    }
    console.log(currentItem)
    if (exist) {
        currentItem.id = exist.id
        updateElement(currentItem)
        itens[exist.id] = currentItem
    } else {
        currentItem.id = itens.length
        createElement(currentItem)
        itens.push(currentItem) // iterando a lista com os itens criados no objeto
    }
    
    console.log(itens)
    localStorage.setItem("itens", JSON.stringify(itens)) // adicionando o array de objetos no localStorage

    nome.value = ""
    quantidade.value = ""
});

function createElement(item) {

    const newItem = document.createElement('li') // gera um tag
    newItem.classList.add("item") // adiciona uma classe a tag

    const itemNumber = document.createElement('strong')
    itemNumber.innerHTML = item.quantidade // captura o valor do item e atribui o valor a variável (dentro da tag)
    itemNumber.dataset.id = item.id
    newItem.appendChild(itemNumber) // junta as duas tags geradas
    newItem.innerHTML += item.nome

    list.appendChild(newItem) // adiciona o novo item criado a lista
    //<li class="item"><strong>10</strong>Camisa</li>
    
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}