
export const launchConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: any) {
    // Cast window to any to access confetti property which is loaded via external script and avoids TS error
    const win = window as any;
    if (win.confetti) {
        win.confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }
  }

  // Actually trigger the confetti effect sequences
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  // Fallback for simple visual feedback if confetti lib not available
  console.log("CELEBRATION!");
};

// Add standard script for confetti in index.html if possible or handle dynamically
