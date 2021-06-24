interface IStrategy {
  init(settings: any): Promise<this>,
  getAmount(): number
}

export type StrategyClass = new () => IStrategy;

interface IPredefinedStrategies {
  [name: string]: StrategyClass
}
const PREDEFINED: IPredefinedStrategies = {
  'SomeStrategy': class SomeStrategy {} as StrategyClass
};

const strategy: string | StrategyClass = 'someStrategy';

const mStrategy = strategy as keyof typeof PREDEFINED;

let strategyClass: StrategyClass;

if (PREDEFINED[mStrategy]) {
  strategyClass = PREDEFINED[mStrategy];
} else {
  strategyClass = class SomeStrategy { } as StrategyClass;
}

const instance = new strategyClass();
