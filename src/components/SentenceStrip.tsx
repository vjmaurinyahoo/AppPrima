/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Pictogram } from '../types';
import { PictogramCard } from './PictogramCard';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';
import { Volume2, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';

interface SentenceStripProps {
  sentence: Pictogram[];
  onRemoveAt: (index: number) => void;
  onClear: () => void;
  speechRate?: number;
  soundEnabled?: boolean;
  highContrast?: boolean;
}

export const SentenceStrip: React.FC<SentenceStripProps> = ({
  sentence,
  onRemoveAt,
  onClear,
  speechRate = 0.9,
  soundEnabled = true,
  highContrast = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpoken, setLastSpoken] = useState<string | null>(null);

  const fullSentenceText = sentence.map((p) => p.label).join(' ');

  const handleSpeak = () => {
    if (!fullSentenceText.trim()) return;

    if (soundEnabled) {
      speechService.playFeedbackSound('tap');
    }

    setIsSpeaking(true);
    speechService.speak(fullSentenceText, {
      rate: speechRate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setLastSpoken(fullSentenceText);
        if (soundEnabled) {
          speechService.playFeedbackSound('success');
        }
      },
    });

    // Record pedagogical interaction
    storageService.addRecord({
      actionType: 'sentence_spoken',
      title: 'Frase falada na prancha de comunicação',
      details: {
        sentence: fullSentenceText,
        pictogramsUsed: sentence.map((p) => p.label),
      },
    });
  };

  const handleClear = () => {
    if (soundEnabled) {
      speechService.playFeedbackSound('clear');
    }
    onClear();
  };

  return (
    <section
      aria-label="Tira de Construção de Frases"
      className={`
        rounded-2xl p-4 sm:p-5 transition-colors border-2 shadow-sm
        ${highContrast ? 'bg-white border-slate-950' : 'bg-slate-50/90 border-slate-200'}
      `}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tira de Frase (CAA)
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-xs font-semibold text-slate-600">
            {sentence.length} {sentence.length === 1 ? 'símbolo' : 'símbolos'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={sentence.length === 0}
            aria-label="Limpar toda a frase"
            className={`
              flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
              ${highContrast ? 'border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-200/80 hover:bg-rose-100 hover:text-rose-700 text-slate-700'}
            `}
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpar</span>
          </button>

          <button
            type="button"
            onClick={handleSpeak}
            disabled={sentence.length === 0 || isSpeaking}
            aria-label="Reproduzir frase em voz alta com sintetizador"
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all shadow-sm
              active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
              ${
                highContrast
                  ? 'bg-slate-950 text-white hover:bg-slate-800'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }
              ${isSpeaking ? 'ring-4 ring-emerald-300 animate-pulse' : ''}
            `}
          >
            <Volume2 className="w-5 h-5" />
            <span>{isSpeaking ? 'Falando...' : 'Falar Frase'}</span>
          </button>
        </div>
      </div>

      {/* Pictograms Strip Area */}
      <div
        className={`
          min-h-[100px] sm:min-h-[110px] rounded-xl p-3 flex items-center gap-3 overflow-x-auto
          border-2 border-dashed
          ${highContrast ? 'border-slate-800 bg-slate-50' : 'border-slate-300 bg-white'}
        `}
      >
        {sentence.length === 0 ? (
          <div className="w-full text-center py-4 text-slate-400 font-medium text-sm">
            Toque nos símbolos abaixo para construir sua frase aqui
          </div>
        ) : (
          sentence.map((pic, idx) => (
            <div key={`${pic.id}-${idx}`} className="shrink-0 animate-in fade-in zoom-in-95 duration-150">
              <PictogramCard
                pictogram={pic}
                size="sm"
                soundEnabled={soundEnabled}
                highContrast={highContrast}
                onRemove={() => onRemoveAt(idx)}
              />
            </div>
          ))
        )}
      </div>

      {/* Spoken feedback banner */}
      {lastSpoken && (
        <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Última frase falada: &quot;{lastSpoken}&quot;</span>
        </div>
      )}
    </section>
  );
};
