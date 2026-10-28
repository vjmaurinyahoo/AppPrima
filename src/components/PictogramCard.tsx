/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pictogram } from '../types';
import { FITZGERALD_CATEGORIES } from '../data/pictograms';
import { DynamicIcon } from './DynamicIcon';
import { speechService } from '../services/speechService';

interface PictogramCardProps {
  pictogram: Pictogram;
  onClick?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showCategoryBadge?: boolean;
  selected?: boolean;
  soundEnabled?: boolean;
  highContrast?: boolean;
}

export const PictogramCard: React.FC<PictogramCardProps> = ({
  pictogram,
  onClick,
  onRemove,
  size = 'md',
  showCategoryBadge = false,
  selected = false,
  soundEnabled = true,
  highContrast = false,
}) => {
  const categoryTheme = FITZGERALD_CATEGORIES[pictogram.category] || FITZGERALD_CATEGORIES.nouns;

  const handleClick = () => {
    if (soundEnabled) {
      speechService.playFeedbackSound('tap');
    }
    onClick?.();
  };

  // Dimensions & padding
  const sizeClasses = {
    sm: 'w-20 h-20 p-1.5 text-xs',
    md: 'w-28 h-28 sm:w-32 sm:h-32 p-2.5 text-sm',
    lg: 'w-36 h-36 sm:w-40 sm:h-40 p-3 text-base',
  }[size];

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  // Visual appearance according to high contrast vs standard Fitzgerald palette
  const borderClasses = highContrast
    ? 'border-4 border-slate-950 bg-white text-slate-950 shadow-md'
    : `border-2 ${categoryTheme.cardBorder} ${categoryTheme.cardBg} ${categoryTheme.cardHover} text-slate-900 shadow-sm`;

  const ringClasses = selected ? 'ring-4 ring-offset-2 ring-indigo-600 scale-102' : '';

  return (
    <div className="relative group inline-block">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${pictogram.label}, categoria ${categoryTheme.name}`}
        className={`
          flex flex-col items-center justify-between rounded-xl font-semibold
          transition-all duration-150 cursor-pointer select-none
          active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600
          ${sizeClasses}
          ${borderClasses}
          ${ringClasses}
        `}
      >
        {showCategoryBadge && size !== 'sm' && (
          <span
            className={`
              w-full text-center text-[10px] uppercase font-bold py-0.5 rounded tracking-wider
              ${categoryTheme.badgeBg} ${categoryTheme.badgeText}
            `}
          >
            {categoryTheme.name.split(' ')[0]}
          </span>
        )}

        <div className="flex-1 flex items-center justify-center text-slate-800">
          <DynamicIcon name={pictogram.iconName} className={iconSizes} />
        </div>

        <span className="w-full text-center font-bold truncate leading-tight px-1">
          {pictogram.label}
        </span>
      </button>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remover ${pictogram.label}`}
          className="absolute -top-2 -right-2 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md hover:bg-rose-700 active:scale-90 transition-transform cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
};
