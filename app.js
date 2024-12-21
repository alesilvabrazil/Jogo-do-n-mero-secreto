alert('Ligue o som!')

// Lista para armazenar números sorteados e evitar repetições
let listaDeNumerosSorteados = [];

// Definindo o limite superior do número secreto
let numeroLimite = 10;

// Gerando um número secreto aleatório
let numeroSecreto = gerarNumeroAleatorio();

// Contador de tentativas para adivinhar o número
let tentativas = 1;

// Função para exibir texto na tela, em uma tag específica
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com a tag fornecida
    let campo = document.querySelector(tag);
    
    // Insere o texto fornecido no elemento selecionado
    campo.innerHTML = texto;

    // Verifica se o navegador suporta a Web Speech API
    if ('speechSynthesis' in window) {
        // Cria uma nova fala com o texto
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; // Define o idioma para português do Brasil
        utterance.rate = 1.2;     // Define a velocidade da fala
        window.speechSynthesis.speak(utterance); // Reproduz a fala
    } else {
        // Caso a Web Speech API não seja suportada, informa no console
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Função para exibir as mensagens iniciais do jogo
function exibirMensagensIniciais() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Exibe instruções
}

// Função para verificar se o chute do usuário está correto
function verificarChute() {
    // Obtém o valor digitado pelo usuário no campo de entrada
    let chute = document.querySelector('input').value;

    // Se o chute for igual ao número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou'); // Mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Singular ou plural
        let mensagemTentativa = `Você é incrível!!!! Descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa); // Exibe o número de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão "Novo Jogo"
    } else {
        // Caso o chute esteja errado
        if (chute > numeroSecreto) {
            // Se o chute for maior que o número secreto
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', 'Tente novamente! DICA: o número secreto é menor que seu chute!');
        } else if (chute < numeroSecreto) {
            // Se o chute for menor que o número secreto
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', 'Tente novamente! DICA: o número secreto é maior que seu chute!');
        }
        tentativas++; // Incrementa o número de tentativas
        limparCampo(); // Limpa o campo de entrada
    }
}

// Função para gerar um número aleatório entre 1 e numeroLimite
function gerarNumeroAleatorio() {
    // Gera um número aleatório inteiro dentro do limite definido
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    // Verifica se todos os números já foram sorteados
    if (listaDeNumerosSorteados.length == numeroLimite) {
        listaDeNumerosSorteados = []; // Reseta a lista
    }

    // Se o número já foi sorteado antes, tenta novamente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Chamada recursiva
    } else {
        // Adiciona o número à lista de sorteados e o retorna
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); // Para fins de depuração
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada do usuário
function limparCampo() {
    let chute = document.querySelector('input'); // Seleciona o campo de entrada
    chute.value = ""; // Limpa o valor do campo
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reseta o contador de tentativas
    exibirMensagensIniciais(); // Exibe as mensagens iniciais novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão "Novo Jogo"
}

// Adiciona um ouvinte para capturar o "Enter" no campo de entrada
document.querySelector('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada foi "Enter"
        verificarChute(); // Chama a função de verificação
    }
});

// Exibe as mensagens iniciais ao carregar o jogo
exibirMensagensIniciais();
