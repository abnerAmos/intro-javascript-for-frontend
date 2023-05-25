import { isCPF, isLegalAge } from "./validation.js"

const fieldsForm = document.querySelectorAll("[required]")
const form = document.querySelector("[data-formulario]")

form.addEventListener("submit", (event) =>  {
    event.preventDefault();
    const listResponse = {
        "nome": event.target.elements["nome"].value,
        "email": event.target.elements["email"].value,
        "rg": event.target.elements["rg"].value,
        "cpf": event.target.elements["cpf"].value,
        "aniversario": event.target.elements["aniversario"].value
    }
    localStorage.setItem("cadastro", JSON.stringify(listResponse))
    window.location.href = './abrir-conta-form-2.html'
})

fieldsForm.forEach((field) => {
    field.addEventListener("blur", () => checkField(field))
    field.addEventListener("invalid", event => event.preventDefault())
})

function checkField(field) {
    let msg = ""
    field.setCustomValidity('')
    if (field.name === "cpf" && field.value.length >= 11) {
        isCPF(field)
    }

    if (field.name === "aniversario" && field.value != "") {
        isLegalAge(field)
    }

    typeErrors.forEach(erro => {
        if (field.validity[erro]) {
            msg = msgs[field.name][erro];
        }
    })
    const msgErro = field.parentNode.querySelector('.mensagem-erro');
    const checkInput = field.checkValidity();

    if(!checkInput) {
        msgErro.textContent = msg;
    } else {
        msgErro.textContent = "";
    }
}

const typeErrors = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const msgs = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}