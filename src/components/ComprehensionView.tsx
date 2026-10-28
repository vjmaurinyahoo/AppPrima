/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DidacticTheme, Pictogram, SimplifiedSentence } from '../types';
import { PRESET_THEMES } from '../data/themes';
import { simplifierService } from '../services/simplifierService';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';
import { PictogramCard } from './PictogramCard';
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  Send, 
  CheckCircle, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface ComprehensionViewProps {
  onSendToSentenceStrip: (pictograms: Pictogram[]) => void;
  onNavigateToQuiz: (themeId?: string) => void;
  speechRate?: number;
  soundEnabled?: boolean;
  highContrast?: boolean;
}

export const ComprehensionView: React.FC<ComprehensionViewProps> = ({
  onSendToSentenceStrip,
  onNavigateToQuiz,
  speechRate = 0.9,
  soundEnabled = true,
  highContrast = false,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<DidacticTheme>(PRESET_THEMES[0]);
  const [customText, setCustomText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customSentences, setCustomSentences] = useState<SimplifiedSentence[]>([]);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);

  const activeSentences = isCustomMode ? customSentences : selectedTheme.sentences;

  const handleSelectTheme = (theme: DidacticTheme) => {
    setIsCustomMode(false);
    setSelectedTheme(theme);
    setActiveSentenceId(null);
    speechService.stop();

    storageService.addRecord({
      actionType: 'text_simplified',
      title: 'Acesso ao tema didático',
      details: {
        themeTitle: theme.title,
      },
    });
  };

  const handleSimplifyCustom = () => {
    if (!customText.trim()) return;
    const simplified = simplifierService.simplifyText(customText);
    setCustomSentences(simplified);
    setIsCustomMode(true);
    setActiveSentenceId(null);

    storageService.addRecord({
      actionType: 'text_simplified',
      title: 'Simplificação de texto personalizado pelo educador',
      details: {
        sentence: customText.slice(0, 80) + '...',
      },
    });
  };

  const handleSpeakSentence = (sentence: SimplifiedSentence) => {
    if (soundEnabled) {
      speechService.playFeedbackSound('tap');
    }

    setActiveSentenceId(sentence.id);
    speechService.speak(sentence.simplifiedText, {
      rate: speechRate,
      onStart: () => setActiveSentenceId(sentence.id),
      onEnd: () => setActiveSentenceId(null),
    });
  };

  const handleSpeakFullLesson = () => {
    const fullText = activeSentences.map((s) => s.simplifiedText).join('. ');
    if (!fullText) return;

    if (soundEnabled) {
      speechService.playFeedbackSound('tap');
    }

    speechService.speak(fullText, {
      rate: speechRate,
      onStart: () => setActiveSentenceId('all'),
      onEnd: () => setActiveSentenceId(null),
    });
  };

  const handleSendToBoard = (sentence: SimplifiedSentence) => {
    if (soundEnabled) {
      speechService.playFeedbackSound('success');
    }
    onSendToSentenceStrip(sentence.pictograms);
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection Strip */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Conteúdos Didáticos Adaptados
            </h2>
          </div>
          <span className="text-xs text-slate-500">Leitura Fácil + Pictogramas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESET_THEMES.map((theme) => {
            const isSelected = !isCustomMode && selectedTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectTheme(theme)}
                className={`
                  p-3 rounded-xl text-left border cursor-pointer transition-all
                  ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }
                `}
              >
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  {theme.category}
                </span>
                <h3 className="text-xs font-bold text-slate-900 mt-0.5 truncate">
                  {theme.title}
                </h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Text Collapsible Box for Teacher/Mediator */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Adaptar Outro Conteúdo da Aula</span>
          </div>
          {isCustomMode && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Visualizando Texto Adaptado
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Cole aqui um parágrafo didático (ex: A planta usa a luz do sol para fazer alimento...)"
            className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
          />
          <button
            type="button"
            onClick={handleSimplifyCustom}
            disabled={!customText.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simplificar com IA</span>
          </button>
        </div>
      </div>

      {/* Active Lesson Display */}
      <div
        className={`
          rounded-2xl p-5 border shadow-xs transition-colors
          ${highContrast ? 'bg-white border-slate-950' : 'bg-white border-slate-200'}
        `}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isCustomMode ? 'Texto Adaptado pelo Educador' : selectedTheme.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isCustomMode
                ? 'Estruturado em linguagem simplificada e pictogramas'
                : selectedTheme.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakFullLesson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
            >
              <Volume2 className="w-4 h-4 text-slate-600" />
              <span>Ouvir Aula Completa</span>
            </button>

            {!isCustomMode && selectedTheme.relatedQuizId && (
              <button
                type="button"
                onClick={() => onNavigateToQuiz(selectedTheme.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Fazer Quiz do Tema</span>
              </button>
            )}
          </div>
        </div>

        {/* Simplified Sentences and Pictograms Deck */}
        <div className="mt-5 space-y-4">
          {activeSentences.map((sent, index) => {
            const isPlayingThis = activeSentenceId === sent.id || activeSentenceId === 'all';
            return (
              <div
                key={sent.id}
                className={`
                  p-4 rounded-xl border-2 transition-all
                  ${
                    isPlayingThis
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-200 shadow-sm'
                      : 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      {sent.simplifiedText}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSpeakSentence(sent)}
                      aria-label={`Ouvir frase ${index + 1}`}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors
                        ${
                          isPlayingThis
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }
                      `}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlayingThis ? 'Reproduzindo' : 'Ouvir Frase'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendToBoard(sent)}
                      title="Copiar símbolos para a prancha de expressão"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Montar na Prancha</span>
                    </button>
                  </div>
                </div>

                {/* Pictograms for this sentence */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
                  {sent.pictograms.map((pic, pIdx) => (
                    <PictogramCard
                      key={`${pic.id}-${pIdx}`}
                      pictogram={pic}
                      size="sm"
                      soundEnabled={soundEnabled}
                      highContrast={highContrast}
                      onClick={() => {
                        speechService.speak(pic.label, { rate: speechRate });
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
