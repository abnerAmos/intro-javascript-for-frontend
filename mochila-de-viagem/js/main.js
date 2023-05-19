const form = document.getElementById("novoItem")
const list = document.getElementById("lista") // cria uma lista com os itens da tag
const itens = JSON.parse(localStorage.getItem("itens")) || []

// forEach para buscar os itens em localStore e iterar no HTML e tornar os itens viziveis
itens.forEach( (element) => {
    createElement(element)
    
});

// addEventListener: aguarda a função informada no parametro ("submit") ser ativada pelo event
form.addEventListener("submit", test);

function test(event) {

    event.preventDefault();

    const nome = event.target.elements['nome'].value;
    const quantidade = event.target.elements['quantidade'].value;

    const exist = itens.find(element => element.nome === nome)
    const currentItem = { // gerando um objeto
        "nome": nome,
        "quantidade" : quantidade
    }

    if (exist) {
        currentItem.id = exist.id
        updateElement(currentItem)
        itens[itens.findIndex(element => element.id === exist.id)] = currentItem
    } else {
        currentItem.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0
        createElement(currentItem)
        itens.push(currentItem) // iterando a lista com os itens criados no objeto
    }
    
    localStorage.setItem("itens", JSON.stringify(itens)) // adicionando o array de objetos no localStorage

    this.nome.value = ""
    this.quantidade.value = ""
}

function createElement(item) {

    const newItem = document.createElement('li') // gera um tag
    newItem.classList.add("item") // adiciona uma classe a tag

    const itemNumber = document.createElement('strong')
    itemNumber.innerHTML = item.quantidade // captura o valor do item e atribui o valor a variável (dentro da tag)
    itemNumber.dataset.id = item.id
    newItem.appendChild(itemNumber) // junta as duas tags geradas
    newItem.innerHTML += item.nome

    newItem.appendChild(deleteButton(item.id))

    list.appendChild(newItem) // adiciona o novo item criado a lista
    //<li class="item"><strong>10</strong>Camisa</li>
    
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deleteButton(id) {
    const elementButton = document.createElement("button")
    elementButton.innerText = "X"

    elementButton.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return elementButton
}

function deleteElement(tag, id) {
    tag.remove()

    /* .splice() - pode adicionar ou remover um item no array,
    pode receber 3 tipos de parametros:
    primeiro - Indica o item no array referência da posição;
    segundo - Indica quantos itens devem ser removidos a partir do index informado no primeiro parâmetro;
    terceiro - Indica um ou vários itens "string" que será adicionado antes do index informado como referência */
    itens.splice(itens.findIndex(element => element.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))

    console.log(itens)

}