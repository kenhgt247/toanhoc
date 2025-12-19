
export enum GameType {
  COUNT = 'COUNT',
  ADD = 'ADD',
  SUB = 'SUB',
  MIXED = 'MIXED'
}

export interface LevelData {
  id: string;
  min: number;
  max: number;
  itemsPerRow?: number;
}

export interface GameConfig {
  id: string;
  title: string;
  subtitle: string;
  type: GameType;
  levels: LevelData[];
  icon: string;
  theme: 'fruit' | 'animal' | 'space' | 'candy' | 'underwater' | 'farm';
  tts: boolean;
}

export interface ThemeConfig {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  itemImage: string;
}
