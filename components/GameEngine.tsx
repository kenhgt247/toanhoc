
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
  const [hasStarted, setHasStarted] = useState(false);
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

    if (hasStarted && config.tts && !isMuted) {
      let speechText = "";
      if (type === GameType.COUNT) {
        speechText = `Bé hãy đếm xem có bao nhiêu ${config.icon || 'vật phẩm'}?`;
      } else if (type === GameType.ADD) {
        speechText = `${a} cộng ${b} bằng mấy?`;
      } else if (type === GameType.SUB) {
        speechText = `${a} trừ ${b} bằng mấy?`;
      }
      audio.speak(speechText);
    }
  }, [config, currentLevel, isMuted, audio, hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      generateQuestion();
    }
  }, [hasStarted, generateQuestion]);

  const handleStartGame = () => {
    audio.ensureAudioContext();
    setHasStarted(true);
  };

  const handleAnswer = (val: number) => {
    audio.ensureAudioContext();
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

  if (!hasStarted) {
    return (
      <div className={`fixed inset-0 z-[60] flex items-center justify-center ${theme.background} p-4`}>
        <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl text-center border-4 md:border-8 border-white w-full max-w-md">
          <div className="text-6xl md:text-8xl mb-4 md:mb-6 floating">{config.icon}</div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4 text-slate-800">{config.title}</h2>
          <p className="text-slate-500 mb-6 md:mb-10 font-bold text-sm md:text-base">{config.subtitle}</p>
          <button 
            onClick={handleStartGame}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xl md:text-3xl font-black px-8 py-4 md:py-6 rounded-2xl md:rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 md:border-b-8 border-emerald-700"
          >
            BẮT ĐẦU! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${theme.background} overflow-hidden`}>
      {/* HUD bar */}
      <div className="p-2 md:p-4 flex justify-between items-center z-20 bg-white/70 backdrop-blur-sm border-b-2 border-slate-200/30">
        <div className="flex gap-2">
          <button 
            onClick={onExit} 
            className="bg-white hover:bg-slate-50 p-2 md:p-3 rounded-xl shadow text-xl md:text-2xl border-b-4 border-slate-200 active:translate-y-1 transition-all"
          >
            🏠
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="bg-white hover:bg-slate-50 p-2 md:p-3 rounded-xl shadow text-xl md:text-2xl border-b-4 border-slate-200 active:translate-y-1 transition-all"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
        <div className="flex gap-2 md:gap-4">
          <div className="bg-white/90 px-3 md:px-6 py-1 md:py-2 rounded-xl shadow-sm font-black text-emerald-600 border-b-4 border-slate-200 text-xs md:text-sm">
            Cấp: {levelIdx + 1}
          </div>
          <div className="bg-white/90 px-3 md:px-6 py-1 md:py-2 rounded-xl shadow-sm font-black text-orange-500 border-b-4 border-slate-200 text-xs md:text-sm">
            Điểm: {score}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl relative flex flex-col border-4 md:border-8 border-white/50 min-h-[500px] md:min-h-0">
          
          {/* Feedback Overlay */}
          {feedback === 'correct' && (
            <div className="absolute inset-0 z-30 bg-emerald-500/95 flex items-center justify-center rounded-[2rem] md:rounded-[3rem] animate-in fade-in zoom-in duration-300">
              <div className="text-center">
                <span className="text-7xl md:text-9xl block mb-2">🌟</span>
                <span className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider">Giỏi Lắm!</span>
              </div>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="absolute inset-0 z-30 bg-rose-500/95 flex items-center justify-center rounded-[2rem] md:rounded-[3rem] animate-in fade-in zoom-in duration-200">
              <div className="text-center">
                <span className="text-7xl md:text-9xl block mb-2">❌</span>
                <span className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider">Thử Lại!</span>
              </div>
            </div>
          )}

          {/* Question Header */}
          <div className="text-center mb-4 md:mb-8">
            <h2 className={`text-2xl md:text-4xl font-black ${theme.accent} game-font uppercase tracking-tight`}>
              {question.type === GameType.COUNT ? 'Bé hãy đếm nhé!' : 
               question.type === GameType.ADD ? 'Làm phép cộng' : 'Làm phép trừ'}
            </h2>
          </div>

          {/* Items Visualization Area */}
          <div className="flex-1 flex items-center justify-center min-h-[200px] md:min-h-[300px] bg-slate-50/50 rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 mb-6 border-2 border-dashed border-slate-200">
            {question.type === GameType.COUNT && (
              <div className="grid grid-cols-5 gap-3 md:gap-6">
                {Array.from({ length: question.a }).map((_, i) => (
                  <span key={i} className="text-4xl md:text-7xl floating" style={{ animationDelay: `${i * 0.1}s` }}>
                    {theme.itemImage}
                  </span>
                ))}
              </div>
            )}
            
            {question.type === GameType.ADD && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
                <div className="flex flex-wrap justify-center gap-2 max-w-[150px] md:max-w-[200px]">
                   {Array.from({ length: question.a }).map((_, i) => <span key={i} className="text-4xl md:text-6xl">{theme.itemImage}</span>)}
                </div>
                <span className="text-5xl md:text-8xl font-black text-slate-300">+</span>
                <div className="flex flex-wrap justify-center gap-2 max-w-[150px] md:max-w-[200px]">
                   {Array.from({ length: question.b }).map((_, i) => <span key={i} className="text-4xl md:text-6xl">{theme.itemImage}</span>)}
                </div>
              </div>
            )}

            {question.type === GameType.SUB && (
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-full">
                 {Array.from({ length: question.a }).map((_, i) => (
                   <span key={i} className={`text-4xl md:text-7xl transition-all duration-700 ${i >= (question.a - question.b) ? 'opacity-5 scale-50 grayscale blur-[2px] rotate-45' : 'floating'}`}>
                     {theme.itemImage}
                   </span>
                 ))}
              </div>
            )}
          </div>

          {/* Answer Choice Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="bg-slate-50 hover:bg-emerald-50 active:scale-90 border-b-8 md:border-b-[14px] border-slate-200 hover:border-emerald-400 transition-all py-6 md:py-10 rounded-2xl md:rounded-[2.5rem] text-4xl md:text-7xl font-black text-slate-700 shadow-md"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEngine;
