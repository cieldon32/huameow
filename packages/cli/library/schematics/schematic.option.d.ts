export declare class SchematicOption {
    private name;
    private value;
    constructor(name: string, value: boolean | string | never[]);
    toCommandString(): string;
    private format;
}
