/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PedagogicalRecord, UserAccessibilitySettings, Pictogram } from '../types';

const STORAGE_KEYS = {
  RECORDS: 'prisma_pedagogical_records',
  CUSTOM_PICTOGRAMS: 'prisma_custom_pictograms',
  SETTINGS: 'prisma_accessibility_settings',
};

const DEFAULT_SETTINGS: UserAccessibilitySettings = {
  speechRate: 0.9,
  highContrast: false,
  largeFont: false,
  soundEffects: true,
  voicePitch: 1.0,
};

const SAMPLE_RECORDS: PedagogicalRecord[] = [
  {
    id: 'sample_1',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    actionType: 'sentence_spoken',
    title: 'Frase construída na prancha CAA',
    details: {
      sentence: 'Eu quero beber água',
      pictogramsUsed: ['Eu', 'Quero', 'Beber', 'Água'],
    },
  },
  {
    id: 'sample_2',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    actionType: 'signal_triggered',
    title: 'Sinalização rápida acionada',
    details: {
      signalName: 'BANHEIRO',
      sentence: 'Preciso ir ao banheiro por favor.',
    },
  },
  {
    id: 'sample_3',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    actionType: 'quiz_completed',
    title: 'Resposta de Quiz: O Ciclo da Água',
    details: {
      themeTitle: 'O Ciclo da Água',
      quizQuestion: 'O que esquenta a água dos rios e mares?',
      quizAnswerSelected: 'O Sol',
      quizCorrect: true,
      quizAttempts: 1,
    },
  },
];

class StorageService {
  public getSettings(): UserAccessibilitySettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Falha ao ler configurações:', e);
    }
    return DEFAULT_SETTINGS;
  }

  public saveSettings(settings: UserAccessibilitySettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Falha ao salvar configurações:', e);
    }
  }

  public getRecords(): PedagogicalRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
      if (data) {
        return JSON.parse(data);
      }
      // Populate sample if first time
      this.saveRecords(SAMPLE_RECORDS);
      return SAMPLE_RECORDS;
    } catch (e) {
      console.warn('Falha ao ler registros pedagógicos:', e);
      return SAMPLE_RECORDS;
    }
  }

  public saveRecords(records: PedagogicalRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    } catch (e) {
      console.error('Falha ao salvar registros:', e);
    }
  }

  public addRecord(record: Omit<PedagogicalRecord, 'id' | 'timestamp'>): PedagogicalRecord {
    const newRecord: PedagogicalRecord = {
      ...record,
      id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
    };

    const current = this.getRecords();
    const updated = [newRecord, ...current].slice(0, 300); // keep last 300 records
    this.saveRecords(updated);
    return newRecord;
  }

  public clearRecords(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.RECORDS);
    } catch (e) {
      console.error('Falha ao limpar registros:', e);
    }
  }

  public getCustomPictograms(): Pictogram[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_PICTOGRAMS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Falha ao ler pictogramas customizados:', e);
    }
    return [];
  }

  public addCustomPictogram(pictogram: Pictogram): void {
    try {
      const current = this.getCustomPictograms();
      const updated = [...current, pictogram];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PICTOGRAMS, JSON.stringify(updated));
    } catch (e) {
      console.error('Falha ao salvar pictograma customizado:', e);
    }
  }

  public exportJSON(): void {
    const records = this.getRecords();
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prisma-relatorio-pedagogico-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  public exportCSV(): void {
    const records = this.getRecords();
    const headers = ['Data e Hora', 'Tipo de Ação', 'Título', 'Frase / Detalhe', 'Pictogramas Usados', 'Acerto'];
    const rows = records.map((r) => {
      const date = new Date(r.timestamp).toLocaleString('pt-BR');
      const action = r.actionType;
      const title = `"${(r.title || '').replace(/"/g, '""')}"`;
      const detail = `"${(r.details.sentence || r.details.signalName || r.details.themeTitle || '').replace(/"/g, '""')}"`;
      const picto = `"${(r.details.pictogramsUsed?.join(' + ') || '').replace(/"/g, '""')}"`;
      const correct = r.details.quizCorrect !== undefined ? (r.details.quizCorrect ? 'Sim' : 'Não') : '-';
      return [date, action, title, detail, picto, correct].join(';');
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prisma-relatorio-pedagogico-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const storageService = new StorageService();
