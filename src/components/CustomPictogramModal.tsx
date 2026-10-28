/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FitzgeraldCategory, Pictogram } from '../types';
import { FITZGERALD_CATEGORIES } from '../data/pictograms';
import { DynamicIcon } from './DynamicIcon';
import { X, Plus, Sparkles } from 'lucide-react';

interface CustomPictogramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pictogram: Pictogram) => void;
}

const AVAILABLE_ICONS = [
  'Heart', 'Star', 'Sparkles', 'Smile', 'Sun', 'Moon', 'Cloud', 'Music',
  'Camera', 'Car', 'Plane', 'Gift', 'Flag', 'Trophy', 'Lightbulb', 'Pin'
];

export const CustomPictogramModal: React.FC<CustomPictogramModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState<FitzgeraldCategory>('nouns');
  const [selectedIcon, setSelectedIcon] = useState('Star');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    const newPic: Pictogram = {
      id: `custom_${Date.now()}`,
      label: label.trim(),
      category,
      iconName: selectedIcon,
      custom: true,
    };

    onAdd(newPic);
    setLabel('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 id="modal-title" className="text-base font-bold text-slate-900">
              Criar Novo Símbolo Personalizado
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="pic-label" className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Nome do Símbolo
            </label>
            <input
              id="pic-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex: Passeio, Música, Tablet..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
            />
          </div>

          <div>
            <label htmlFor="pic-cat" className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Categoria (Chave de Fitzgerald)
            </label>
            <select
              id="pic-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value as FitzgeraldCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium bg-white"
            >
              {Object.entries(FITZGERALD_CATEGORIES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">
              Escolha um Ícone Visual
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVAILABLE_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`
                    p-2 rounded-xl flex items-center justify-center border cursor-pointer transition-all
                    ${selectedIcon === icon ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                  `}
                >
                  <DynamicIcon name={icon} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Salvar Símbolo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
