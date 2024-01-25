export interface Tesla {
  code: ModelCodeAvailable;
  description: ModelDescriptionAvailable;
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

export interface Step1FormInterface {
  currentModel: ModelDescriptionAvailable;
  currentColor: ColorAvailable
}

export type Option = {
  [key in ModelCodeAvailable]: {
    configs: Config[];
    towHitch: boolean;
    yoke: boolean;
  };
};

export type ModelCodeAvailable = 'S' | 'X' | 'C' | '3' | 'Y';
export type ModelDescriptionAvailable = 'Model S' | 'Model X' | 'Cybertruck' | 'Model 3' | 'Model Y';
export type ColorAvailable = 'white' | 'black'| 'blue' | 'grey'| 'red';
