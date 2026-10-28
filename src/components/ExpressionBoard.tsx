/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FitzgeraldCategory, Pictogram } from '../types';
import { FITZGERALD_CATEGORIES } from '../data/pictograms';
import { PictogramCard } from './PictogramCard';
import { CustomPictogramModal } from './CustomPictogramModal';
import { storageService } from '../services/storageService';
import { Search, Plus, Filter } from 'lucide-react';

interface ExpressionBoardProps {
  pictograms: Pictogram[];
  onSelectPictogram: (pictogram: Pictogram) => void;
  onAddCustomPictogram: (pictogram: Pictogram) => void;
  soundEnabled?: boolean;
  highContrast?: boolean;
}

export const ExpressionBoard: React.FC<ExpressionBoardProps> = ({
  pictograms,
  onSelectPictogram,
  onAddCustomPictogram,
  soundEnabled = true,
  highContrast = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FitzgeraldCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter logic
  const filteredPictograms = pictograms.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.label.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const handleCreateCustom = (newPic: Pictogram) => {
    onAddCustomPictogram(newPic);
    storageService.addCustomPictogram(newPic);
  };

  return (
    <div className="space-y-4">
      {/* Search and Category Filter Deck */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Buttons (Functional Buttons, not static pills) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`
              px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all
              ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }
            `}
          >
            Todos os Símbolos ({pictograms.length})
          </button>

          {(Object.keys(FITZGERALD_CATEGORIES) as FitzgeraldCategory[]).map((catKey) => {
            const cat = FITZGERALD_CATEGORIES[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5
                  ${
                    isSelected
                      ? `${cat.badgeBg} ${cat.badgeText} shadow-xs border ${cat.badgeBorder}`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }
                `}
              >
                <span>{cat.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right side: Search & Add button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar símbolo..."
              aria-label="Buscar símbolo por nome"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Criar novo símbolo personalizado"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Símbolo</span>
          </button>
        </div>
      </div>

      {/* Pictograms Grid */}
      <div
        className={`
          rounded-2xl p-4 min-h-[380px] border transition-colors
          ${highContrast ? 'bg-white border-slate-900' : 'bg-slate-50/70 border-slate-200'}
        `}
      >
        {filteredPictograms.length === 0 ? (
          <div className="py-16 text-center">
            <Filter className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">Nenhum símbolo encontrado</p>
            <p className="text-xs text-slate-400 mt-1">Tente outra busca ou adicione um novo símbolo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 justify-items-center">
            {filteredPictograms.map((pic) => (
              <PictogramCard
                key={pic.id}
                pictogram={pic}
                size="md"
                showCategoryBadge={true}
                soundEnabled={soundEnabled}
                highContrast={highContrast}
                onClick={() => onSelectPictogram(pic)}
              />
            ))}
          </div>
        )}
      </div>

      <CustomPictogramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleCreateCustom}
      />
    </div>
  );
};
