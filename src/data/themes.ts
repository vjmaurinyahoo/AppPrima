/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DidacticTheme, QuizQuestion } from '../types';
import { INITIAL_PICTOGRAMS } from './pictograms';

const getPic = (id: string) => INITIAL_PICTOGRAMS.find(p => p.id === id) || INITIAL_PICTOGRAMS[0];

export const PRESET_THEMES: DidacticTheme[] = [
  {
    id: 'ciclo_agua',
    title: 'O Ciclo da Água',
    subtitle: 'Ciências da Natureza • Evaporação, condensação e chuva',
    category: 'Ciências',
    originalContent: 'A água da Terra evapora com o calor do Sol e sobe para a atmosfera. No céu frio, o vapor vira nuvem. Quando as nuvens ficam muito pesadas, a água cai em forma de chuva e volta para os rios e mares.',
    sentences: [
      {
        id: 'ca_1',
        originalText: 'O Sol aquece a água dos rios e mares.',
        simplifiedText: 'O Sol esquenta a água.',
        pictograms: [getPic('s_sol'), getPic('v_esquentar'), getPic('s_agua')],
      },
      {
        id: 'ca_2',
        originalText: 'A água sobe para o céu e forma nuvens.',
        simplifiedText: 'A água vira nuvem no céu.',
        pictograms: [getPic('s_agua'), getPic('v_ir'), getPic('s_nuvem')],
      },
      {
        id: 'ca_3',
        originalText: 'A nuvem fica cheia e a chuva cai na Terra.',
        simplifiedText: 'A chuva cai na Terra.',
        pictograms: [getPic('s_nuvem'), getPic('v_chover'), getPic('s_terra')],
      },
    ],
    relatedQuizId: 'quiz_ciclo_agua',
  },
  {
    id: 'sistema_solar',
    title: 'O Nosso Planeta e o Sol',
    subtitle: 'Geografia & Astronomia • Terra, Sol e o dia/noite',
    category: 'Geografia',
    originalContent: 'O planeta Terra gira ao redor do Sol. O Sol é uma grande estrela que nos dá luz e calor. Quando um lado da Terra está de frente para o Sol é dia, e do outro lado é noite com a Lua no céu.',
    sentences: [
      {
        id: 'ss_1',
        originalText: 'O planeta Terra gira perto do Sol.',
        simplifiedText: 'A Terra precisa do Sol.',
        pictograms: [getPic('s_terra'), getPic('v_preciso'), getPic('s_sol')],
      },
      {
        id: 'ss_2',
        originalText: 'O Sol dá luz e deixa o dia quente.',
        simplifiedText: 'O Sol é quente e brilha.',
        pictograms: [getPic('s_sol'), getPic('d_quente'), getPic('v_ver')],
      },
      {
        id: 'ss_3',
        originalText: 'De noite vemos a Lua e as estrelas.',
        simplifiedText: 'De noite a Lua aparece.',
        pictograms: [getPic('s_lua'), getPic('v_ver'), getPic('d_calmo')],
      },
    ],
    relatedQuizId: 'quiz_sistema_solar',
  },
  {
    id: 'corpo_saude',
    title: 'O Corpo Humano e a Saúde',
    subtitle: 'Saúde e Cuidados • Alimentação, água e respiração',
    category: 'Saúde',
    originalContent: 'Nosso corpo precisa de água fresca todos os dias para funcionar bem. Comer frutas e vegetais nos dá energia para estudar e brincar. Quando respiramos fundo, cuidamos do nosso coração e da mente.',
    sentences: [
      {
        id: 'cs_1',
        originalText: 'Beber água limpa todos os dias é fundamental.',
        simplifiedText: 'Eu preciso beber água.',
        pictograms: [getPic('p_eu'), getPic('v_preciso'), getPic('v_beber'), getPic('s_agua')],
      },
      {
        id: 'cs_2',
        originalText: 'Comer alimentos saudáveis dá energia.',
        simplifiedText: 'Comer comida boa faz feliz.',
        pictograms: [getPic('v_comer'), getPic('s_comida'), getPic('d_bom'), getPic('d_feliz')],
      },
      {
        id: 'cs_3',
        originalText: 'O coração bate forte quando respiramos e nos movimentamos.',
        simplifiedText: 'Cuidar do coração e respirar.',
        pictograms: [getPic('s_coracao'), getPic('v_respirar'), getPic('d_calmo')],
      },
    ],
    relatedQuizId: 'quiz_corpo_saude',
  },
  {
    id: 'convivencia_escola',
    title: 'Convivência e Amizade na Escola',
    subtitle: 'Habilidades Sociais • Compartilhar, respeitar e falar',
    category: 'Social',
    originalContent: 'Na escola, aprendemos juntos com os colegas e professores. Quando precisamos de algo, podemos pedir por favor e agradecer com um sorriso. Ajudar um amigo faz a sala de aula ser um lugar alegre.',
    sentences: [
      {
        id: 'ce_1',
        originalText: 'Estudantes e professores aprendem juntos.',
        simplifiedText: 'Eu e professor aprendemos juntos.',
        pictograms: [getPic('p_eu'), getPic('p_professor'), getPic('v_aprendi')],
      },
      {
        id: 'ce_2',
        originalText: 'Pedir ajuda e agradecer é importante.',
        simplifiedText: 'Por favor e obrigado são palavras boas.',
        pictograms: [getPic('c_porfavor'), getPic('c_obrigado'), getPic('d_bom')],
      },
      {
        id: 'ce_3',
        originalText: 'Ajudar um colega deixa todo mundo feliz.',
        simplifiedText: 'Ajudar o amigo é muito legal.',
        pictograms: [getPic('v_ajudar'), getPic('p_amigo'), getPic('c_legal'), getPic('d_feliz')],
      },
    ],
    relatedQuizId: 'quiz_convivencia',
  },
];

export const PRESET_QUIZZES: Record<string, QuizQuestion[]> = {
  quiz_ciclo_agua: [
    {
      id: 'q_agua_1',
      themeId: 'ciclo_agua',
      prompt: 'O que esquenta a água dos rios e mares?',
      audioPrompt: 'O que esquenta a água dos rios e mares?',
      explanation: 'O Sol é quente e esquenta a água!',
      options: [
        { id: 'opt_1_1', label: 'O Sol', pictogram: getPic('s_sol'), isCorrect: true },
        { id: 'opt_1_2', label: 'A Lua', pictogram: getPic('s_lua'), isCorrect: false },
        { id: 'opt_1_3', label: 'O Lápis', pictogram: getPic('s_lapis'), isCorrect: false },
      ],
    },
    {
      id: 'q_agua_2',
      themeId: 'ciclo_agua',
      prompt: 'O que cai da nuvem quando ela fica pesada?',
      audioPrompt: 'O que cai da nuvem no céu?',
      explanation: 'A chuva cai da nuvem e molha a Terra!',
      options: [
        { id: 'opt_2_1', label: 'Pedras', pictogram: getPic('s_terra'), isCorrect: false },
        { id: 'opt_2_2', label: 'Chuva', pictogram: getPic('s_chuva'), isCorrect: true },
        { id: 'opt_2_3', label: 'Comida', pictogram: getPic('s_comida'), isCorrect: false },
      ],
    },
    {
      id: 'q_agua_3',
      themeId: 'ciclo_agua',
      prompt: 'Onde a chuva cai para molhar as plantas?',
      audioPrompt: 'Onde a chuva cai?',
      explanation: 'A chuva cai no planeta Terra e ajuda as plantas a crescer!',
      options: [
        { id: 'opt_3_1', label: 'Na Terra', pictogram: getPic('s_terra'), isCorrect: true },
        { id: 'opt_3_2', label: 'No Relógio', pictogram: getPic('s_relogio'), isCorrect: false },
      ],
    },
  ],
  quiz_sistema_solar: [
    {
      id: 'q_solar_1',
      themeId: 'sistema_solar',
      prompt: 'Qual astro ilumina o nosso dia e é bem quente?',
      audioPrompt: 'Qual astro ilumina o nosso dia e é quente?',
      explanation: 'O Sol brilha durante o dia e é muito quente!',
      options: [
        { id: 'opt_s1_1', label: 'O Sol', pictogram: getPic('s_sol'), isCorrect: true },
        { id: 'opt_s1_2', label: 'A Nuvem', pictogram: getPic('s_nuvem'), isCorrect: false },
      ],
    },
    {
      id: 'q_solar_2',
      themeId: 'sistema_solar',
      prompt: 'O que aparece no céu durante a noite?',
      audioPrompt: 'O que brilha no céu de noite?',
      explanation: 'A Lua aparece de noite no céu!',
      options: [
        { id: 'opt_s2_1', label: 'A Lua', pictogram: getPic('s_lua'), isCorrect: true },
        { id: 'opt_s2_2', label: 'A Árvore', pictogram: getPic('s_arvore'), isCorrect: false },
      ],
    },
  ],
  quiz_corpo_saude: [
    {
      id: 'q_corpo_1',
      themeId: 'corpo_saude',
      prompt: 'O que nosso corpo precisa beber todos os dias?',
      audioPrompt: 'O que nós devemos beber para ficar saudáveis?',
      explanation: 'Beber água limpa mantém nosso corpo hidratado e saudável!',
      options: [
        { id: 'opt_c1_1', label: 'Água', pictogram: getPic('s_agua'), isCorrect: true },
        { id: 'opt_c1_2', label: 'Chuva', pictogram: getPic('s_chuva'), isCorrect: false },
        { id: 'opt_c1_3', label: 'Lápis', pictogram: getPic('s_lapis'), isCorrect: false },
      ],
    },
  ],
  quiz_convivencia: [
    {
      id: 'q_conv_1',
      themeId: 'convivencia_escola',
      prompt: 'O que devemos dizer quando precisamos de algo?',
      audioPrompt: 'Qual palavra mágica usamos ao pedir algo?',
      explanation: 'Dizer Por Favor demonstra carinho e respeito com os colegas!',
      options: [
        { id: 'opt_cv1_1', label: 'Por Favor', pictogram: getPic('c_porfavor'), isCorrect: true },
        { id: 'opt_cv1_2', label: 'Não Gosto', pictogram: getPic('v_nao_gosto'), isCorrect: false },
      ],
    },
    {
      id: 'q_conv_2',
      themeId: 'convivencia_escola',
      prompt: 'Como os amigos se sentem quando nos ajudamos?',
      audioPrompt: 'Como fica o coração quando ajudamos um amigo?',
      explanation: 'Ajudar os outros nos deixa muito felizes!',
      options: [
        { id: 'opt_cv2_1', label: 'Feliz', pictogram: getPic('d_feliz'), isCorrect: true },
        { id: 'opt_cv2_2', label: 'Bravo / Triste', pictogram: getPic('d_triste'), isCorrect: false },
      ],
    },
  ],
};
