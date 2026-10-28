/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserAccessibilitySettings } from '../types';
import { 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  Bell, 
  HelpCircle, 
  ClipboardList,
  Eye,
  Gauge,
  Volume2,
  VolumeX
} from 'lucide-react';

export type ActiveTab = 'expression' | 'comprehension' | 'signals' | 'quizzes' | 'report';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  settings: UserAccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<UserAccessibilitySettings>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  settings,
  onUpdateSettings,
}) => {
  const navTabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'expression', label: 'Prancha CAA', icon: MessageSquare },
    { id: 'comprehension', label: 'Compreensão', icon: BookOpen },
    { id: 'signals', label: 'Sinais de Sala', icon: Bell },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'report', label: 'Educador', icon: ClipboardList },
  ];

  const cycleSpeechRate = () => {
    const nextRate = settings.speechRate === 0.7 ? 1.0 : settings.speechRate === 1.0 ? 1.2 : 0.7;
    onUpdateSettings({ speechRate: nextRate });
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 whitespace-nowrap">
            Prisma: Aprender & Expressar
          </span>
        </div>

        {/* Zone 2: Navigation Links (Clean single line controls) */}
        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl shrink-0"
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all
                  ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Accessibility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Speech Rate Control */}
          <button
            type="button"
            onClick={cycleSpeechRate}
            title={`Velocidade da Voz: ${settings.speechRate}x (Clique para alterar)`}
            aria-label={`Velocidade da voz atual: ${settings.speechRate}x. Clique para alternar.`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer transition-colors"
          >
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span className="tabular-nums">{settings.speechRate}x</span>
          </button>

          {/* Sound Effects Toggle */}
          <button
            type="button"
            onClick={() => onUpdateSettings({ soundEffects: !settings.soundEffects })}
            title={settings.soundEffects ? 'Sons de feedback ativos' : 'Sons desativados'}
            aria-label={settings.soundEffects ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
          >
            {settings.soundEffects ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
            title="Alternar Modo de Alto Contraste"
            aria-label="Alternar modo de alto contraste para acessibilidade visual"
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors border
              ${
                settings.highContrast
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }
            `}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alto Contraste</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Nav Tab Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 border-t border-slate-100 bg-slate-50/80 overflow-x-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer transition-colors
                ${isActive ? 'text-indigo-700 bg-white shadow-2xs' : 'text-slate-600'}
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
