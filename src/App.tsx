/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Pictogram, UserAccessibilitySettings } from './types';
import { INITIAL_PICTOGRAMS } from './data/pictograms';
import { storageService } from './services/storageService';
import { speechService } from './services/speechService';
import { Navbar, ActiveTab } from './components/Navbar';
import { SentenceStrip } from './components/SentenceStrip';
import { ExpressionBoard } from './components/ExpressionBoard';
import { ComprehensionView } from './components/ComprehensionView';
import { QuickSignalsView } from './components/QuickSignalsView';
import { QuizzesView } from './components/QuizzesView';
import { PedagogicalReportView } from './components/PedagogicalReportView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('expression');
  const [sentenceStrip, setSentenceStrip] = useState<Pictogram[]>([]);
  const [pictograms, setPictograms] = useState<Pictogram[]>(INITIAL_PICTOGRAMS);
  const [settings, setSettings] = useState<UserAccessibilitySettings>(storageService.getSettings());
  const [quizThemeTarget, setQuizThemeTarget] = useState<string>('ciclo_agua');

  // Load custom pictograms from localStorage
  useEffect(() => {
    const custom = storageService.getCustomPictograms();
    if (custom.length > 0) {
      setPictograms([...INITIAL_PICTOGRAMS, ...custom]);
    }
  }, []);

  // Update and persist settings
  const handleUpdateSettings = (newSettings: Partial<UserAccessibilitySettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  // Expression Sentence Strip operations
  const handleSelectPictogram = (pic: Pictogram) => {
    setSentenceStrip((prev) => [...prev, pic]);
    if (settings.soundEffects) {
      speechService.playFeedbackSound('tap');
    }
    // Also quietly speak the isolated word for phonetic reinforcement
    speechService.speak(pic.label, { rate: settings.speechRate });
  };

  const handleRemoveAt = (index: number) => {
    setSentenceStrip((prev) => prev.filter((_, i) => i !== index));
    if (settings.soundEffects) {
      speechService.playFeedbackSound('tap');
    }
  };

  const handleClearSentence = () => {
    setSentenceStrip([]);
  };

  const handleAddCustomPictogram = (newPic: Pictogram) => {
    setPictograms((prev) => [...prev, newPic]);
  };

  // Cross-module navigations
  const handleSendFromComprehensionToSentenceStrip = (pics: Pictogram[]) => {
    setSentenceStrip(pics);
    setActiveTab('expression');
  };

  const handleNavigateToQuiz = (themeId?: string) => {
    if (themeId) {
      setQuizThemeTarget(themeId);
    }
    setActiveTab('quizzes');
  };

  return (
    <div
      className={`
        min-h-screen transition-colors duration-200
        ${settings.highContrast ? 'bg-slate-900 text-white' : 'bg-slate-100/70 text-slate-900'}
      `}
    >
      {/* Universal Top Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* VIEW 1: MODO EXPRESSÃO (PRANCHA CAA) */}
        {activeTab === 'expression' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Always visible Sentence Strip in Expression mode */}
            <SentenceStrip
              sentence={sentenceStrip}
              onRemoveAt={handleRemoveAt}
              onClear={handleClearSentence}
              speechRate={settings.speechRate}
              soundEnabled={settings.soundEffects}
              highContrast={settings.highContrast}
            />

            {/* CAA Category Grid Board */}
            <ExpressionBoard
              pictograms={pictograms}
              onSelectPictogram={handleSelectPictogram}
              onAddCustomPictogram={handleAddCustomPictogram}
              soundEnabled={settings.soundEffects}
              highContrast={settings.highContrast}
            />
          </div>
        )}

        {/* VIEW 2: MODO COMPREENSÃO (LEITURA FÁCIL & PICTOGRAMAS) */}
        {activeTab === 'comprehension' && (
          <div className="animate-in fade-in duration-150">
            <ComprehensionView
              onSendToSentenceStrip={handleSendFromComprehensionToSentenceStrip}
              onNavigateToQuiz={handleNavigateToQuiz}
              speechRate={settings.speechRate}
              soundEnabled={settings.soundEffects}
              highContrast={settings.highContrast}
            />
          </div>
        )}

        {/* VIEW 3: SINAIS DE SALA (RESPOSTAS RÁPIDAS & EMERGÊNCIA) */}
        {activeTab === 'signals' && (
          <div className="animate-in fade-in duration-150">
            <QuickSignalsView
              speechRate={settings.speechRate}
              soundEnabled={settings.soundEffects}
              highContrast={settings.highContrast}
            />
          </div>
        )}

        {/* VIEW 4: QUIZZES ACESSÍVEIS BASEADOS EM PICTOGRAMAS */}
        {activeTab === 'quizzes' && (
          <div className="animate-in fade-in duration-150">
            <QuizzesView
              initialThemeId={quizThemeTarget}
              speechRate={settings.speechRate}
              soundEnabled={settings.soundEffects}
              highContrast={settings.highContrast}
            />
          </div>
        )}

        {/* VIEW 5: PAINEL DO EDUCADOR & REGISTRO PEDAGÓGICO */}
        {activeTab === 'report' && (
          <div className="animate-in fade-in duration-150">
            <PedagogicalReportView highContrast={settings.highContrast} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200/80 text-center text-xs text-slate-500">
        <p>
          Prisma: Aprender & Expressar — Tecnologia Assistiva e Comunicação Aumentativa e Alternativa (CAA).
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          Desenvolvido com diretrizes de Acessibilidade DUA, Chave de Fitzgerald e Web Speech API.
        </p>
      </footer>
    </div>
  );
}
