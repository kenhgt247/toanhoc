
import { GoogleGenAI, Modality } from "@google/genai";

export class AudioCore {
  constructor() {
    this.audioCtx = null;
    this.ai = null;
    this.isMuted = false;
    this.init();
  }

  init() {
    try {
      // Lazy init AudioContext to avoid browser policy issues before interaction
      const apiKey = window.process?.env?.API_KEY || "";
      if (apiKey) {
        this.ai = new GoogleGenAI({ apiKey });
      } else {
        console.warn("AudioCore: API_KEY not found in environment.");
      }
    } catch (e) {
      console.error("AudioCore Init Error:", e);
    }
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setMute(mute) {
    this.isMuted = mute;
  }

  async playSfx(type) {
    if (this.isMuted) return;
    console.log(`SFX: ${type}`);
    // SFX logic can be added here
  }

  async speak(text) {
    if (this.isMuted || !this.ai) return;

    try {
      this.ensureAudioContext();

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ 
          parts: [{ 
            text: `Bạn là cô giáo mầm non. Hãy đọc chậm, rõ ràng câu hỏi: ${text}` 
          }] 
        }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBuffer = await this.decodeAudioData(this.base64ToUint8(base64Audio));
        const source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioCtx.destination);
        source.start();
      }
    } catch (error) {
      console.error("AudioCore Speak Error:", error);
    }
  }

  base64ToUint8(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async decodeAudioData(data) {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = this.audioCtx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  }
}
