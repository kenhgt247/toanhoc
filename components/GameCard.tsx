
import React from 'react';
import { GameConfig } from '../types';

interface GameCardProps {
  game: GameConfig;
  onClick: (game: GameConfig) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <button
      onClick={() => onClick(game)}
      className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-transparent hover:border-emerald-400 text-left overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-8xl">{game.icon}</span>
      </div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:bg-emerald-100 transition-colors">
          {game.icon}
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-1">{game.title}</h3>
        <p className="text-sm text-slate-500 font-medium">{game.subtitle}</p>
        
        <div className="mt-4 flex gap-2">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
            game.type === 'COUNT' ? 'bg-blue-100 text-blue-600' :
            game.type === 'ADD' ? 'bg-green-100 text-green-600' :
            game.type === 'SUB' ? 'bg-red-100 text-red-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            {game.type === 'COUNT' ? 'Đếm' : game.type === 'ADD' ? 'Phép Cộng' : game.type === 'SUB' ? 'Phép Trừ' : 'Hỗn Hợp'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default GameCard;
