
import { ThemeConfig } from '../types.ts';

export const themes: Record<string, ThemeConfig> = {
  fruit: {
    background: 'bg-emerald-50',
    primary: 'bg-emerald-500',
    secondary: 'bg-emerald-100',
    accent: 'text-orange-500',
    itemImage: '🍎'
  },
  animal: {
    background: 'bg-amber-50',
    primary: 'bg-amber-500',
    secondary: 'bg-amber-100',
    accent: 'text-orange-600',
    itemImage: '🐰'
  },
  space: {
    background: 'bg-indigo-900',
    primary: 'bg-indigo-500',
    secondary: 'bg-indigo-800',
    accent: 'text-yellow-300',
    itemImage: '⭐'
  },
  candy: {
    background: 'bg-pink-50',
    primary: 'bg-pink-500',
    secondary: 'bg-pink-100',
    accent: 'text-purple-500',
    itemImage: '🍭'
  },
  underwater: {
    background: 'bg-cyan-50',
    primary: 'bg-blue-500',
    secondary: 'bg-cyan-100',
    accent: 'text-blue-700',
    itemImage: '🐠'
  },
  farm: {
    background: 'bg-yellow-50',
    primary: 'bg-orange-500',
    secondary: 'bg-yellow-100',
    accent: 'text-red-700',
    itemImage: '🐥'
  }
};
