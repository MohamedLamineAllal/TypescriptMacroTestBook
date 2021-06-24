interface IStrategy {
    init(settings: any): Promise<this>;
    getAmount(): number;
}
export declare type StrategyClass = new () => IStrategy;
export {};
//# sourceMappingURL=index.tscVersion.d.ts.map