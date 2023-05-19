window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const elementGuess = document.getElementById('guess')
const elementInitial = document.getElementById('msg-initial')
const smallerValue = document.getElementById('smaller-value').innerHTML = 0
const biggerValue = document.getElementById('bigger-value').innerHTML = 1000
const randomNumber = parseInt(Math.random() * biggerValue + 1)
console.log(randomNumber)

function playGame() {
    recognition.lang = 'pt-Br'
    recognition.start()
    recognition.addEventListener('result', onSpeak)
}
    
function onSpeak(e) {
    let guess = e.results[0][0].transcript
    showTip(guess)
}

function showTip(guess) {

    if (Number.isNaN(guess) || parseInt(guess) < smallerValue || parseInt(guess) > biggerValue) {
        elementGuess.innerHTML = `
        <div>You said a invalid number or out of range :'(</i></div>
        <div>Try again!</i></div>
    `
    } else if (parseInt(guess) > randomNumber) {
        elementInitial.innerHTML = ""
        elementGuess.innerHTML = `
        <h2>Almost there!</h2>
        <p>Speak another number</p>
        <div>You said:</div>
        <span class="box" id="random-number">${guess}</span>
        <div class="small-or-big">The secret number it's smaller</div>
        <i class="fa-solid fa-arrow-down fa-bounce"></i>
    `
    } else if (parseInt(guess) < randomNumber) {
        elementInitial.innerHTML = ""
        elementGuess.innerHTML = `
        <h2>Almost there!</h2>
        <p>Speak another number</p>
        <div>You said:</div>
        <span class="box" id="random-number">${guess}</span>
        <div class="small-or-big">The secret number it's bigger</div>
        <i class="fa-solid fa-arrow-up fa-bounce"></i>
    `
    } else if (parseInt(guess) == randomNumber) {
        recognition.onspeechend = () => {
            recognition.stop();
        }
        
        recognition.addEventListener('end', () => recognition.stop())
        elementInitial.innerHTML = ""
        elementGuess.innerHTML = `
        <h1>Congratulations!</h1>
        <h3>You guessed, the secret number is ${guess}</h3>
        <button id="play-again" class="btn-play-again">Play again</button>
        `
    }
}

recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', event => {
    if (event.target.id == 'play-again') {
        window.location.reload()
    } else if (event.target.id == 'play') {
        elementInitial.innerHTML = `
        <h3>Speak a number:</h3>
        `
        playGame();
    }
})

