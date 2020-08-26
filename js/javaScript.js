// Constante de tamanho do jogo
const n = 30;
const m = 30;

// Variáveis para tabelas auxiliares
let genAtual = [n];
let proxGen = [m];

// Função inicial de construção de mundo
function constroi_mundo() {

    criaTabela(n, m);

    // Variável auxlliar para a probabilidade da célula ser viva ou morta
    let aux = 0;

    // Pegamos do HTML a área onde construiremos o jogo
    let areaJogo = document.querySelector('#areaJogo');

    let tabelaC = document.createElement('tabela');
    tabelaC.setAttribute('id', 'tabelaMundo');

    // Rodamos a tabela construída, inserindo os elementos
    for (let i = 0; i < n; i++) {
        let Row = document.createElement('tr');
        for (let j = 0; j < m; j++) {
            let Cell = document.createElement('td');
            Cell.setAttribute('id', i + '_' + j);
            
            // Calculamos um valor de 1 a 4 para a célula começar em vivo ou morta
            aux = Math.round(Math.random() * 4);

            // Caso seja 1, ela é viva
            if (aux == 1) {
                Cell.setAttribute('class', 'vivo');
                genAtual[i][j] = 1;
            } else { // Caso não, é morta
                Cell.setAttribute('class', 'morto');
            }

            Row.appendChild(Cell);
        }
        tabelaC.appendChild(Row);
    }
    areaJogo.appendChild(tabelaC);

}

// Criação da tabela
function criaTabela(n, m) {

    for (let i = 0; i < n; i++) {
        genAtual[i] = new Array(m);
        proxGen[i] = new Array(m);
    }

    i = 0;

    // Preenchemos ela de zeros para que possuam algum valor inicialmente
    for (i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            genAtual[i][j] = 0;
            proxGen[i][j] = 0;
        }
    }
}

// Contamos a quantidade de vizinhos vivos
function contaVizinho() {
    let cont = 0;
    let nLinha = Number(linha);
    let nCol = Number(coluna);

    // Não é primeira célula
    if (nLinha - 1 >= 0 && nCol - 1 >= 0) {
        // Vizinho diagonal superior esquerda
        if (genAtual[nLinha - 1][nCol - 1] == 1)
            cont++;
    }

    // Não é primeira linha
    if (nLinha - 1 >= 0) {
        // Vizinho de cima
        if (genAtual[nLinha - 1][nCol] == 1)
            cont++;
    }


    // Não é primeira linha última coluna
    if (nLinha - 1 >= 0 && nCol + 1 < m) {
        // Vizinho superior direita
        if (genAtual[nLinha - 1][nCol + 1] == 1)
            cont++;
    }

     // Não é canto inferior direito
     if (nCol + 1 < m) {
        // Vizinho da direita
        if (genAtual[nLinha][nCol + 1] == 1)
            cont++;
    }

    // Não é canto inferior direito
    if (nLinha + 1 < n && nCol < m) {
        // Vizinho inferior direito
        if (genAtual[nLinha + 1][nCol + 1] == 1)
            cont++;
    }

    // Não é última linha
    if (nLinha + 1 < n) {
        // Vizinho de baixo
        if (genAtual[nLinha + 1][nCol] == 1)
            cont++;
    }

    // Não é canto inferior esquerdo
    if (nLinha + 1 < n && nCol - 1 >= 0) {
        // Vizinho inferior esquerdo
        if (genAtual[nLinha + 1][nCol - 1] == 1)
            cont++;
    }

    // Não é primeira coluna
    if (nCol - 1 >= 0) {
        // Vizinho da esquerda
        if (genAtual[nLinha][nCol - 1] == 1)
            cont++;
    }

    return cont;
    
}

// Descobrimos a próxima geração
function proximaGen() {
    for (linha in genAtual) {
        for (coluna in genAtual[linha]) {
            let vizinhos = contaVizinho(linha, coluna);

            // Se a célula que estamos considerando estiver viva
            if (genAtual[linha][coluna] == 1) {

                // Se tiver menos que dois ou mais que três vizinhos, morre
                if (vizinhos < 2 || vizinhos > 3) {
                    proxGen[linha][coluna] = 0;
                } else { // Se não, continua viva
                    proxGen[linha][coluna] = 1;
                }

            } else { // Se ela estiver morta

                // Se tiver exatamente três vizinhos vivos
                if (vizinhos == 3) {
                    proxGen[linha][coluna] = 1;
                }
            }
        }
    }
}

// Atualizamos a geração: passamos os valores da matriz de gen atual para a nova, e zeramos a matriz da próxima gen
function atualizaGen() {
    for (linha in genAtual) {
        for (coluna in genAtual[linha]) {
            genAtual[linha][coluna] = proxGen[linha][coluna];
            proxGen[linha][coluna] = 0;
        }
    }
}

// Atualizamos o que temos na tela, trocando classes
function atualizaMundo () {
    let Cell = '';
    for (linha in genAtual) {
        for (coluna in genAtual[linha]) {
            Cell = document.getElementById(linha + '_' + coluna);
            if (genAtual[linha][coluna] == 0) {
                Cell.setAttribute('class', 'morto');
            } else {
                Cell.setAttribute('class', 'vivo');
            }
        }
    }
}

function rodada() {

    proximaGen();
    atualizaGen();
    atualizaMundo();

}