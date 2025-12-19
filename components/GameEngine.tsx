
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
  
  // Khởi tạo AudioCore duy nhất một lần
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
      a = Math.floor(Math.random() * (max - 1)) + 1;
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

    // Phát âm thanh TTS cho câu hỏi
    if (config.tts && !isMuted) {
      let speechText = "";
      if (type === GameType.COUNT) {
        speechText = `Bé hãy đếm xem có bao nhiêu ${config.theme === 'fruit' ? 'quả táo' : 'đồ vật'} nhé?`;
      } else if (type === GameType.ADD) {
        speechText = `${a} cộng ${b} bằng mấy nhỉ?`;
      } else if (type === GameType.SUB) {
        speechText = `${a} trừ ${b} bằng bao nhiêu?`;
      }
      audio.speak(speechText);
    }
  }, [config, currentLevel, isMuted, audio]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (val: number) => {
    if (!question) return;
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
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!question) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 ${theme.background}`}>
      {/* HUD bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="flex gap-2">
          <button 
            onClick={onExit} 
            className="bg-white/90 hover:bg-white p-3 rounded-2xl shadow-lg text-2xl border-b-4 border-slate-200 active:border-0 active:translate-y-1 transition-all"
          >
            🏠 Thoát
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="bg-white/90 hover:bg-white p-3 rounded-2xl shadow-lg text-2xl border-b-4 border-slate-200 active:border-0 active:translate-y-1 transition-all"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/90 px-6 py-2 rounded-2xl shadow-lg font-black text-emerald-600 border-b-4 border-slate-200 hidden md:block">
            Cấp độ: {levelIdx + 1}
          </div>
          <div className="bg-white/90 px-6 py-2 rounded-2xl shadow-lg font-black text-orange-500 border-b-4 border-slate-200">
            Điểm: {score}
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center">
        <h2 className={`text-4xl font-black mb-6 text-center drop-shadow-sm ${theme.accent} game-font`}>{config.title}</h2>
        
        <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-2xl w-full flex flex-col items-center relative overflow-hidden border-8 border-white/50">
          {feedback === 'correct' && (
            <div className="absolute inset-0 z-30 bg-emerald-500/95 flex items-center justify-center animate-in fade-in zoom-in duration-300">
              <div className="text-center">
                <span className="text-8xl block mb-4">🌟</span>
                <span className="text-5xl font-black text-white uppercase tracking-widest">Giỏi Lắm!</span>
              </div>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="absolute inset-0 z-30 bg-rose-500/95 flex items-center justify-center animate-in fade-in zoom-in duration-200">
              <div className="text-center">
                <span className="text-8xl block mb-4">❌</span>
                <span className="text-5xl font-black text-white uppercase tracking-widest">Thử Lại Nhé!</span>
              </div>
            </div>
          )}

          {/* Question Visualization */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 min-h-[180px] w-full bg-slate-50/50 rounded-[2rem] p-4">
            {question.type === GameType.COUNT && (
              <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
                {Array.from({ length: question.a }).map((_, i) => (
                  <span key={i} className="text-6xl md:text-8xl floating" style={{ animationDelay: `${i * 0.1}s` }}>
                    {theme.itemImage}
                  </span>
                ))}
              </div>
            )}
            
            {question.type === GameType.ADD && (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-wrap justify-center gap-3 max-w-[200px] bg-white p-6 rounded-3xl shadow-inner border-2 border-slate-100">
                   {Array.from({ length: question.a }).map((_, i) => <span key={i} className="text-5xl">{theme.itemImage}</span>)}
                </div>
                <span className="text-7xl font-black text-slate-300">+</span>
                <div className="flex flex-wrap justify-center gap-3 max-w-[200px] bg-white p-6 rounded-3xl shadow-inner border-2 border-slate-100">
                   {Array.from({ length: question.b }).map((_, i) => <span key={i} className="text-5xl">{theme.itemImage}</span>)}
                </div>
              </div>
            )}

            {question.type === GameType.SUB && (
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-wrap justify-center gap-4 max-w-3xl bg-white p-8 rounded-[3rem] shadow-inner border-2 border-slate-100">
                   {Array.from({ length: question.a }).map((_, i) => (
                     <span key={i} className={`text-6xl md:text-7xl transition-all duration-500 ${i >= (question.a - question.b) ? 'opacity-10 scale-75 grayscale blur-[1px]' : 'floating'}`}>
                       {theme.itemImage}
                     </span>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="bg-slate-100 hover:bg-emerald-50 hover:scale-105 active:scale-95 border-b-[12px] border-slate-200 hover:border-emerald-400 transition-all py-8 rounded-[2rem] text-6xl font-black text-slate-700 hover:text-emerald-600 shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xl md:text-2xl text-slate-600 font-black bg-white/70 backdrop-blur-sm px-8 py-3 rounded-full shadow-sm italic border-2 border-white text-center">
          "{config.subtitle}"
        </p>
      </div>
    </div>
  );
};

export default GameEngine;
