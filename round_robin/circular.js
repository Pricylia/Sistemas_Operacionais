function circular(fila_processos, quantum, troca_contexto) {
  var turn_around = new Array(fila_processos.length).fill(0);

  var tempo_atual = 0;
  while (true) {
    if (fila_processos.reduce((a, b) => a + b, 0) <= 0) {
      console.log("Todos os processos foram executados!");
      break;
    } else {
      for (var i = 0; i < fila_processos.length; i++) {
        if (fila_processos[i] <= 0) {
          console.log(`\nP${i} Já Finalizado!`);
        } else if (fila_processos[i] <= quantum) {
          tempo_atual += fila_processos[i];
          fila_processos[i] -= fila_processos[i];

          console.log(`\nP${i} executa`);
          console.log(`Termino em T-${tempo_atual}`);
          if (fila_processos[i] === 0) {
            turn_around[i] = tempo_atual;
            console.log(`Processo P${i} terminou em T-${tempo_atual}`);
            console.log("Troca de Contexto");
            tempo_atual += troca_contexto;
          }
        } else {
          tempo_atual += quantum;
          fila_processos[i] -= quantum;

          console.log(`\nP${i} executa`);
          console.log(`Termino em T-${tempo_atual}`);
          console.log("Troca de Contexto");
          tempo_atual += troca_contexto;
          turn_around[i] = tempo_atual;
        }
      }
      console.log("-".repeat(30));
    }
  }

  console.log(`Tempo onde terminou cada processo: ${turn_around}`);
  return turn_around;
}

function tempo_atual_medio_turnround(lista_processos, lista_tempo) {
  var resultado =
    lista_tempo.reduce((a, b) => a + b, 0) / lista_processos.length;
  console.log(`Tempo Medio de Turnround = ${resultado.toFixed(2)}`);
}

var fila_processos = [40, 20, 50, 30];
var quantum = 20;
var troca_contexto = 5;

var TurnAround = circular(fila_processos, quantum, troca_contexto);
tempo_atual_medio_turnround(fila_processos, TurnAround);
