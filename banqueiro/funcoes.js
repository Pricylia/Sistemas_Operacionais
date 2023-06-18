const readlineSync = require('readline-sync');
const { clear } = require('console');
const np = require('numpy');

function getRecursosTotais(qtd_tipos_recursos) {
  const recursos_totais = np.zeros(qtd_tipos_recursos, 'int64');
  for (let i = 0; i < qtd_tipos_recursos; i++) {
    const recurso = parseInt(readlineSync.question(`Digite a quantidade do recurso ${i + 1}:\n--> `));
    recursos_totais[i] += recurso;
  }

  console.log('\nVetor de recursos existentes E =', recursos_totais);
  console.log();

  return recursos_totais;
}

function getMatrizAlocados(qtd_processos, qtd_tipos_recursos) {
  const matriz_alocados = np.zeros([qtd_processos, qtd_tipos_recursos], 'int64');
  for (let i = 0; i < matriz_alocados.length; i++) {
    for (let j = 0; j < matriz_alocados[i].length; j++) {
      matriz_alocados[i][j] += parseInt(
        readlineSync.question(`Digite a quantidade do recurso ${j + 1} alocada para o processo ${i + 1}:\n--> `)
      );
    }
  }

  console.log('\nMatriz de recursos alocados a cada processo C =\n', matriz_alocados);
  console.log();

  return matriz_alocados;
}

function getVetorRecursosAlocados(matriz_alocados) {
  const recursos_alocados = np.zeros(matriz_alocados[0].length, 'int64');
  for (let i = 0; i < matriz_alocados.length; i++) {
    for (let j = 0; j < matriz_alocados[i].length; j++) {
      recursos_alocados[j] += matriz_alocados[i][j];
    }
  }

  console.log();

  return recursos_alocados;
}

function getVetorRecursosDisponiveis(recursos_totais, recursos_alocados) {
  const recursos_disponiveis = recursos_totais - recursos_alocados;
  console.log('\nVetor de recursos disponíveis A =\n', recursos_disponiveis);
  console.log();

  return recursos_disponiveis;
}

function getMatrizRecursosNecessarios(qtd_processos, qtd_tipos_recursos) {
  const matriz_recursos_necessarios = np.zeros([qtd_processos, qtd_tipos_recursos], 'int64');
  for (let i = 0; i < qtd_processos; i++) {
    for (let j = 0; j < qtd_tipos_recursos; j++) {
      const recurso_necessario = parseInt(
        readlineSync.question(`Digite a quantidade do recurso ${j + 1} que é necessário ao processo ${i + 1}:\n--> `)
      );
      matriz_recursos_necessarios[i][j] += recurso_necessario;
    }
  }

  console.log('\nMatriz de recursos necessarios a cada processo R =\n', matriz_recursos_necessarios);
  console.log();

  return matriz_recursos_necessarios;
}

function imprimirOsDados(
  recursos_totais,
  matriz_alocados,
  recursos_alocados,
  recursos_disponiveis,
  matriz_recursos_necessarios
) {
  console.log('Recursos totais E =\n', recursos_totais);
  console.log();
  console.log('Recursos alocados a cada processo C =\n', matriz_alocados);
  console.log();
  console.log('Vetor de recursos alocados P =\n', recursos_alocados);
  console.log();
  console.log('Vetor de recursos disponiveis A =\n', recursos_disponiveis);
  console.log();
  console.log('Matriz de recursos necessarios R =\n', matriz_recursos_necessarios);
  console.log();
  readlineSync.question('Pressione Enter para continuar.....');
  clear();
}

function algoritmoBanqueiro(
  qtd_processos,
  qtd_tipos_recursos,
  recursos_disponiveis,
  matriz_recursos_necessarios,
  matriz_alocados
) {
  const rodando = np.ones(qtd_processos, 'int64');

  while (np.count_nonzero(rodando) > 0) {
    let alocou_recursos = false;
    for (let num_processo = 0; num_processo < qtd_processos; num_processo++) {
      if (rodando[num_processo] !== 0) {
        if (
          np.all(
            recursos_disponiveis.subtract(
              matriz_recursos_necessarios[num_processo].subtract(matriz_alocados[num_processo])
            )
            .greaterEqual(0)
          )
        ) {
          alocou_recursos = true;
          console.log(`Processo ${num_processo + 1} está rodando`);
          readlineSync.question('Pressione Enter para prosseguir......\n');
          rodando[num_processo] = 0;
          recursos_disponiveis = recursos_disponiveis.add(matriz_alocados[num_processo]);
          matriz_alocados[num_processo] = np.zeros(qtd_tipos_recursos, 'int64');
          console.log('Recursos Disponíveis A =\n', recursos_disponiveis);
          console.log();
          console.log('Recursos Necessários R =\n', matriz_alocados);
          console.log();
        }
      }
    }

    if (!alocou_recursos) {
      console.log('--> Os processos entrarão em Deadlock');
      process.exit();
    }
  }

  console.log('--> Os processos não entrarão em Deadlock.');
}

module.exports = {
  getRecursosTotais,
  getMatrizAlocados,
  getVetorRecursosAlocados,
  getVetorRecursosDisponiveis,
  getMatrizRecursosNecessarios,
  imprimirOsDados,
  algoritmoBanqueiro,
};
