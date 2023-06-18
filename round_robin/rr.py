import matplotlib.pyplot as plt

# Definindo as tarefas
tarefas = [
    {"ingresso": 5, "duracao": 30, "prioridade": 4},
    {"ingresso": 15, "duracao": 10, "prioridade": 2},
    {"ingresso": 10, "duracao": 40, "prioridade": 1},
    {"ingresso": 0, "duracao": 20, "prioridade": 3}
]

# Configurações do escalonamento
quantum = 15
troca_contexto = 4

# Executando o escalonamento Round-Robin
tempo_atual = 0
tempos_espera = []
tempos_vida = []
tempos_execucao = []

while tarefas:
    tarefa_atual = tarefas.pop(0)
    inicio_execucao = max(tarefa_atual["ingresso"], tempo_atual)
    duracao_execucao = min(tarefa_atual["duracao"], quantum)

    tempos_execucao.append((inicio_execucao, duracao_execucao))
    tempos_espera.append(inicio_execucao - tarefa_atual["ingresso"])
    tempos_vida.append(duracao_execucao)

    tarefa_atual["duracao"] -= duracao_execucao
    tempo_atual = inicio_execucao + duracao_execucao + troca_contexto

    if tarefa_atual["duracao"] > 0:
        tarefas.append(tarefa_atual)

# Calculando os tempos médios de espera e de vida
tempo_medio_espera = sum(tempos_espera) / len(tempos_espera)
tempo_medio_vida = sum(tempos_vida) / len(tempos_vida)

# Imprimindo os tempos médios
print("Tempo médio de espera:", tempo_medio_espera)
print("Tempo médio de vida:", tempo_medio_vida)

# Plotando o gráfico da sequência de execução das tarefas
fig, ax = plt.subplots()

for i, (inicio, duracao) in enumerate(tempos_execucao):
    ax.broken_barh([(inicio, duracao)], (10 * i, 9), facecolors='tab:blue')

ax.set_xlabel('Tempo')
ax.set_ylabel('Tarefa')
ax.set_yticks([10 * i + 5 for i in range(len(tarefas))])
ax.set_yticklabels([f'Tarefa {i+1}' for i in range(len(tarefas))])
ax.grid(True)

plt.show()