
import React, { useState, useMemo } from 'react';
import { GameConfig, GameType } from './types.ts';
import { gameRegistry } from './data/game-registry.ts';
import GameCard from './components/GameCard.tsx';
import LevelSelector from './components/LevelSelector.tsx';

const App: React.FC = () => {
  const [filter, setFilter] = useState<GameType | 'ALL'>('ALL');
  const [selectedGame, setSelectedGame] = useState<GameConfig | null>(null);

  const filteredGames = useMemo(() => {
    return filter === 'ALL' 
      ? gameRegistry 
      : gameRegistry.filter(g => g.type === filter);
  }, [filter]);

  const handleGameCardClick = (game: GameConfig) => {
    setSelectedGame(game);
  };

  const handleLevelSelect = (levelIndex: number) => {
    if (selectedGame) {
      // Sử dụng đường dẫn tương đối thay vì bắt đầu bằng /
      window.location.href = `games/${selectedGame.id}/index.html?level=${levelIndex}`;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-sky-50">
      <header className="bg-white border-b-4 border-emerald-100 py-8 px-4 text-center sticky top-0 z-40 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-black text-emerald-600 mb-2 game-font">
          TOÁN HỌC NHÍ 🌈
        </h1>
        <p className="text-slate-500 font-bold">Lựa chọn trò chơi để bắt đầu cuộc phiêu lưu!</p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {(['ALL', GameType.COUNT, GameType.ADD, GameType.SUB, GameType.MIXED] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-full font-black text-sm uppercase transition-all ${
                filter === t 
                  ? 'bg-emerald-500 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border-2 border-slate-100'
              }`}
            >
              {t === 'ALL' ? 'Tất cả' : t === 'COUNT' ? 'Đếm' : t === 'ADD' ? 'Cộng' : t === 'SUB' ? 'Trừ' : 'Hỗn Hợp'}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={handleGameCardClick} 
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-2xl font-bold text-slate-400">Không tìm thấy trò chơi phù hợp.</p>
          </div>
        )}
      </main>

      {/* Level Selector Modal */}
      {selectedGame && (
        <LevelSelector 
          game={selectedGame}
          onSelect={handleLevelSelect}
          onClose={() => setSelectedGame(null)}
        />
      )}

      <div className="fixed bottom-0 right-0 p-8 pointer-events-none">
        <div className="text-8xl floating opacity-30">🐰</div>
      </div>
    </div>
  );
};

export default App;
