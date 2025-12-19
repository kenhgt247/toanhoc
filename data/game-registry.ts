
import { GameConfig, GameType } from '../types.ts';

export const gameRegistry: GameConfig[] = [
  // --- UNDERWATER THEME (7 Games) ---
  {
    id: 'dem-ca-duoi-bien',
    title: 'Đếm Cá Dưới Biển',
    subtitle: 'Những chú cá đầy màu sắc đang bơi, bé đếm xem có mấy con?',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐠',
    theme: 'underwater',
    tts: true
  },
  {
    id: 'cong-ca-vang',
    title: 'Cộng Bạn Cá Vàng',
    subtitle: 'Thêm những bạn cá vàng bơi đến, tổng cộng là bao nhiêu?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐟',
    theme: 'underwater',
    tts: true
  },
  {
    id: 'tru-cua-bien',
    title: 'Trừ Cua Biển',
    subtitle: 'Cua bò vào hang mất rồi, còn lại bao nhiêu con?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: 'Crab',
    theme: 'underwater',
    tts: true
  },
  {
    id: 'dem-vo-so-mau',
    title: 'Đếm Vỏ Sò Màu',
    subtitle: 'Vỏ sò trên cát thật đẹp, bé hãy đếm chúng nhé!',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🐚',
    theme: 'underwater',
    tts: true
  },
  {
    id: 'cong-sao-bien',
    title: 'Cộng Sao Biển',
    subtitle: 'Những chú sao biển lấp lánh đang tụ họp lại.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 8 }],
    icon: '⭐',
    theme: 'underwater',
    tts: true
  },
  {
    id: 'tru-bach-tuoc',
    title: 'Bạch Tuộc Trốn Tìm',
    subtitle: 'Bạch tuộc phun mực rồi trốn mất, còn lại mấy bạn?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐙',
    theme: 'underwater',
    tts: true
  },
  {
    id: 'dai-duong-ky-thu',
    title: 'Đại Dương Kỳ Thú',
    subtitle: 'Thử thách tổng hợp dưới lòng đại dương xanh.',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 15 }],
    icon: '🌊',
    theme: 'underwater',
    tts: true
  },

  // --- FARM THEME (7 Games) ---
  {
    id: 'cong-ga-con',
    title: 'Cộng Gà Con',
    subtitle: 'Nông trại có thêm gà mới, tổng cộng là bao nhiêu nhỉ?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐥',
    theme: 'farm',
    tts: true
  },
  {
    id: 'dem-ca-rot',
    title: 'Đếm Cà Rốt',
    subtitle: 'Bác nông dân vừa thu hoạch cà rốt, bé đếm giúp bác nhé!',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 15 }],
    icon: '🥕',
    theme: 'farm',
    tts: true
  },
  {
    id: 'tru-cu-cai',
    title: 'Trừ Củ Cải',
    subtitle: 'Thỏ con đã ăn mất vài củ cải rồi, còn lại bao nhiêu?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🥬',
    theme: 'farm',
    tts: true
  },
  {
    id: 'nong-trai-vui-ve',
    title: 'Nông Trại Vui Vẻ',
    subtitle: 'Thử thách hỗn hợp cùng các bạn nhỏ ở nông trại.',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🚜',
    theme: 'farm',
    tts: true
  },
  {
    id: 'dem-cu-khoai',
    title: 'Đếm Củ Khoai Tây',
    subtitle: 'Những củ khoai tây tròn trịa vừa được đào lên.',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 20 }],
    icon: '🥔',
    theme: 'farm',
    tts: true
  },
  {
    id: 'cong-bo-sua',
    title: 'Cộng Đàn Bò Sữa',
    subtitle: 'Đàn bò đang gặm cỏ, thêm các bạn bò mới đến.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐄',
    theme: 'farm',
    tts: true
  },
  {
    id: 'tru-cu-ngo',
    title: 'Trừ Những Bắp Ngô',
    subtitle: 'Gà đã mổ mất vài bắp ngô rồi, còn lại bao nhiêu?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🌽',
    theme: 'farm',
    tts: true
  },

  // --- ANIMAL THEME (7 Games) ---
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
    id: 'tru-chu-tho',
    title: 'Trừ Bạn Thỏ Con',
    subtitle: 'Thỏ con chạy vào rừng chơi, còn lại mấy bạn?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐰',
    theme: 'animal',
    tts: true
  },
  {
    id: 'vuon-thu-xinh-xan',
    title: 'Vườn Thú Xinh Xắn',
    subtitle: 'Giải toán cùng các bạn thú trong sở thú nhé!',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🦁',
    theme: 'animal',
    tts: true
  },
  {
    id: 'dem-chu-cho-nho',
    title: 'Đếm Những Chú Chó',
    subtitle: 'Gâu gâu! Có bao nhiêu bạn chó đang chơi đùa?',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 15 }],
    icon: '🐶',
    theme: 'animal',
    tts: true
  },
  {
    id: 'cong-meo-con',
    title: 'Cộng Mèo Con',
    subtitle: 'Mèo con thích cuộn len, thêm các bạn mèo mới.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🐱',
    theme: 'animal',
    tts: true
  },
  {
    id: 'tru-khi-con',
    title: 'Trừ Khỉ Leo Cây',
    subtitle: 'Khỉ con đã leo lên cây cao, còn lại bao nhiêu bạn ở dưới?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🐒',
    theme: 'animal',
    tts: true
  },

  // --- CANDY THEME (7 Games) ---
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
    id: 'cong-keo-mut',
    title: 'Cộng Kẹo Mút',
    subtitle: 'Thêm kẹo ngọt cho bé, tổng cộng là bao nhiêu?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 20 }],
    icon: '🍭',
    theme: 'candy',
    tts: true
  },
  {
    id: 'vuong-quoc-banh-keo',
    title: 'Vương Quốc Bánh Kẹo',
    subtitle: 'Hành trình toán học ngọt ngào nhất thế gian.',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 15 }],
    icon: '🍰',
    theme: 'candy',
    tts: true
  },
  {
    id: 'dem-socola',
    title: 'Đếm Viên Socola',
    subtitle: 'Những viên socola ngọt lịm đang chờ bé đếm.',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍫',
    theme: 'candy',
    tts: true
  },
  {
    id: 'cong-banh-quy',
    title: 'Cộng Bánh Quy',
    subtitle: 'Bánh quy bơ giòn rụm, bé hãy tính tổng nhé.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🍪',
    theme: 'candy',
    tts: true
  },
  {
    id: 'tru-keo-deo',
    title: 'Trừ Kẹo Dẻo',
    subtitle: 'Bé đã ăn bớt vài viên kẹo dẻo, còn lại bao nhiêu?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 15 }],
    icon: '🍬',
    theme: 'candy',
    tts: true
  },

  // --- SPACE THEME (6 Games) ---
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
    id: 'dem-sao-vang',
    title: 'Đếm Ngôi Sao Vàng',
    subtitle: 'Trên bầu trời đêm có bao nhiêu ngôi sao đang tỏa sáng?',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 20 }],
    icon: '⭐',
    theme: 'space',
    tts: true
  },
  {
    id: 'tru-hanh-tinh',
    title: 'Trừ Các Hành Tinh',
    subtitle: 'Một số hành tinh đã khuất sau đám mây, còn lại mấy?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🪐',
    theme: 'space',
    tts: true
  },
  {
    id: 'tham-hiem-vu-tru',
    title: 'Thám Hiểm Vũ Trụ',
    subtitle: 'Bay vào không gian giải toán cùng người ngoài hành tinh.',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🛸',
    theme: 'space',
    tts: true
  },
  {
    id: 'dem-mat-trang',
    title: 'Đếm Mặt Trăng',
    subtitle: 'Bé thấy có bao nhiêu mặt trăng đang khuyết?',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 5 }],
    icon: '🌙',
    theme: 'space',
    tts: true
  },
  {
    id: 'cong-ve-tinh',
    title: 'Cộng Vệ Tinh',
    subtitle: 'Những vệ tinh đang truyền tín hiệu, tổng cộng là bao nhiêu?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🛰️',
    theme: 'space',
    tts: true
  },

  // --- FRUIT THEME (6 Games) ---
  {
    id: 'dem-tao',
    title: 'Đếm Táo Đỏ',
    subtitle: 'Bé hãy đếm xem có bao nhiêu quả táo nhé!',
    type: GameType.COUNT,
    levels: [
      { id: 'l1', min: 1, max: 5 },
      { id: 'l2', min: 1, max: 10 }
    ],
    icon: '🍎',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'cong-chuoi-vang',
    title: 'Cộng Chuối Vàng',
    subtitle: 'Khỉ con mang thêm chuối đến, tổng cộng là mấy quả?',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 15 }],
    icon: '🍌',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'tru-nho-tim',
    title: 'Trừ Chùm Nho',
    subtitle: 'Bé hái bớt vài chùm nho, còn lại bao nhiêu chùm?',
    type: GameType.SUB,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍇',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'bua-tiec-trai-cay',
    title: 'Bữa Tiệc Trái Cây',
    subtitle: 'Giải toán cùng những loại quả tươi ngon.',
    type: GameType.MIXED,
    levels: [{ id: 'l1', min: 1, max: 20 }],
    icon: '🍉',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'dem-cam-tuoi',
    title: 'Đếm Quả Cam',
    subtitle: 'Những quả cam mọng nước đang chờ bé đếm.',
    type: GameType.COUNT,
    levels: [{ id: 'l1', min: 1, max: 12 }],
    icon: '🍊',
    theme: 'fruit',
    tts: true
  },
  {
    id: 'cong-dau-tay',
    title: 'Cộng Dâu Tây',
    subtitle: 'Dâu tây đỏ mọng thật ngon, bé hãy tính tổng nhé.',
    type: GameType.ADD,
    levels: [{ id: 'l1', min: 1, max: 10 }],
    icon: '🍓',
    theme: 'fruit',
    tts: true
  }
];
