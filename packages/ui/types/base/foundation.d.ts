export declare class MDCFoundation<AdapterType extends {} = {}> {
    protected adapter: AdapterType;
    static get cssClasses(): {
        [key: string]: string;
    };
    static get strings(): {
        [key: string]: string;
    };
    static get numbers(): {
        [key: string]: number;
    };
    static get defaultAdapter(): {};
    constructor(adapter?: AdapterType);
    init(): void;
    destroy(): void;
}
/**
 * The constructor for MDCFoundation.
 */
export interface MDCFoundationConstructor<AdapterType extends object = any> {
    new (adapter: AdapterType): MDCFoundation<AdapterType>;
    readonly prototype: MDCFoundation<AdapterType>;
}
/**
 * The deprecated constructor for MDCFoundation.
 */
export interface MDCFoundationDeprecatedConstructor<AdapterType extends object = any> {
    readonly cssClasses: Record<string, string>;
    readonly strings: Record<string, string>;
    readonly numbers: Record<string, number>;
    readonly defaultAdapter: AdapterType;
    new (adapter?: Partial<AdapterType>): MDCFoundation<AdapterType>;
    readonly prototype: MDCFoundation<AdapterType>;
}
/**
 * Retrieves the AdapaterType from the provided MDCFoundation generic type.
 */
export type MDCFoundationAdapter<T> = T extends MDCFoundation<infer A> ? A : never;
export default MDCFoundation;
