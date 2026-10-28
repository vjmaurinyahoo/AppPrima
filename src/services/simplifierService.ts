/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pictogram, SimplifiedSentence } from '../types';
import { INITIAL_PICTOGRAMS, findPictogramByKeyword } from '../data/pictograms';

export class SimplifierService {
  /**
   * Simplifies text into accessible, concrete sentences and associates pictograms
   */
  public simplifyText(text: string): SimplifiedSentence[] {
    if (!text.trim()) return [];

    // Split by periods, exclamation marks, or question marks
    const rawSentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    if (rawSentences.length === 0) {
      return [this.processSingleSentence(text)];
    }

    return rawSentences.map((sentence) => this.processSingleSentence(sentence));
  }

  private processSingleSentence(raw: string): SimplifiedSentence {
    // Generate clean simplified version (trim filler words, keep subject + verb + object)
    let simplified = raw
      .replace(/(\bportanto\b|\bcontudo\b|\btodavia\b|\bentretanto\b|\bconsequentemente\b)/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Capitalize first letter
    simplified = simplified.charAt(0).toUpperCase() + simplified.slice(1);

    // Extract tokens to find matched pictograms
    const words = simplified
      .toLowerCase()
      .replace(/[^\w\sáéíóúâêîôûãõç]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const matchedPictograms: Pictogram[] = [];
    const usedIds = new Set<string>();

    for (const word of words) {
      const pic = findPictogramByKeyword(word);
      if (pic && !usedIds.has(pic.id)) {
        matchedPictograms.push(pic);
        usedIds.add(pic.id);
      }
    }

    // If no pictograms were matched automatically, assign fallback core symbols
    if (matchedPictograms.length === 0) {
      matchedPictograms.push(
        INITIAL_PICTOGRAMS.find((p) => p.id === 'p_eu') || INITIAL_PICTOGRAMS[0],
        INITIAL_PICTOGRAMS.find((p) => p.id === 'v_aprendi') || INITIAL_PICTOGRAMS[1]
      );
    }

    return {
      id: `sent_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      originalText: raw,
      simplifiedText: simplified,
      pictograms: matchedPictograms.slice(0, 5), // Keep max 5 symbols per sentence for cognitive comfort
    };
  }
}

export const simplifierService = new SimplifierService();
