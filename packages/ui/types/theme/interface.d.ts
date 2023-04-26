import { Scheme } from './scheme';
import { TonalPalette } from './palettes/tonal';
export interface CustomColor {
    value: number;
    name: string;
    blend: boolean;
}
export interface ColorGroup {
    color: number;
    onColor: number;
    colorContainer: number;
    onColorContainer: number;
}
export interface CustomColorGroup {
    color: CustomColor;
    value: number;
    light: ColorGroup;
    dark: ColorGroup;
}
export interface Theme {
    source: number;
    schemes: {
        light: Scheme;
        dark: Scheme;
    };
    palettes: {
        primary: TonalPalette;
        secondary: TonalPalette;
        tertiary: TonalPalette;
        neutral: TonalPalette;
        neutralVariant: TonalPalette;
        error: TonalPalette;
    };
    customColors: CustomColorGroup[];
}
