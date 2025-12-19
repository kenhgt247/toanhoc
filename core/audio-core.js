
import { GoogleGenAI, Modality } from "@google/genai";

export class AudioCore {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.isMuted = false;
  }

  setMute(mute) {
    this.isMuted = mute;
  }

  async playSfx(type) {
    if (this.isMuted) return;
    console.log(`Playing SFX: ${type}`);
    // Có thể thêm logic phát âm thanh bíp đơn giản nếu không có file mp3
  }

  async speak(text) {
    if (this.isMuted) return;

    try {
      // Đảm bảo AudioContext hoạt động (vượt rào cản autoplay của trình duyệt)
      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ 
          parts: [{ 
            text: `Bạn là giáo viên mầm non vui vẻ. Hãy đọc to và rõ ràng câu hỏi toán học sau cho trẻ em: ${text}` 
          }] 
        }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Giọng nữ nhẹ nhàng
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
      console.warn("TTS Error (Check API Key or Connectivity):", error);
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
