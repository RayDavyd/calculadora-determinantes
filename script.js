function excluirLinhas(){
  const divs = document.querySelectorAll('div.linha');
  divs.forEach(div => div.remove());
}

function gerarMatriz(){
  let div_matriz = document.getElementById('matriz');
  let ordem = parseInt(document.getElementById('ordem-matriz').value);
  if (isNaN(ordem) || ordem <= 0) {
    ordem = 1; // valor padrão
  }
  excluirLinhas();
  for(let i=0; i<ordem; i++){
    let linha = document.createElement('div');
    linha.className = "linha";
    for(let j=0; j<ordem; j++){
      let elemento = document.createElement('div');
      elemento.className = "elemento";
      input_elemento = document.createElement('input');
      input_elemento.className = "input-elemento";
      input_elemento.setAttribute('maxlength', '3');
      elemento.appendChild(input_elemento);
      linha.appendChild(elemento);
    }
    div_matriz.appendChild(linha);
  }
}

function preencherMatriz() {
  let ordem = parseInt(document.getElementById('ordem-matriz').value);
  let elementos = document.querySelectorAll('.input-elemento');
  let matriz = [];
  for (let i = 0; i < ordem; i++) {
    matriz[i] = Array(ordem).fill().map((_, j) => {
      let index = i * ordem + j;
      return elementos[index] ? parseFloat(elementos[index].value) : 0;
    });
  }
  return matriz;
}


function criarSubmatriz(ordem, matriz, linhaRemovida, colunaRemovida) {
  let submatriz = [];
  let linhaSubmatriz = 0;

  for (let linha = 0; linha < ordem; linha++) {
    if (linha === linhaRemovida) {
      continue;
    }

    submatriz[linhaSubmatriz] = [];
    let colunaSubmatriz = 0;

    for (let coluna = 0; coluna < ordem; coluna++) {
      if (coluna === colunaRemovida) {
        continue;
      }
      submatriz[linhaSubmatriz][colunaSubmatriz] = matriz[linha][coluna];
      colunaSubmatriz++;
    }
    linhaSubmatriz++;
  }
  return submatriz;
}

function laplace(ordem, matriz) {

  if (ordem === 1) {
    return matriz[0][0];
  }

  if (ordem === 2) {
    return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
  }

  let determinante = 0;

  for (let coluna = 0; coluna < ordem; coluna++) {
    let submatriz = criarSubmatriz(ordem, matriz, 0, coluna);

    let sinalDoCofator;
    if (coluna % 2 === 0) {
      sinalDoCofator = 1;
    } else {
      sinalDoCofator = -1;
    }
    console.log('teste');
    determinante += matriz[0][coluna] * sinalDoCofator * laplace(ordem - 1, submatriz);
  }

  return determinante;
}

function vandermonde(ordem, matriz) {

  let vet = [];
  for (let i = 0; i < ordem; i++) {
    vet.push(matriz[1][i]);
  }

  let det = 1;

  for (let i = 0; i < ordem; i++) {
    for (let j = i + 1; j < ordem; j++) {
      det *= (vet[j] - vet[i]);
    }
  }
  return det;
}
function calcularDeterminante(){
  let ordem = parseInt(document.getElementById('ordem-matriz').value);
  let matriz_inicial = preencherMatriz();

  let laplace_button = document.getElementById('input-laplace');
  if(laplace_button.checked){
    // console.log(criarSubmatriz(ordem, matriz_inicial, 0, 0));
    document.getElementById('valor-resultado').innerHTML =  laplace(ordem, matriz_inicial);
  }else{
    document.getElementById('valor-resultado').innerHTML = vandermonde(ordem, matriz_inicial);
  }
}

document.getElementById('ordem-matriz').addEventListener('input', gerarMatriz);
gerarMatriz();