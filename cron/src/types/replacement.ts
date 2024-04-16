export interface IRow {
    data: string;
    line: number
}

export interface IReplacement {
    getURLReplacement: (url?: string) => void;
    parseReplacement: (group?: string) => Promise<string>;
}