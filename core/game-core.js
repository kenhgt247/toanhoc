
export class MathGameCore {
  constructor(config, startLevelIndex = 0) {
    this.config = config;
    this.score = 0;
    this.currentLevelIndex = Math.min(Math.max(0, startLevelIndex), config.levels.length - 1);
  }

  getCurrentLevel() {
    return this.config.levels[this.currentLevelIndex];
  }

  generateQuestion() {
    const level = this.getCurrentLevel();
    const type = this.config.type === 'MIXED' 
      ? ['COUNT', 'ADD', 'SUB'][Math.floor(Math.random() * 3)] 
      : this.config.type;

    let a, b, answer;
    const { min, max } = level;

    switch (type) {
      case 'COUNT':
        a = Math.floor(Math.random() * (max - min + 1)) + min;
        b = 0;
        answer = a;
        break;
      case 'ADD':
        // Ensure total sum is within level limits where possible
        a = Math.floor(Math.random() * (max - 1)) + 1;
        b = Math.floor(Math.random() * (max - a)) + 1;
        answer = a + b;
        break;
      case 'SUB':
        a = Math.floor(Math.random() * (max - min + 1)) + min;
        b = Math.floor(Math.random() * a) + 1;
        answer = a - b;
        break;
      default:
        a = 1; b = 1; answer = 2;
    }

    const options = this.generateOptions(answer);
    return { type, a, b, answer, options };
  }

  generateOptions(answer) {
    const options = new Set();
    options.add(answer);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 5) - 2;
      const opt = Math.max(0, answer + offset);
      options.add(opt);
    }
    return Array.from(options).sort((x, y) => x - y);
  }

  checkAnswer(userAnswer, actualAnswer) {
    const isCorrect = userAnswer === actualAnswer;
    if (isCorrect) this.score += 10;
    return isCorrect;
  }
}
