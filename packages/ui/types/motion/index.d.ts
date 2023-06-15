export declare const EASING: {
    readonly STANDARD: "cubic-bezier(0.2, 0, 0, 1)";
    readonly STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)";
    readonly STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)";
    readonly EMPHASIZED: "cubic-bezier(.3,0,0,1)";
    readonly EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)";
    readonly EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)";
};
export interface AnimationSignal {
    /**
     * Starts the abortable task. Any previous tasks started with this instance
     * will be aborted.
     *
     * @return An `AbortSignal` for the current task.
     */
    start(): AbortSignal | undefined;
    /**
     * Complete the current task.
     */
    finish(): void;
}
export declare function createAnimationSignal(): AnimationSignal;
export declare function createThrottle(): (key: string | undefined, cb: (...args: unknown[]) => unknown, timeout?: () => Promise<void>) => Promise<void>;
/**
 * Parses an number in milliseconds from a css time value
 */
export declare function msFromTimeCSSValue(value: string): number;
export declare function style(str: string): void;
