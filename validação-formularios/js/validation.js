export function isCPF(field) {
    const cpf = field.value.replace(/\.|-/g, "");
    if (checkNumbers(cpf) || checkFirstDigit(cpf) || checkSecondDigit(cpf)) {
        field.setCustomValidity('O CPF não é válido!')
    } else {
        "Existe!"
    }    
}

// VALIDAÇÃO DE CPF

function checkNumbers(cpf) {
    const repeatedNumbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return repeatedNumbers.includes(cpf)
}

function checkFirstDigit(cpf) {
    let sum = 0;
    let multiplier = 10;

    for(let size = 0; size < 9; size++) {
        sum += cpf[size] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if (sum == 10 || sum == 11) {
        sum = 0
    }

    return sum != cpf[9];
}

function checkSecondDigit(cpf) {
    let sum = 0;
    let multiplier = 11;

    for(let size = 0; size < 10; size++) {
        sum += cpf[size] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if (sum == 10 || sum == 11) {
        sum = 0
    }

    return sum != cpf[10];
}

// VALIDAÇÃO DE DATA DE NASCIMENTO

export function isLegalAge(field) {
    const dateBirth = new Date(field.value);
    if (!checkAge(dateBirth)) {
        field.setCustomValidity('O usuário não é maior de idade')
    }
}

function checkAge(date) {
    const currentDate = new Date();
    const legalAgeDate = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());

    return currentDate >= legalAgeDate;
}