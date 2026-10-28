/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuickSignal } from '../types';
import { CLASSROOM_SIGNALS } from '../data/signals';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';
import { DynamicIcon } from './DynamicIcon';
import { Volume2, X, AlertCircle } from 'lucide-react';

interface QuickSignalsViewProps {
  speechRate?: number;
  soundEnabled?: boolean;
  highContrast?: boolean;
}

export const QuickSignalsView: React.FC<QuickSignalsViewProps> = ({
  speechRate = 0.9,
  soundEnabled = true,
  highContrast = false,
}) => {
  const [fullscreenSignal, setFullscreenSignal] = useState<QuickSignal | null>(null);

  const handleTriggerSignal = (signal: QuickSignal) => {
    if (soundEnabled) {
      if (signal.urgent) {
        speechService.playFeedbackSound('alert');
      } else {
        speechService.playFeedbackSound('tap');
      }
    }

    // Speak aloud immediately
    speechService.speak(signal.speechText, { rate: speechRate });

    // Open fullscreen visual cue
    setFullscreenSignal(signal);

    // Save in pedagogical log
    storageService.addRecord({
      actionType: 'signal_triggered',
      title: `Sinalização rápida acionada: ${signal.label}`,
      details: {
        signalName: signal.label,
        sentence: signal.speechText,
      },
    });
  };

  const handleRepeatVoice = () => {
    if (fullscreenSignal) {
      speechService.speak(fullscreenSignal.speechText, { rate: speechRate });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-200 gap-1">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Sinalização Rápida de Sala de Aula
          </h2>
          <p className="text-xs text-slate-500">
            Toque único para respostas imediatas e necessidades essenciais em tela cheia com voz.
          </p>
        </div>
      </div>

      {/* Grid of Big Expressive Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {CLASSROOM_SIGNALS.map((signal) => {
          const cardClasses = highContrast
            ? 'bg-white text-slate-950 border-4 border-slate-950 hover:bg-slate-100 shadow-md'
            : `${signal.bgColor} ${signal.textColor} border-2 ${signal.borderColor} hover:brightness-105 shadow-sm`;

          return (
            <button
              key={signal.id}
              type="button"
              onClick={() => handleTriggerSignal(signal)}
              aria-label={`Sinalizar: ${signal.label}. Fala: ${signal.speechText}`}
              className={`
                min-h-[120px] sm:min-h-[140px] p-4 rounded-2xl flex flex-col items-center justify-between
                font-extrabold cursor-pointer transition-all duration-150 active:scale-95
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600
                ${cardClasses}
              `}
            >
              <div className="w-full flex justify-end">
                {signal.urgent && (
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping opacity-75" />
                )}
              </div>

              <div className="my-1">
                <DynamicIcon name={signal.iconName} className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <span className="text-center text-sm sm:text-base tracking-wide uppercase leading-tight">
                {signal.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Signal Attention Overlay Modal */}
      {fullscreenSignal && (
        <div
          role="dialog"
          aria-modal="true"
          className={`
            fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-all animate-in fade-in zoom-in-95
            ${fullscreenSignal.bgColor} ${fullscreenSignal.textColor}
          `}
        >
          {/* Top Bar with Dismiss */}
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <button
              type="button"
              onClick={handleRepeatVoice}
              aria-label="Repetir fala do sinal"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs font-bold text-sm cursor-pointer transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              <span>Repetir Fala</span>
            </button>

            <button
              type="button"
              onClick={() => setFullscreenSignal(null)}
              aria-label="Fechar sinalização de tela cheia"
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs cursor-pointer transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Central Massive Attention Icon and Text */}
          <div className="flex flex-col items-center justify-center text-center max-w-2xl px-4 animate-in slide-in-from-bottom-4 duration-200">
            <div className="p-8 rounded-full bg-white/20 backdrop-blur-xs mb-6 shadow-2xl">
              <DynamicIcon
                name={fullscreenSignal.iconName}
                className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-md"
              />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider mb-4 drop-shadow-sm">
              {fullscreenSignal.label}
            </h1>

            <p className="text-xl sm:text-2xl font-bold bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-xs max-w-xl">
              &quot;{fullscreenSignal.speechText}&quot;
            </p>

            <button
              type="button"
              onClick={() => setFullscreenSignal(null)}
              className="mt-8 px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-base shadow-xl hover:bg-slate-100 active:scale-95 cursor-pointer transition-all"
            >
              Concluir / Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
