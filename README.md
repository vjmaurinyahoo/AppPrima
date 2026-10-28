# 🧩 Prisma: Aprender & Expressar

Uma plataforma web de **Tecnologia Assistiva (TA)** e **Comunicação Aumentativa e Alternativa (CAA)** desenvolvida para apoiar estudantes não-verbais, autistas, com deficiência intelectual ou dificuldades severas de leitura e escrita.

---

## 🚀 Recursos Implementados

### 1. 📖 Modo Compreensão (Leitura Fácil & Pictogramas)
* **Temas didáticos pré-configurados:** Conteúdos adaptados com períodos curtos e objetivos (*O Ciclo da Água*, *O Sistema Solar*, *O Corpo Humano e a Saúde*, *Convivência na Escola*).
* **Simplificador por IA:** Campo livre para o educador colar textos de aula e convertê-los instantaneamente em frases associadas a pictogramas.
* **Síntese Vocal (TTS):** Reprodução em português brasileiro (`pt-BR`) com destaque visual e botão para transferir a frase diretamente para a prancha CAA.

---

### 2. 🔤 Modo Expressão (Prancha Dinâmica CAA & Tira de Frase)
* **Tira de Frase (*Sentence Strip*):** Área interativa para encadeamento de símbolos, contagem de elementos, exclusão seletiva e vocalização contínua.
* **Acervo Curado:** Símbolos organizados pelas cores da **Chave de Fitzgerald Modificada**:
  * 🟡 *Amarelo:* Pessoas / Pronomes
  * 🟢 *Verde:* Ações / Verbos
  * 🟠 *Laranja:* Substantivos
  * 🔵 *Azul:* Adjetivos / Estados
  * 🟣 *Rosa / Roxo:* Social / Cortesia
  * ⚪ *Cinza:* Conexões
* **Personalização:** Filtros por categoria, barra de pesquisa rápida e opção para cadastrar novos símbolos personalizados pelo professor ou terapeuta.

---

### 3. 🚨 Sinalização Rápida de Sala de Aula
* **Acesso Imediato:** Cartões de toque único para necessidades essenciais (*Sim*, *Não*, *Banheiro*, *Água*, *Pausa / Calma*, *Não Entendi*, *Quero Falar*, *Ajuda*, *Dor*, *Terminei*).
* **Modo Tela Cheia de Alta Visibilidade:** Exibe o cartão em tamanho gigante com cores de alto contraste (ideal para visualização à distância), acompanhado de voz sintetizada e alerta auditivo suave.

---

### 4. 🧠 Quizzes Acessíveis Baseados em Imagens
* **Atividades Formativas:** Questões com cartões visuais amplos, leitura em voz alta do enunciado e opções autoexplicativas.
* **Reforço Positivo:** Feedback amigável com arpeggio harmônico via Web Audio API, evitando sons punitivos ou frustrantes em tentativas incorretas.

---

### 5. 📊 Painel do Educador & Registro Pedagógico
* **Auditoria em Tempo Real:** Carimbo de data e hora para cada frase construída, sinalização acionada e tentativa em quiz.
* **Métricas de Desempenho:** Indicadores de total de falas, solicitações essenciais e taxa de autonomia na primeira tentativa.
* **Exportação de Dados:** Download dos registros em formato **CSV (Planilha)** e **JSON** para reuniões de Plano de Ensino Individualizado (PEI), com persistência automática no `localStorage`.

---

### 6. ♿ Acessibilidade Inclusiva & Design DUA
* **Design Universal para a Aprendizagem (DUA):** Alvos de toque estendidos com áreas mínimas superiores a `56px`.
* **Modo de Alto Contraste:** Acionável diretamente pela barra superior.
* **Controles Multissensoriais:** Ajuste fino de velocidade de voz (`0.7x`, `1.0x` e `1.2x`) e seletor de efeitos sonoros.
