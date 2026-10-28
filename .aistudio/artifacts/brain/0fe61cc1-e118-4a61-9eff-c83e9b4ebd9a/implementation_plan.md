# Prisma: Aprender & Expressar — Plano de Implementação & Especificação de Requisitos

O **Prisma: Aprender & Expressar** é uma plataforma digital de Tecnologia Assistiva (TA) e Comunicação Aumentativa e Alternativa (CAA), desenhada para transformar barreiras comunicativas e de aprendizagem em pontes de participação ativa para estudantes não-verbais, autistas, com paralisia cerebral, deficiência intelectual ou dislexia profunda.

---

## Decisões Críticas de Produto & Design Assistivo

> [!IMPORTANT]
> **Padrões de Comunicação Aumentativa e Alternativa (CAA):**
> 1. **Sistema de Cores de Fitzgerald Modificado**: Adoção de categorização semântica universal nas pranchas e pictogramas (Amarelo para Pessoas/Pronomes, Verde para Verbos/Ações, Laranja para Substantivos/Objetos, Azul para Adjetivos/Descritores, Rosa/Roxo para Social/Expressão).
> 2. **Feedback Multimodal Imediato**: Cada toque em pictograma oferece feedback tátil/visual imediato (borda de foco de alto contraste e micro-animação) e auditivo opcional.
> 3. **Síntese de Voz Nativa com Resiliência**: Uso da Web Speech API (`speechSynthesis`) com vozes em Português do Brasil (pt-BR), com taxa de fala ajustável e botões visuais de "Repetir" e "Parar".
> 4. **Acessibilidade Motor-Cognitiva**: Botões com área de toque mínima de 48px a 64px, espaçamento generoso, suporte a navegação por teclado (tab/enter) e modo de alto contraste para baixa visão ou sobrecarga sensorial.

---

## 1. Problema que o Aplicativo Resolve

Nas salas de aula e ambientes terapêuticos inclusivos, estudantes com deficiência intelectual, transtorno do espectro autista (TEA nível 3 / não-verbal), paralisia cerebral e dificuldades severas de leitura e escrita enfrentam quatro grandes barreiras:
1. **Barreira de Entrada do Conteúdo (Input)**: Textos didáticos curriculares são longos, densos, abstratos e inacessíveis para quem não decodifica a linguagem escrita tradicional.
2. **Barreira de Expressão e Voz (Output)**: A incapacidade de verbalizar ou redigir frases gera isolamento, frustração e a falsa impressão pedagógica de incapacidade cognitiva.
3. **Barreira de Interação Dinâmica em Tempo Real**: Falta de ferramentas imediatas para pedir ajuda ("não entendi", "quero ir ao banheiro", "preciso de uma pausa", "sim / não") no mesmo ritmo da dinâmica da turma.
4. **Invisibilidade da Evolução Pedagógica**: Dificuldade para educadores, mediadores escolares e fonoaudiólogos registrarem, auditarem e comprovarem qualitativa e quantitativamente o avanço do aluno nas atividades curriculares.

O **Prisma** resolve esses desafios ao unificar em uma interface amigável a simplificação inteligente de textos curriculares com pictogramas, uma prancha de construção frasal preditiva com voz e um registro pedagógico contínuo.

---

## 2. Público Principal

### Usuários Finais (Estudantes)
- **Crianças e jovens não-verbais ou com fala minimamente funcional** (Autismo, Paralisia Cerebral, Apraxia da Fala).
- **Estudantes com Deficiência Intelectual (DI)** que necessitam de apoio visual concreto (pictogramas e leitura fácil) para assimilação de conceitos.
- **Estudantes com dislexia severa ou analfabetismo funcional transitório** em processo de alfabetização multissensorial.

### Mediadores e Co-usuários (Facilitadores)
- **Professores da Sala de Recursos Multifuncionais (AEE)** e professores regentes da sala de aula comum.
- **Fonoaudiólogos e Terapeutas Ocupacionais** que elaboram rotinas e pranchas de CAA.
- **Família e cuidadores** no suporte aos estudos e tarefas de casa.

---

## 3. Requisitos Funcionais Detalhados

### Módulo 1: Modo Compreensão (IA + Leitura Fácil + Pictogramas)
- **Entrada de Conteúdo Flexível**: Inserção de texto didático via digitação, colagem ou seleção de temas pré-carregados (ex: *Ciclo da Água*, *Sistema Solar*, *Animais e Ecossistemas*, *História do Brasil*, *Corpo Humano*).
- **Simplificação Cognitiva via Gemini**:
  - Conversão de parágrafos complexos para frases no padrão de Leitura Fácil (ordem direta: Sujeito + Verbo + Predicado, vocabulário concreto, sem metáforas).
  - Geração ou mapeamento automático de palavras-chave para **pictogramas ilustrativos** contextualizados.
  - Visualização frase-a-frase ou em cartões visuais sequenciais.
- **Leitura em Voz Alta Integrada**: Reprodução pausada com destaque visual sincronizado da sentença ativa.

### Módulo 2: Modo Expressão (Pranchas Dinâmicas de Estudo CAA)
- **Tira de Frases (Sentence Strip)**: Área superior onde os pictogramas selecionados pelo estudante são enfileirados em sequência lógica.
- **Prancha de Pictogramas Organizada por Categorias semânticas (Chave de Fitzgerald)**:
  - *Pessoas / Sujeitos* (Eu, Colega, Professor, Família).
  - *Ações / Verbos* (Quero, Acho, Gosto, Aprendi, Fazer, Ver, Comer).
  - *Substantivos / Conceitos do Tema* (ex: Água, Nuvem, Chuva, Sol, Terra).
  - *Qualificadores / Sentimentos* (Feliz, Difícil, Fácil, Quente, Frio).
  - *Conectivos e Apoio* (Sim, Não, Mais, Porque).
- **Edição e Manuseio da Frase**: Remoção do último pictograma, botão "Limpar Frase" e reorganização intuitiva.
- **Fala Frasal Imediata**: Botão "Falar Frase" com síntese vocal contínua.

### Módulo 3: Sinalização & Respostas Rápidas de Sala de Aula
- **Painel de Acesso Rápido com 1 Toque**:
  - Respostas imediatas: **Sim** (Verde), **Não** (Vermelho), **Talvez / Não Sei** (Amarelo).
  - Necessidades essenciais: **Banheiro**, **Água**, **Preciso de Pausa / Calma**.
  - Interação de aula: **Quero Falar / Levantar Mão**, **Não Entendi / Repetir**, **Ajuda**.
- **Modo Sinalizador de Tela Cheia**: Ao tocar, exibe o cartão em tamanho gigante com cor de fundo marcante e áudio para chamar a atenção do professor à distância sem sobrecarga sonora.

### Módulo 4: Atividades & Quizzes Acessíveis
- **Questões Baseadas em Imagens e Pictogramas**:
  - Pergunta contextualizada (lida por voz e com pictograma).
  - Opções de resposta em grade com 2 a 4 cartões visuais grandes e autoexplicativos.
  - Feedback visual positivo, sem sons punitivos ou frustrantes (reforço positivo, indicação gentil para tentar novamente).
- **Temas Didáticos Integrados com o Modo Compreensão**: Se o aluno estudou "O Ciclo da Água", o quiz correlato é acionado diretamente com os mesmos pictogramas aprendidos.

### Módulo 5: Registro de Interações & Validação Pedagógica (Painel do Educador)
- **Log Automático de Atividades**:
  - Frases construídas pelo estudante com carimbo de data/hora e tema trabalhado.
  - Tentativas e acertos nos quizzes com indicação de autonomia (com/sem repetição de instrução).
  - Sinalizações e solicitações mais frequentes.
- **Relatório de Evolução**:
  - Exportação e visualização limpa do relatório de uso pedagógico para reuniões de PEI (Plano de Desenvolvimento Individual) e alinhamento com fonoaudiologia.

---

## 4. Arquitetura Técnica e Fluxos de Dados

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PRISMA: APRENDER & EXPRESSAR                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────┐ │
│  │   MODO COMPREENSÃO    │  │    MODO EXPRESSÃO     │  │ SINALIZAÇÃO │ │
│  │  (Simplificação IA)   │  │ (Prancha Dinâmica CAA)│  │ (Sala Aula) │ │
│  └───────────┬───────────┘  └───────────┬───────────┘  └──────┬──────┘ │
│              │                          │                     │        │
│              ▼                          ▼                     ▼        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                   MOTOR MULTIMODAL & ESTADO                      │  │
│  │  • Gemini API: Simplificação & Extração Semântica                │  │
│  │  • Web Speech API: Síntese de Voz pt-BR                          │  │
│  │  • Acervo de Pictogramas ARASAAC/Símbolos SVG Estruturados        │  │
│  │  • Histórico Pedagógico em LocalStorage (Persistência Resiliente) │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     ▼                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                 PAINEL DE VALIDAÇÃO PEDAGÓGICA                   │  │
│  │  • Registro de Frases Montadas    • Métricas de Quizzes AEE      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Critérios de Teste e Validação da Versão 1 (MVP)

1. **Compreensão de Texto**: Inserir um parágrafo complexo (ex: definição científica de fotossíntese); a IA deve reduzi-lo a 3 frases simples com sujeito-verbo-objeto e associar pictogramas relevantes com coerência temática.
2. **Construção Frasal e TTS**: O usuário deve conseguir compor uma sentença de 3 a 5 pictogramas ("Eu" + "Quero" + "Aprender" + "Ciências") e ouvir a pronúncia fluida em pt-BR com um único clique.
3. **Comunicação Imediata de Sala**: O painel de resposta rápida deve alternar para tela cheia e vocalizar "Preciso de ajuda" em menos de 100ms após o toque.
4. **Acessibilidade Motora**: Todos os cartões interativos devem responder a toque com área superior a 56px e funcionar integralmente via teclado (`Tab` e `Enter/Space`).
5. **Auditoria Pedagógica**: Toda frase emitida e atividade respondida deve aparecer instantaneamente no registro pedagógico com horário e contexto corretos.
