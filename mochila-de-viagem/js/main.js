const item = document.getElementById("novoItem")

// addEventListener: aguarda a função informada no parametro ("submit") ser ativada pelo event
item.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'].value;
    const quantidade = event.target.elements['quantidade'].value;

    createElement(nome, quantidade);
});

function createElement(nome, quantidade) {

    const newItem = document.createElement('li') // gera um tag
    newItem.classList.add("item") // adiciona uma classe a tag

    const itemNumber = document.createElement('strong')
    itemNumber.innerHTML = quantidade // captura o valor do item e atribui o valor a variável (dentro da tag)

    newItem.appendChild(itemNumber) // junta as duas tags geradas
    newItem.innerHTML += nome

    const list = document.getElementById("lista") // cria uma lista com os itens da tag

    list.appendChild(newItem) // adiciona o novo item criado a lista
    //<li class="item"><strong>10</strong>Camisa</li>
    
    console.log(list)
}