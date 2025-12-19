
import React from 'react';
import { GameConfig, LevelData } from '../types.ts';
import { themes } from '../data/themes.ts';

interface LevelSelectorProps {
  game: GameConfig;
  onSelect: (levelIndex: number) => void;
  onClose: () => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ game, onSelect, onClose }) => {
  const theme = themes[game.theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-300">
        <div className={`${theme.primary} p-8 text-white text-center relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors w-10 h-10 flex items-center justify-center"
          >
            <span className="font-bold">✕</span>
          </button>
          <div className="text-6xl mb-4 floating inline-block bg-white/20 p-4 rounded-full">
            {game.icon}
          </div>
          <h2 className="text-3xl font-black mb-1 leading-tight">{game.title}</h2>
          <p className="opacity-90 font-bold italic">{game.subtitle}</p>
        </div>

        <div className="p-8 bg-white">
          <h3 className="text-slate-400 font-black uppercase tracking-wider text-sm mb-6 text-center">
            Chọn mức độ thử thách
          </h3>
          
          <div className="space-y-4">
            {game.levels.map((level, index) => (
              <button
                key={level.id}
                onClick={() => onSelect(index)}
                className="w-full flex items-center justify-between p-6 rounded-2xl border-4 border-slate-100 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl ${theme.secondary} ${theme.accent}`}>
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <div className="font-black text-slate-700 text-lg">Mức độ {index + 1}</div>
                    <div className="text-slate-400 font-bold text-sm">Phạm vi: {level.min} - {level.max}</div>
                  </div>
                </div>
                <div className="bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white p-2 rounded-full transition-colors">
                  <span className="block w-6 h-6 flex items-center justify-center">▶</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-50 text-center">
          <p className="text-slate-400 text-sm font-bold">
            Cố gắng đạt điểm tối đa bé nhé! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
