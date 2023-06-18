const readlineSync = require('readline-sync');
const { clear } = require('console');
const {
  getRecursosTotais,
  getMatrizAlocados,
  getVetorRecursosAlocados,
  getVetorRecursosDisponiveis,
  getMatrizRecursosNecessarios,
  imprimirOsDados,
  algoritmoBanqueiro,
} = require('./funcoes');

function main() {
  console.log('################-Bankers algorithm-################');
  const qtdProcessos = parseInt(readlineSync.question('Quantos processos estão em execução? '));
  const qtdTiposRecursos = parseInt(readlineSync.question('Quantos tipos de recursos cada processo vai necessitar? '));

  const recursosTotais = getRecursosTotais(qtdTiposRecursos);

  const matrizAlocados = getMatrizAlocados(qtdProcessos, qtdTiposRecursos);

  const recursosAlocados = getVetorRecursosAlocados(matrizAlocados);

  const recursosDisponiveis = getVetorRecursosDisponiveis(recursosTotais, recursosAlocados);

  const matrizRecursosNecessarios = getMatrizRecursosNecessarios(qtdProcessos, qtdTiposRecursos);

  readlineSync.question('Pressione Enter para continuar.....');

  clear();

  imprimirOsDados(
    recursosTotais,
    matrizAlocados,
    recursosAlocados,
    recursosDisponiveis,
    matrizRecursosNecessarios
  );

  algoritmoBanqueiro(
    qtdProcessos,
    qtdTiposRecursos,
    recursosDisponiveis,
    matrizRecursosNecessarios,
    matrizAlocados
  );
}

if (require.main === module) {
  main();
}
