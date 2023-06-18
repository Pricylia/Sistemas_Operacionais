def circular(fila_processos, quantum, troca_contexto):
    turn_around = [0] * len(fila_processos)

    tempo_atual = 0
    while True:
        if sum (fila_processos) <= 0:
            print("Todos os processos foram executados!")
            break
        else:
            for i in range(len(fila_processos)):
                if fila_processos[i] <= 0:
                    print(f"\nP{i} Já Finalizado!")
                elif fila_processos[i] <= quantum:
                    tempo_atual += fila_processos[i]
                    fila_processos[i] -= fila_processos[i]

                    print(f"\nP{i} executa")
                    print(f"Termino em T-{tempo_atual}")
                    if fila_processos[i] == 0:
                        turn_around[i] = tempo_atual
                        print(f"Processo P{i} terminou em T-{tempo_atual}")
                        print("Troca de Contexto")
                        tempo_atual += troca_contexto
                else:
                    tempo_atual += quantum
                    fila_processos[i] -= quantum

                    print(f"\nP{i} executa")
                    print(f"Termino em T-{tempo_atual}")
                    print("Troca de Contexto")
                    tempo_atual += troca_contexto
                    turn_around[i] = tempo_atual
            print("-" * 30)

    print(f"Tempo onde terminou cada processo: {turn_around}")
    return turn_around

def tempo_atual_medio_turnround(lista_processos, lista_tempo):
    resultado = sum(lista_tempo) / (len(lista_processos))
    print(f"Tempo Medio de Turnround = {resultado:.2f}")

if __name__ == '__main__':
    fila_processos = [40, 20, 50, 30]
    quantum = 20
    troca_contexto = 5

    TurnAround = circular(fila_processos, quantum, troca_contexto)
    tempo_atual_medio_turnround(fila_processos, TurnAround)