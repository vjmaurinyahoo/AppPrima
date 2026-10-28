/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FitzgeraldCategory, Pictogram } from '../types';

export interface CategoryTheme {
  name: string;
  description: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  cardBg: string;
  cardHover: string;
  cardBorder: string;
  activeRing: string;
}

export const FITZGERALD_CATEGORIES: Record<FitzgeraldCategory, CategoryTheme> = {
  people: {
    name: 'Pessoas e Pronomes',
    description: 'Quem realiza ou participa da ação',
    badgeBg: 'bg-amber-100',
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-950',
    cardBg: 'bg-amber-50',
    cardHover: 'hover:bg-amber-100/90',
    cardBorder: 'border-amber-400',
    activeRing: 'ring-amber-500',
  },
  actions: {
    name: 'Ações e Verbos',
    description: 'O que está sendo feito ou sentido',
    badgeBg: 'bg-emerald-100',
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-emerald-950',
    cardBg: 'bg-emerald-50',
    cardHover: 'hover:bg-emerald-100/90',
    cardBorder: 'border-emerald-400',
    activeRing: 'ring-emerald-500',
  },
  nouns: {
    name: 'Coisas e Conceitos',
    description: 'Objetos, elementos naturais e lugares',
    badgeBg: 'bg-orange-100',
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-950',
    cardBg: 'bg-orange-50',
    cardHover: 'hover:bg-orange-100/90',
    cardBorder: 'border-orange-400',
    activeRing: 'ring-orange-500',
  },
  descriptors: {
    name: 'Adjetivos e Estados',
    description: 'Qualidades, sentimentos e condições',
    badgeBg: 'bg-sky-100',
    badgeBorder: 'border-sky-300',
    badgeText: 'text-sky-950',
    cardBg: 'bg-sky-50',
    cardHover: 'hover:bg-sky-100/90',
    cardBorder: 'border-sky-400',
    activeRing: 'ring-sky-500',
  },
  social: {
    name: 'Social e Cortesia',
    description: 'Cumprimentos, pedidos e sentimentos',
    badgeBg: 'bg-rose-100',
    badgeBorder: 'border-rose-300',
    badgeText: 'text-rose-950',
    cardBg: 'bg-rose-50',
    cardHover: 'hover:bg-rose-100/90',
    cardBorder: 'border-rose-400',
    activeRing: 'ring-rose-500',
  },
  connectors: {
    name: 'Apoio e Conexões',
    description: 'Conectivos, números e perguntas',
    badgeBg: 'bg-slate-100',
    badgeBorder: 'border-slate-300',
    badgeText: 'text-slate-900',
    cardBg: 'bg-slate-50',
    cardHover: 'hover:bg-slate-100/90',
    cardBorder: 'border-slate-300',
    activeRing: 'ring-slate-500',
  },
};

export const INITIAL_PICTOGRAMS: Pictogram[] = [
  // 1. PESSOAS & PRONOMES (Amarelo)
  { id: 'p_eu', label: 'Eu', category: 'people', iconName: 'User' },
  { id: 'p_voce', label: 'Você', category: 'people', iconName: 'UserCheck' },
  { id: 'p_professor', label: 'Professor', category: 'people', iconName: 'GraduationCap' },
  { id: 'p_professora', label: 'Professora', category: 'people', iconName: 'Sparkles' },
  { id: 'p_colega', label: 'Colega', category: 'people', iconName: 'Users' },
  { id: 'p_amigo', label: 'Amigo', category: 'people', iconName: 'HeartHandshake' },
  { id: 'p_familia', label: 'Família', category: 'people', iconName: 'Home' },
  { id: 'p_aluno', label: 'Estudante', category: 'people', iconName: 'BookOpen' },

  // 2. AÇÕES & VERBOS (Verde)
  { id: 'v_quero', label: 'Quero', category: 'actions', iconName: 'Hand' },
  { id: 'v_aprendi', label: 'Aprendi', category: 'actions', iconName: 'Brain' },
  { id: 'v_gosto', label: 'Gosto', category: 'actions', iconName: 'ThumbsUp' },
  { id: 'v_nao_gosto', label: 'Não Gosto', category: 'actions', iconName: 'ThumbsDown' },
  { id: 'v_ver', label: 'Ver', category: 'actions', iconName: 'Eye' },
  { id: 'v_ouvir', label: 'Ouvir', category: 'actions', iconName: 'Ear' },
  { id: 'v_falar', label: 'Falar', category: 'actions', iconName: 'Volume2' },
  { id: 'v_ajudar', label: 'Ajudar', category: 'actions', iconName: 'LifeBuoy' },
  { id: 'v_beber', label: 'Beber', category: 'actions', iconName: 'CupSoda' },
  { id: 'v_comer', label: 'Comer', category: 'actions', iconName: 'Utensils' },
  { id: 'v_ir', label: 'Ir', category: 'actions', iconName: 'MoveRight' },
  { id: 'v_parar', label: 'Parar', category: 'actions', iconName: 'Square' },
  { id: 'v_ler', label: 'Ler', category: 'actions', iconName: 'BookMarked' },
  { id: 'v_escrever', label: 'Desenhar/Escrever', category: 'actions', iconName: 'PenTool' },
  { id: 'v_brincar', label: 'Brincar', category: 'actions', iconName: 'Smile' },
  { id: 'v_preciso', label: 'Preciso', category: 'actions', iconName: 'AlertCircle' },
  { id: 'v_esquentar', label: 'Esquentar', category: 'actions', iconName: 'Flame' },
  { id: 'v_chover', label: 'Chover', category: 'actions', iconName: 'CloudRain' },
  { id: 'v_respirar', label: 'Respirar', category: 'actions', iconName: 'Wind' },

  // 3. SUBSTANTIVOS & CONCEITOS DIDÁTICOS (Laranja)
  { id: 's_agua', label: 'Água', category: 'nouns', iconName: 'Droplet' },
  { id: 's_sol', label: 'Sol', category: 'nouns', iconName: 'Sun' },
  { id: 's_nuvem', label: 'Nuvem', category: 'nouns', iconName: 'Cloud' },
  { id: 's_chuva', label: 'Chuva', category: 'nouns', iconName: 'CloudRain' },
  { id: 's_rio', label: 'Rio/Mar', category: 'nouns', iconName: 'Waves' },
  { id: 's_terra', label: 'Planeta Terra', category: 'nouns', iconName: 'Globe' },
  { id: 's_lua', label: 'Lua', category: 'nouns', iconName: 'Moon' },
  { id: 's_arvore', label: 'Árvore/Planta', category: 'nouns', iconName: 'Trees' },
  { id: 's_animal', label: 'Animal', category: 'nouns', iconName: 'PawPrint' },
  { id: 's_escola', label: 'Escola', category: 'nouns', iconName: 'Building2' },
  { id: 's_banheiro', label: 'Banheiro', category: 'nouns', iconName: 'Bath' },
  { id: 's_livro', label: 'Livro', category: 'nouns', iconName: 'Book' },
  { id: 's_lapis', label: 'Lápis/Material', category: 'nouns', iconName: 'Pencil' },
  { id: 's_comida', label: 'Comida/Lanche', category: 'nouns', iconName: 'Apple' },
  { id: 's_relogio', label: 'Hora/Tempo', category: 'nouns', iconName: 'Clock' },
  { id: 's_corpo', label: 'Corpo', category: 'nouns', iconName: 'Activity' },
  { id: 's_coracao', label: 'Coração', category: 'nouns', iconName: 'Heart' },

  // 4. ADJETIVOS & ESTADOS (Azul)
  { id: 'd_feliz', label: 'Feliz', category: 'descriptors', iconName: 'Smile' },
  { id: 'd_triste', label: 'Triste', category: 'descriptors', iconName: 'Frown' },
  { id: 'd_cansado', label: 'Cansado', category: 'descriptors', iconName: 'BatteryLow' },
  { id: 'd_calmo', label: 'Calmo', category: 'descriptors', iconName: 'Coffee' },
  { id: 'd_quente', label: 'Quente', category: 'descriptors', iconName: 'ThermometerSun' },
  { id: 'd_frio', label: 'Frio', category: 'descriptors', iconName: 'ThermometerSnowflake' },
  { id: 'd_facil', label: 'Fácil', category: 'descriptors', iconName: 'CheckCircle' },
  { id: 'd_dificil', label: 'Difícil', category: 'descriptors', iconName: 'HelpCircle' },
  { id: 'd_grande', label: 'Grande', category: 'descriptors', iconName: 'Maximize2' },
  { id: 'd_pequeno', label: 'Pequeno', category: 'descriptors', iconName: 'Minimize2' },
  { id: 'd_bom', label: 'Muito Bom', category: 'descriptors', iconName: 'Star' },
  { id: 'd_muito', label: 'Muito', category: 'descriptors', iconName: 'PlusCircle' },
  { id: 'd_pouco', label: 'Pouco', category: 'descriptors', iconName: 'MinusCircle' },

  // 5. SOCIAL & CORTESIA (Rosa/Roxo)
  { id: 'c_oi', label: 'Oi / Olá', category: 'social', iconName: 'Hand' },
  { id: 'c_tchau', label: 'Tchau / Até logo', category: 'social', iconName: 'DoorOpen' },
  { id: 'c_porfavor', label: 'Por Favor', category: 'social', iconName: 'Heart' },
  { id: 'c_obrigado', label: 'Obrigado(a)', category: 'social', iconName: 'Award' },
  { id: 'c_desculpe', label: 'Desculpe', category: 'social', iconName: 'ShieldAlert' },
  { id: 'c_legal', label: 'Muito Legal!', category: 'social', iconName: 'PartyPopper' },
  { id: 'c_socorro', label: 'Socorro / Ajuda', category: 'social', iconName: 'AlertTriangle' },

  // 6. CONEXÕES & RESPOSTAS (Cinza/Neutro)
  { id: 'n_sim', label: 'Sim', category: 'connectors', iconName: 'Check' },
  { id: 'n_nao', label: 'Não', category: 'connectors', iconName: 'X' },
  { id: 'n_porque', label: 'Porque', category: 'connectors', iconName: 'ArrowRight' },
  { id: 'n_mais', label: 'Mais', category: 'connectors', iconName: 'Plus' },
  { id: 'n_agora', label: 'Agora', category: 'connectors', iconName: 'Clock' },
];

export function findPictogramByKeyword(keyword: string): Pictogram | undefined {
  const normalized = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return INITIAL_PICTOGRAMS.find((p) => {
    const pNorm = p.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return pNorm.includes(normalized) || normalized.includes(pNorm);
  });
}
