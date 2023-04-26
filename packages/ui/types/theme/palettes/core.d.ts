import { TonalPalette } from './tonal';
export declare class CorePalette {
    a1: TonalPalette;
    a2: TonalPalette;
    a3: TonalPalette;
    n1: TonalPalette;
    n2: TonalPalette;
    error: TonalPalette;
    /**
     * @param argb ARGB representation of a color
     */
    static of(argb: number): CorePalette;
    /**
     * @param argb ARGB representation of a color
     */
    static contentOf(argb: number): CorePalette;
    private constructor();
}
