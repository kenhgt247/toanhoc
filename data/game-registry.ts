
import { GameConfig, GameType } from '../types';

export const gameRegistry: GameConfig[] = [
  // --- NEW ADDITIONS ---
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

  // --- EXISTING COUNTING GAMES ---
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
    id: 'dem-khinh-khi-cau',
    title: 'Đếm Khinh Khí Cầu',
    subtitle: 'Đếm xem có bao nhiêu khinh khí cầu đang bay nào!',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🎈',
    theme: 'space',
    tts: true
  },
  {
    id: 'dem-chu-ech-con',
    title: 'Đếm Chú Ếch Con',
    subtitle: 'Có bao nhiêu chú ếch đang ngồi trên lá sen nhỉ?',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐸',
    theme: 'animal',
    tts: true
  },
  {
    id: 'dem-sao-dem',
    title: 'Ngôi Sao Lấp Lánh',
    subtitle: 'Đếm các ngôi sao trên bầu trời đêm.',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '⭐',
    theme: 'space',
    tts: true
  },
  {
    id: 'tho-an-ca-rot',
    title: 'Thỏ Con Ăn Cà Rốt',
    subtitle: 'Giúp thỏ đếm số cà rốt thỏ có.',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 8 }],
    icon: '🐰',
    theme: 'animal',
    tts: true
  },
  {
    id: 'keo-ngot-cua-be',
    title: 'Tiệm Kẹo Ngọt',
    subtitle: 'Đếm những viên kẹo màu sắc.',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🍭',
    theme: 'candy',
    tts: true
  },
  {
      id: 'xe-o-to-nho',
      title: 'Gara Ô Tô',
      subtitle: 'Đếm xem có bao nhiêu chiếc xe đang đậu.',
      type: GameType.COUNT,
      levels: [{ id: 'l1', min: 1, max: 6 }],
      icon: '🚗',
      theme: 'fruit',
      tts: true
  },
  // --- EXISTING ADDITION GAMES ---
  {
    id: 'phep-cong-keo-mut',
    title: 'Phép Cộng Kẹo Mút',
    subtitle: 'Cùng cộng những cây kẹo mút ngọt ngào nhé!',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍬',
    theme: 'candy',
    tts: true
  },
  {
    id: 'cong-nhung-chiec-xe',
    title: 'Cộng Những Chiếc Xe',
    subtitle: 'Tính tổng số xe trong bãi đỗ nào.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🏎️',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'cong-trai-cay',
    title: 'Phép Cộng Trái Cây',
    subtitle: 'Cộng thêm các loại quả thơm ngon.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 5 }],
    icon: '🍓',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'phien-da-vu tru',
    title: 'Thiên Thạch Rơi',
    subtitle: 'Tính tổng số thiên thạch đang bay.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '☄️',
    theme: 'space',
    tts: true
  },
  {
    id: 'dan-kien-cham-chi',
    title: 'Đàn Kiến Chăm Chỉ',
    subtitle: 'Mấy chú kiến đang cùng nhau tha mồi nhỉ?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 5 }],
    icon: '🐜',
    theme: 'animal',
    tts: true
  },
  // --- EXISTING SUBTRACTION GAMES ---
  {
    id: 'tru-qua-cam-ngot',
    title: 'Trừ Quả Cam Ngọt',
    subtitle: 'Một vài quả cam đã bị hái đi rồi, còn lại bao nhiêu nhỉ?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍊',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'tru-bong-bay',
    title: 'Bóng Bay Biến Mất',
    subtitle: 'Một số bóng bay đã bị nổ rồi!',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 2, max: 10 }],
    icon: '🎈',
    theme: 'candy',
    tts: true
  },
  {
    id: 'ca-vang-boi-loi',
    title: 'Cá Vàng Rời Đàn',
    subtitle: 'Trừ đi số cá đã bơi đi chỗ khác.',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 5, max: 10 }],
    icon: '🐠',
    theme: 'animal',
    tts: true
  },
  // --- MIXED CHALLENGES ---
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

// Dynamically generate the rest of the 50 games for structural completeness
for (let i = 1; i <= 30; i++) {
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
