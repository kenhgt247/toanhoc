
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameConfig, GameType } from '../types.ts';
import { themes } from '../data/themes.ts';
import { launchConfetti } from '../core/confetti.ts';
import { AudioCore } from '../core/audio-core.js';

interface GameEngineProps {
  config: GameConfig;
  startLevelIndex?: number;
  onExit: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ config, startLevelIndex = 0, onExit }) => {
  const [levelIdx, setLevelIdx] = useState(startLevelIndex);
  const [question, setQuestion] = useState<{ a: number, b: number, type: GameType } | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  const theme = themes[config.theme];
  const currentLevel = config.levels[levelIdx] || config.levels[0];
  
  const audio = useMemo(() => new AudioCore(), []);

  useEffect(() => {
    audio.setMute(isMuted);
  }, [isMuted, audio]);

  const generateQuestion = useCallback(() => {
    const { min, max } = currentLevel;
    let a = 0, b = 0;
    let type = config.type === GameType.MIXED ? 
               [GameType.COUNT, GameType.ADD, GameType.SUB][Math.floor(Math.random() * 3)] : 
               config.type as GameType;

    if (type === GameType.COUNT) {
      a = Math.floor(Math.random() * (max - min + 1)) + min;
      b = 0;
    } else if (type === GameType.ADD) {
      a = Math.floor(Math.random() * (Math.floor(max/2))) + 1;
      b = Math.floor(Math.random() * (max - a)) + 1;
    } else if (type === GameType.SUB) {
      a = Math.floor(Math.random() * (max - min + 1)) + min;
      b = Math.floor(Math.random() * a) + 1;
    }

    setQuestion({ a, b, type });

    const answer = type === GameType.COUNT ? a : (type === GameType.ADD ? a + b : a - b);
    const distractors = new Set<number>();
    distractors.add(answer);
    while (distractors.size < 4) {
      const offset = Math.floor(Math.random() * 7) - 3;
      const d = Math.max(0, answer + offset);
      distractors.add(d);
    }
    setOptions(Array.from(distractors).sort((x, y) => x - y));
    setFeedback(null);

    if (config.tts && !isMuted) {
      let speechText = "";
      if (type === GameType.COUNT) {
        speechText = `Bé hãy đếm xem có bao nhiêu ${theme.itemImage} nhé?`;
      } else if (type === GameType.ADD) {
        speechText = `${a} cộng ${b} bằng mấy nhỉ?`;
      } else if (type === GameType.SUB) {
        speechText = `${a} trừ ${b} bằng bao nhiêu?`;
      }
      audio.speak(speechText);
    }
  }, [config, currentLevel, isMuted, audio, theme.itemImage]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (val: number) => {
    audio.ensureAudioContext(); // Đảm bảo audio context được kích hoạt khi chạm
    if (!question || feedback) return;
    
    const actualAnswer = question.type === GameType.COUNT ? question.a : (question.type === GameType.ADD ? question.a + question.b : question.a - question.b);

    if (val === actualAnswer) {
      setFeedback('correct');
      setScore(s => s + 10);
      launchConfetti();
      audio.playSfx('correct');
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      setFeedback('wrong');
      audio.playSfx('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  if (!question) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${theme.background} overflow-hidden`}>
      {/* HUD bar - Tối ưu cho mobile */}
      <div className="p-3 md:p-4 flex justify-between items-center z-20 bg-white/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <button 
            onClick={onExit} 
            className="bg-white hover:bg-slate-50 p-2 md:p-3 rounded-xl shadow text-lg md:text-2xl border-b-4 border-slate-200 active:translate-y-1 transition-all"
          >
            🏠
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="bg-white hover:bg-slate-50 p-2 md:p-3 rounded-xl shadow text-lg md:text-2xl border-b-4 border-slate-200 active:translate-y-1 transition-all"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
        <div className="flex gap-2 md:gap-4">
          <div className="bg-white/90 px-3 md:px-6 py-1 md:py-2 rounded-xl shadow-lg font-black text-emerald-600 border-b-4 border-slate-200 text-sm md:text-base">
            Cấp: {levelIdx + 1}
          </div>
          <div className="bg-white/90 px-3 md:px-6 py-1 md:py-2 rounded-xl shadow-lg font-black text-orange-500 border-b-4 border-slate-200 text-sm md:text-base">
            Điểm: {score}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl relative flex flex-col border-4 md:border-8 border-white/50">
          
          {/* Feedback Overlay */}
          {feedback === 'correct' && (
            <div className="absolute inset-0 z-30 bg-emerald-500/90 flex items-center justify-center rounded-[2rem] md:rounded-[3rem] animate-in fade-in zoom-in duration-300">
              <div className="text-center">
                <span className="text-6xl md:text-8xl block mb-2">🌟</span>
                <span className="text-3xl md:text-5xl font-black text-white uppercase">Giỏi Lắm!</span>
              </div>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="absolute inset-0 z-30 bg-rose-500/90 flex items-center justify-center rounded-[2rem] md:rounded-[3rem] animate-in fade-in zoom-in duration-200">
              <div className="text-center">
                <span className="text-6xl md:text-8xl block mb-2">❌</span>
                <span className="text-3xl md:text-5xl font-black text-white uppercase">Thử Lại!</span>
              </div>
            </div>
          )}

          {/* Question Display */}
          <div className="text-center mb-4 md:mb-8">
            <h2 className={`text-xl md:text-3xl font-black ${theme.accent} game-font`}>
              {question.type === GameType.COUNT ? 'Bé hãy đếm nhé!' : 
               question.type === GameType.ADD ? 'Phép tính cộng' : 'Phép tính trừ'}
            </h2>
          </div>

          {/* Items Grid - Tự động co giãn cho mobile */}
          <div className="flex-1 flex items-center justify-center min-h-[140px] md:min-h-[220px] bg-slate-50/50 rounded-2xl md:rounded-[2rem] p-3 md:p-6 mb-6">
            {question.type === GameType.COUNT && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-4">
                {Array.from({ length: question.a }).map((_, i) => (
                  <span key={i} className="text-4xl md:text-6xl floating" style={{ animationDelay: `${i * 0.1}s` }}>
                    {theme.itemImage}
                  </span>
                ))}
              </div>
            )}
            
            {question.type === GameType.ADD && (
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 max-w-[120px] md:max-w-[180px]">
                   {Array.from({ length: question.a }).map((_, i) => <span key={i} className="text-3xl md:text-5xl">{theme.itemImage}</span>)}
                </div>
                <span className="text-4xl md:text-6xl font-black text-slate-300">+</span>
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 max-w-[120px] md:max-w-[180px]">
                   {Array.from({ length: question.b }).map((_, i) => <span key={i} className="text-3xl md:text-5xl">{theme.itemImage}</span>)}
                </div>
              </div>
            )}

            {question.type === GameType.SUB && (
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-full">
                 {Array.from({ length: question.a }).map((_, i) => (
                   <span key={i} className={`text-4xl md:text-6xl transition-all duration-500 ${i >= (question.a - question.b) ? 'opacity-10 scale-50 grayscale blur-[1px]' : 'floating'}`}>
                     {theme.itemImage}
                   </span>
                 ))}
              </div>
            )}
          </div>

          {/* Answer Buttons - To và dễ bấm */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                style={{ touchAction: 'manipulation' }}
                className="bg-slate-100 hover:bg-emerald-50 active:scale-95 border-b-8 md:border-b-[12px] border-slate-200 hover:border-emerald-400 transition-all py-4 md:py-8 rounded-xl md:rounded-[2rem] text-4xl md:text-6xl font-black text-slate-700 shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        
        {/* Caption */}
        <p className="mt-4 md:mt-8 text-sm md:text-xl text-slate-500 font-bold bg-white/50 px-4 md:px-8 py-2 md:py-3 rounded-full text-center">
          {config.subtitle}
        </p>
      </div>
    </div>
  );
};

export default GameEngine;
