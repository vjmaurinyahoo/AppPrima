/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PedagogicalRecord, PedagogicalActionType } from '../types';
import { storageService } from '../services/storageService';
import { 
  ClipboardList, 
  Download, 
  Trash2, 
  MessageSquare, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles,
  Calendar,
  Filter
} from 'lucide-react';

interface PedagogicalReportViewProps {
  highContrast?: boolean;
}

export const PedagogicalReportView: React.FC<PedagogicalReportViewProps> = ({
  highContrast = false,
}) => {
  const [records, setRecords] = useState<PedagogicalRecord[]>([]);
  const [filterType, setFilterType] = useState<PedagogicalActionType | 'all'>('all');

  useEffect(() => {
    setRecords(storageService.getRecords());
  }, []);

  const handleClear = () => {
    if (window.confirm('Deseja realmente limpar todos os registros do histórico pedagógico?')) {
      storageService.clearRecords();
      setRecords([]);
    }
  };

  const filteredRecords = records.filter((r) => {
    return filterType === 'all' || r.actionType === filterType;
  });

  // Calculate high-level metrics for educator
  const totalSentences = records.filter((r) => r.actionType === 'sentence_spoken').length;
  const totalSignals = records.filter((r) => r.actionType === 'signal_triggered').length;
  const quizRecords = records.filter((r) => r.actionType === 'quiz_completed');
  const quizAccuracyFirstTry = quizRecords.length > 0
    ? Math.round(
        (quizRecords.filter((q) => q.details.quizCorrect && q.details.quizAttempts === 1).length /
          quizRecords.length) *
          100
      )
    : 100;

  return (
    <div className="space-y-6">
      {/* Header and Export Tools */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Painel do Educador & Registro Pedagógico
          </h2>
          <p className="text-xs text-slate-500">
            Acompanhamento contínuo de autonomia comunicativa, vocabulário e retenção didática (PEI).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => storageService.exportCSV()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar CSV (Planilha)</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Frases Montadas
            </span>
            <MessageSquare className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalSentences}</p>
          <span className="text-[11px] text-slate-500">expressões com CAA</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sinais de Sala
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalSignals}</p>
          <span className="text-[11px] text-slate-500">pedidos de ajuda / rotina</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quizzes Respondidos
            </span>
            <HelpCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{quizRecords.length}</p>
          <span className="text-[11px] text-slate-500">questões acessíveis</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Taxa 1ª Tentativa
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{quizAccuracyFirstTry}%</p>
          <span className="text-[11px] text-slate-500">autonomia nas respostas</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all
            ${filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}
          `}
        >
          Todos os Eventos ({records.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('sentence_spoken')}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all
            ${filterType === 'sentence_spoken' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}
          `}
        >
          Frases Construídas
        </button>
        <button
          type="button"
          onClick={() => setFilterType('signal_triggered')}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all
            ${filterType === 'signal_triggered' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}
          `}
        >
          Sinais de Sala
        </button>
        <button
          type="button"
          onClick={() => setFilterType('quiz_completed')}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all
            ${filterType === 'quiz_completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}
          `}
        >
          Quizzes Didáticos
        </button>
      </div>

      {/* Audit Log Timeline */}
      <div
        className={`
          rounded-2xl border divide-y divide-slate-100 transition-colors
          ${highContrast ? 'bg-white border-slate-950 divide-slate-300' : 'bg-white border-slate-200'}
        `}
      >
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <ClipboardList className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">Nenhum registro encontrado</p>
            <p className="text-xs text-slate-400 mt-0.5">As atividades do estudante aparecerão aqui em tempo real.</p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const dateStr = new Date(record.timestamp).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            const dayStr = new Date(record.timestamp).toLocaleDateString('pt-BR');

            return (
              <div key={record.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  {record.actionType === 'sentence_spoken' && <MessageSquare className="w-4 h-4 text-emerald-600" />}
                  {record.actionType === 'signal_triggered' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {record.actionType === 'quiz_completed' && <HelpCircle className="w-4 h-4 text-indigo-600" />}
                  {record.actionType === 'text_simplified' && <Sparkles className="w-4 h-4 text-purple-600" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {record.title}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-400 shrink-0">
                      {dayStr} {dateStr}
                    </span>
                  </div>

                  {record.details.sentence && (
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      &quot;{record.details.sentence}&quot;
                    </p>
                  )}

                  {record.details.pictogramsUsed && record.details.pictogramsUsed.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[11px] text-slate-400">Símbolos:</span>
                      {record.details.pictogramsUsed.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {record.details.quizQuestion && (
                    <div className="mt-1.5 text-xs text-slate-600">
                      <p><strong>Questão:</strong> {record.details.quizQuestion}</p>
                      <p className="mt-0.5">
                        <strong>Resposta:</strong> {record.details.quizAnswerSelected} ·{' '}
                        <span className={record.details.quizCorrect ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                          {record.details.quizCorrect ? 'Acertou' : 'Tentou novamente'}
                        </span>{' '}
                        (Tentativas: {record.details.quizAttempts})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
