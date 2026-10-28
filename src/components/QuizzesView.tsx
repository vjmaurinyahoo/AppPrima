/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { PRESET_QUIZZES, PRESET_THEMES } from '../data/themes';
import { PictogramCard } from './PictogramCard';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';
import { 
  HelpCircle, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  ArrowRight,
  Award
} from 'lucide-react';

interface QuizzesViewProps {
  initialThemeId?: string;
  speechRate?: number;
  soundEnabled?: boolean;
  highContrast?: boolean;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({
  initialThemeId = 'ciclo_agua',
  speechRate = 0.9,
  soundEnabled = true,
  highContrast = false,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(initialThemeId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Get active quiz questions
  const quizKey = `quiz_${selectedThemeId}`;
  const questions: QuizQuestion[] = PRESET_QUIZZES[quizKey] || PRESET_QUIZZES.quiz_ciclo_agua;
  const currentQuestion = questions[currentQuestionIndex];
  const activeTheme = PRESET_THEMES.find((t) => t.id === selectedThemeId) || PRESET_THEMES[0];

  const handleSpeakQuestion = () => {
    if (!currentQuestion) return;
    if (soundEnabled) {
      speechService.playFeedbackSound('tap');
    }
    speechService.speak(currentQuestion.audioPrompt || currentQuestion.prompt, {
      rate: speechRate,
    });
  };

  const handleSelectOption = (option: QuizQuestion['options'][0]) => {
    if (isAnswered && isCorrect) return; // already solved this question

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      setIsAnswered(true);
      setIsCorrect(true);
      setScore((prev) => prev + (newAttempts === 1 ? 1 : 0.5));

      if (soundEnabled) {
        speechService.playFeedbackSound('success');
      }

      speechService.speak(`Parabéns! Resposta correta! ${currentQuestion.explanation}`, {
        rate: speechRate,
      });

      // Save record in pedagogical log
      storageService.addRecord({
        actionType: 'quiz_completed',
        title: `Quiz: ${activeTheme.title}`,
        details: {
          themeTitle: activeTheme.title,
          quizQuestion: currentQuestion.prompt,
          quizAnswerSelected: option.label,
          quizCorrect: true,
          quizAttempts: newAttempts,
        },
      });
    } else {
      setIsAnswered(true);
      setIsCorrect(false);

      if (soundEnabled) {
        speechService.playFeedbackSound('tap');
      }

      speechService.speak('Quase lá! Vamos tentar outra opção com calma.', {
        rate: speechRate,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setAttempts(0);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setAttempts(0);
    setQuizFinished(false);
    setScore(0);
  };

  const handleChangeTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setAttempts(0);
    setQuizFinished(false);
    setScore(0);
  };

  return (
    <div className="space-y-5">
      {/* Quiz Theme Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 rounded-xl">
        {PRESET_THEMES.filter((t) => t.relatedQuizId).map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleChangeTheme(theme.id)}
              className={`
                px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all
                ${
                  isSelected
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }
              `}
            >
              <span>{theme.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Quiz Card */}
      <div
        className={`
          rounded-2xl p-6 border shadow-xs transition-colors
          ${highContrast ? 'bg-white border-slate-950' : 'bg-white border-slate-200'}
        `}
      >
        {!quizFinished ? (
          <div>
            {/* Header: Progress and Voice */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">{activeTheme.title}</span>
              </div>

              <button
                type="button"
                onClick={handleSpeakQuestion}
                aria-label="Ouvir a pergunta da questão"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 cursor-pointer transition-colors shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>Ouvir Pergunta</span>
              </button>
            </div>

            {/* Prompt Heading */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center max-w-xl mx-auto mb-8">
              {currentQuestion.prompt}
            </h3>

            {/* Interactive Visual Options Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 justify-items-center max-w-2xl mx-auto">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let statusClasses = '';
                if (isSelected && isAnswered) {
                  statusClasses = option.isCorrect
                    ? 'ring-4 ring-emerald-500 ring-offset-2'
                    : 'ring-4 ring-amber-400 ring-offset-2 opacity-80';
                }

                return (
                  <div key={option.id} className={`transition-all ${statusClasses}`}>
                    <PictogramCard
                      pictogram={option.pictogram}
                      size="lg"
                      selected={isSelected}
                      soundEnabled={soundEnabled}
                      highContrast={highContrast}
                      onClick={() => handleSelectOption(option)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {isAnswered && (
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-300 px-4 py-2 rounded-xl text-sm font-bold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Excelente! {currentQuestion.explanation}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-900 bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl text-sm font-semibold">
                      <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Vamos tentar de novo! Escolha outro símbolo acima.</span>
                    </div>
                  )}
                </div>

                {isCorrect && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>
                      {currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="text-center py-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Parabéns! Atividade Concluída!
            </h3>

            <p className="text-sm font-semibold text-slate-600">
              Você completou todas as questões do tema &quot;{activeTheme.title}&quot;. Suas respostas foram salvas no Registro Pedagógico.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Fazer Novamente</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
