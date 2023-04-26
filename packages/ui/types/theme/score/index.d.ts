/**
 *  Given a large set of colors, remove colors that are unsuitable for a UI
 *  theme, and rank the rest based on suitability.
 *
 *  Enables use of a high cluster count for image quantization, thus ensuring
 *  colors aren't muddied, while curating the high cluster count to a much
 *  smaller number of appropriate choices.
 */
export declare class Score {
    private static readonly TARGET_CHROMA;
    private static readonly WEIGHT_PROPORTION;
    private static readonly WEIGHT_CHROMA_ABOVE;
    private static readonly WEIGHT_CHROMA_BELOW;
    private static readonly CUTOFF_CHROMA;
    private static readonly CUTOFF_TONE;
    private static readonly CUTOFF_EXCITED_PROPORTION;
    private constructor();
    /**
     * Given a map with keys of colors and values of how often the color appears,
     * rank the colors based on suitability for being used for a UI theme.
     *
     * @param colorsToPopulation map with keys of colors and values of how often
     *     the color appears, usually from a source image.
     * @return Colors sorted by suitability for a UI theme. The most suitable
     *     color is the first item, the least suitable is the last. There will
     *     always be at least one color returned. If all the input colors
     *     were not suitable for a theme, a default fallback color will be
     *     provided, Google Blue.
     */
    static score(colorsToPopulation: Map<number, number>, contentColor?: boolean): number[];
    private static filter;
    private static filterContent;
}
