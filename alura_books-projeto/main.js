let books = []
const api = "https://guilhermeonrails.github.io/casadocodigo/livros.json"

const btnFilter = document.querySelectorAll('.btn')
const elementsBooks = document.getElementById('livros')
const btnOrder = document.getElementById('btnOrdenarPorPreco')
const totalValue = document.getElementById('valor_total_livros_disponiveis')

btnFilter.forEach(btn => btn.addEventListener('click', filterBooks))
btnOrder.addEventListener('click', orderByPrice)

requestBooks()

async function requestBooks() {
    const request = await fetch(api)
    books = await request.json() // insere a response da request no array.

    list(discount(books))
}

// forEach
function list(list) {
    totalValue.innerHTML = ""
    list.forEach(books => {
        let stock = checkAvailability(books)
        elementsBooks.innerHTML += `
        <div class="livro">
            <img class="${stock}" src="${books.imagem}" alt="${books.titulo}"/>
            <h2 class="livro__titulo">${books.titulo}</h2>
            <p class="livro__descricao">${books.autor}</p>
            <p class="livro__preco" id="preco">${books.preco.toFixed(2)}</p>
            <div class="tags">
                <span class="tag">${books.categoria}</span>
            </div>
        </div>
        `
    });
}

// aplicando desconto com .map
function discount(books) {
    return books.map(e => {
        return { ...e, preco: e.preco - (e.preco * 0.1) }
    })
}

// filtrando por categoria com .filter
function filterBooks() {
    elementsBooks.innerHTML = ""
    const elementBtn = document.getElementById(this.id).value
    let filteredBooks = elementBtn === 'disponivel' ?
        books.filter(e => e.quantidade > 0) : books.filter(e => e.categoria === elementBtn)
        
    list(discount(filteredBooks))

    if (elementBtn === 'disponivel') {
        showTotalValue(totalSum(discount(filteredBooks)))
    }
}

// ordenando por preço com .sort
function orderByPrice() {
    let orderBook = books.sort((a, b) => a.preco - b.preco)

    list(discount(orderBook))
}

function checkAvailability(books) {
    return books.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel"
}

function showTotalValue(value) {
    return totalValue.innerHTML = `
    <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${value}</span></p>
    </div>
    `
}

function totalSum(book) {
    return book.reduce((a, b) => a + b.preco, 0).toFixed(2)
}