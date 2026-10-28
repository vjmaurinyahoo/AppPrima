/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FitzgeraldCategory = 
  | 'people'       // Amarelo: Pessoas, Pronomes (Eu, Você, Professor)
  | 'actions'      // Verde: Verbos (Quero, Aprendi, Gosto, Ir)
  | 'nouns'        // Laranja: Substantivos, Coisas, Conceitos (Água, Sol, Escola)
  | 'descriptors'  // Azul: Adjetivos, Sentimentos (Quente, Fácil, Feliz)
  | 'social'       // Rosa/Roxo: Social, Cortesia, Emergência (Oi, Por favor, Obrigado)
  | 'connectors';  // Branco/Cinza: Conectivos, Números (E, Mais, Porque, 1, 2)

export interface Pictogram {
  id: string;
  label: string;
  category: FitzgeraldCategory;
  iconName: string; // Lucide icon name mapping
  secondaryColor?: string;
  custom?: boolean;
}

export interface SimplifiedSentence {
  id: string;
  originalText?: string;
  simplifiedText: string;
  pictograms: Pictogram[];
}

export interface DidacticTheme {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  originalContent: string;
  sentences: SimplifiedSentence[];
  relatedQuizId?: string;
}

export interface QuickSignal {
  id: string;
  label: string;
  speechText: string;
  iconName: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  urgent?: boolean;
}

export interface QuizQuestion {
  id: string;
  themeId: string;
  prompt: string;
  audioPrompt?: string;
  options: {
    id: string;
    label: string;
    pictogram: Pictogram;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export type PedagogicalActionType = 
  | 'sentence_spoken'
  | 'signal_triggered'
  | 'quiz_completed'
  | 'text_simplified'
  | 'pictogram_selected';

export interface PedagogicalRecord {
  id: string;
  timestamp: string;
  actionType: PedagogicalActionType;
  title: string;
  details: {
    sentence?: string;
    pictogramsUsed?: string[];
    signalName?: string;
    themeTitle?: string;
    quizQuestion?: string;
    quizAnswerSelected?: string;
    quizCorrect?: boolean;
    quizAttempts?: number;
    durationSeconds?: number;
  };
}

export interface UserAccessibilitySettings {
  speechRate: number; // 0.7 (slow), 1.0 (normal), 1.2 (fast)
  highContrast: boolean;
  largeFont: boolean;
  soundEffects: boolean;
  voicePitch: number; // 0.8 - 1.2
}
