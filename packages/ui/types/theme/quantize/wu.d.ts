/**
 * An image quantizer that divides the image's pixels into clusters by
 * recursively cutting an RGB cube, based on the weight of pixels in each area
 * of the cube.
 *
 * The algorithm was described by Xiaolin Wu in Graphic Gems II, published in
 * 1991.
 */
export declare class QuantizerWu {
    private weights;
    private momentsR;
    private momentsG;
    private momentsB;
    private moments;
    private cubes;
    constructor(weights?: number[], momentsR?: number[], momentsG?: number[], momentsB?: number[], moments?: number[], cubes?: Box[]);
    /**
     * @param pixels Colors in ARGB format.
     * @param maxColors The number of colors to divide the image into. A lower
     *     number of colors may be returned.
     * @return Colors in ARGB format.
     */
    quantize(pixels: number[], maxColors: number): number[];
    private constructHistogram;
    private computeMoments;
    private createBoxes;
    private createResult;
    private variance;
    private cut;
    private maximize;
    private volume;
    private bottom;
    private top;
    private getIndex;
}
/**
 * Keeps track of the state of each box created as the Wu  quantization
 * algorithm progresses through dividing the image's pixels as plotted in RGB.
 */
declare class Box {
    r0: number;
    r1: number;
    g0: number;
    g1: number;
    b0: number;
    b1: number;
    vol: number;
    constructor(r0?: number, r1?: number, g0?: number, g1?: number, b0?: number, b1?: number, vol?: number);
}
export {};
