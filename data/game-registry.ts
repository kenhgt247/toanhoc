
import { GameConfig, GameType } from '../types.ts';

export const gameRegistry: GameConfig[] = [
  {
    id: 'dem-chu-vit-vang',
    title: 'Đếm Chú Vịt Vàng',
    subtitle: 'Mấy chú vịt đang bơi tung tăng dưới hồ kìa!',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🦆',
    theme: 'animal',
    tts: true
  },
  {
    id: 'dem-banh-donut',
    title: 'Đếm Bánh Donut',
    subtitle: 'Bánh donut thơm phức, bé đếm xem có mấy cái nhé!',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍩',
    theme: 'candy',
    tts: true
  },
  {
    id: 'cong-nhung-chu-gau',
    title: 'Cộng Những Chú Gấu',
    subtitle: 'Gấu bông xếp hàng, cùng tính tổng số gấu nào.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🧸',
    theme: 'animal',
    tts: true
  },
  {
    id: 'cong-phi-thuyen',
    title: 'Cộng Phi Thuyền',
    subtitle: 'Các phi thuyền đang bay vào vũ trụ, tổng cộng là bao nhiêu?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🚀',
    theme: 'space',
    tts: true
  },
  {
    id: 'tru-kem-oc-que',
    title: 'Trừ Kem Ốc Quế',
    subtitle: 'Kem ngon quá, một số que đã hết rồi, còn lại bao nhiêu nhỉ?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍦',
    theme: 'candy',
    tts: true
  },
  {
    id: 'dem-tao',
    title: 'Đếm Táo Đỏ',
    subtitle: 'Bé hãy đếm xem có bao nhiêu quả táo nhé!',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 5 }, { id: 'l2', min: 1, max: 10 }],
    icon: '🍎',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'thu-thach-toan-nhi',
    title: 'Thử Thách Toán Nhí',
    subtitle: 'Kết hợp đếm, cộng và trừ siêu tốc.',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🏆',
    theme: 'space',
    tts: true
  }
];

// Sinh thêm game mẫu
for (let i = 1; i <= 15; i++) {
    const categories = [GameType.COUNT, GameType.ADD, GameType.SUB];
    const category = categories[i % categories.length];
    const themesList: ('fruit' | 'animal' | 'space' | 'candy')[] = ['fruit', 'animal', 'space', 'candy'];
    const theme = themesList[i % themesList.length];
    
    gameRegistry.push({
        id: `game-phu-${i}`,
        title: `Bài Tập ${category} ${i}`,
        subtitle: `Rèn luyện kỹ năng ${category.toLowerCase()} vui nhộn.`,
        type: category,
        levels: [{ id: 'l1', min: 1, max: 10 }],
        icon: '📚',
        theme: theme,
        tts: true
    });
}
