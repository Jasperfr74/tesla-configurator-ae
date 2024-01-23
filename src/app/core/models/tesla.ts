export interface Tesla {
  code: ModelAvailable;
  description: string;
  colors: Color[];
}

export interface Color {
  code: ColorAvailable;
  description: string;
  price: number;
}

export interface Config {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export type ModelAvailable = 'S' | 'X' | 'C' | '3' | 'Y';

export type ColorAvailable = 'white' | 'black'| 'blue' | 'grey'| 'red';

export type Option = {
  [key in ModelAvailable]: {
    configs: Config[];
    towHitch: boolean;
    yoke: boolean;
  };
};

