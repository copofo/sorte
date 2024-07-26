
function gerarNumerosAleatoriosSemRepeticao(min, max, quantidade) {
    let numeros = [];

    // Cria uma array com todos os números possíveis no intervalo
    for (let i = min; i <= max; i++) {
        numeros.push(i);
    }

    // Embaralha os números usando o algoritmo de Fisher-Yates
    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    // Seleciona a quantidade desejada de números
    return numeros.slice(0, quantidade).sort((a, b) => a - b);
}

function mostrarNumerosAnimados(numeros) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';  // Limpa os resultados anteriores

    // Função recursiva para mostrar cada número com animação
    function mostrarNumero(index) {
        if (index >= numeros.length) return;

        const numeroDiv = document.createElement('div');
        numeroDiv.className = 'numero';
        resultadoDiv.appendChild(numeroDiv);

        // Animação de rotação
        let rollInterval = setInterval(() => {
            numeroDiv.textContent = Math.floor(Math.random() * 100);  // Mostra números aleatórios enquanto roda
        }, 100);

        // Pausa na posição sorteada após um tempo
        setTimeout(() => {
            clearInterval(rollInterval);
            numeroDiv.textContent = numeros[index];
            numeroDiv.classList.add('stop');

            // Chama a função recursivamente para o próximo número
            setTimeout(() => {
                mostrarNumero(index + 1);
            }, 500);  // Intervalo de 500ms entre a exibição dos números
        }, 3000);  // Roda o número por 3 segundos antes de parar
    }

    // Inicia a animação com o primeiro número
    mostrarNumero(0);
}

document.getElementById('sortear').addEventListener('click', function() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (isNaN(min) || isNaN(max) || isNaN(quantidade) || min < 0 || max > 99 || min >= max || quantidade < 1 || quantidade > (max - min + 1)) {
        alert('Por favor, insira um intervalo e quantidade válidos.');
        return;
    }

    const numerosSorteados = gerarNumerosAleatoriosSemRepeticao(min, max, quantidade);
    mostrarNumerosAnimados(numerosSorteados);
});
