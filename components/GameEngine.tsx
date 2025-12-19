
import React, { useState, useEffect, useCallback } from 'react';
import { GameConfig, GameType, LevelData } from '../types';
import { themes } from '../data/themes';

interface GameEngineProps {
  config: GameConfig;
  onExit: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ config, onExit }) => {
  const [currentLevel, setCurrentLevel] = useState(config.levels[0]);
  const [question, setQuestion] = useState<{ a: number, b: number, type: GameType } | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const theme = themes[config.theme];

  const generateQuestion = useCallback(() => {
    const { min, max } = currentLevel;
    let a = 0, b = 0;
    let type = config.type === GameType.MIXED ? 
               [GameType.COUNT, GameType.ADD, GameType.SUB][Math.floor(Math.random() * 3)] : 
               config.type;

    if (type === GameType.COUNT) {
      a = Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (type === GameType.ADD) {
      a = Math.floor(Math.random() * (max / 2)) + 1;
      b = Math.floor(Math.random() * (max / 2)) + 1;
    } else if (type === GameType.SUB) {
      a = Math.floor(Math.random() * (max - min + 1)) + min;
      b = Math.floor(Math.random() * a) + 1;
    }

    setQuestion({ a, b, type });

    // Generate options
    const answer = type === GameType.COUNT ? a : (type === GameType.ADD ? a + b : a - b);
    const distractors = new Set<number>();
    distractors.add(answer);
    while (distractors.size < 4) {
      const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const d = Math.max(0, answer + offset);
      if (d !== answer || distractors.size === 1) distractors.add(d);
    }
    setOptions(Array.from(distractors).sort((x, y) => x - y));
    setFeedback(null);
  }, [config.type, currentLevel]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (val: number) => {
    if (!question) return;
    const answer = question.type === GameType.COUNT ? question.a : (question.type === GameType.ADD ? question.a + question.a + question.b : question.a - question.b);
    
    // In our logic for ADD, we need to be careful. Let's recalculate answer correctly.
    const actualAnswer = question.type === GameType.COUNT ? question.a : (question.type === GameType.ADD ? question.a + question.b : question.a - question.b);

    if (val === actualAnswer) {
      setFeedback('correct');
      setScore(s => s + 10);
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!question) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 ${theme.background}`}>
      <div className="absolute top-4 left-4 flex gap-4">
        <button onClick={onExit} className="bg-white/80 hover:bg-white p-3 rounded-2xl shadow-md text-2xl">🏠</button>
        <div className="bg-white/80 px-6 py-2 rounded-2xl shadow-md font-black text-emerald-600">
          Điểm: {score}
        </div>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center">
        <h2 className={`text-4xl font-black mb-8 text-center ${theme.accent}`}>{config.title}</h2>
        
        {/* Play Area */}
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl w-full flex flex-col items-center relative overflow-hidden">
          {feedback === 'correct' && (
            <div className="absolute inset-0 z-10 bg-emerald-500/90 flex items-center justify-center animate-bounce">
              <span className="text-8xl">🌟 Giỏi Lắm!</span>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="absolute inset-0 z-10 bg-rose-500/90 flex items-center justify-center">
              <span className="text-8xl">❌ Thử Lại Nhé!</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 mb-12 min-h-[120px]">
            {question.type === GameType.COUNT && (
              <div className="flex flex-wrap justify-center gap-4 max-w-lg">
                {Array.from({ length: question.a }).map((_, i) => (
                  <span key={i} className="text-6xl floating" style={{ animationDelay: `${i * 0.2}s` }}>
                    {theme.itemImage}
                  </span>
                ))}
              </div>
            )}
            
            {question.type === GameType.ADD && (
              <div className="flex items-center gap-6">
                <div className="flex flex-wrap justify-center gap-2 max-w-[150px]">
                   {Array.from({ length: question.a }).map((_, i) => <span key={i} className="text-4xl">{theme.itemImage}</span>)}
                </div>
                <span className="text-5xl font-black text-slate-400">+</span>
                <div className="flex flex-wrap justify-center gap-2 max-w-[150px]">
                   {Array.from({ length: question.b }).map((_, i) => <span key={i} className="text-4xl">{theme.itemImage}</span>)}
                </div>
              </div>
            )}

            {question.type === GameType.SUB && (
              <div className="flex items-center gap-6">
                <div className="flex flex-wrap justify-center gap-2 max-w-[250px]">
                   {Array.from({ length: question.a }).map((_, i) => (
                     <span key={i} className={`text-4xl ${i >= (question.a - question.b) ? 'opacity-20 grayscale' : ''}`}>
                       {theme.itemImage}
                     </span>
                   ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="bg-slate-100 hover:bg-white hover:scale-105 active:scale-95 border-b-8 border-slate-200 hover:border-emerald-400 transition-all py-8 rounded-3xl text-5xl font-black text-slate-700"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xl text-slate-500 font-bold bg-white/50 px-6 py-2 rounded-full italic">
          "{config.subtitle}"
        </p>
      </div>
    </div>
  );
};

export default GameEngine;
