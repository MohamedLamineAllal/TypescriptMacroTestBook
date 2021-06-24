# Typescript macro Test book

This is a little book! For testing and exploring macro options for Typescript! And some of the useful usages and motivations!

## Use of transformers

Resources for transformers! (Nothing to do with macro! They are a nice topic)

https://blog.logrocket.com/using-typescript-transforms-to-enrich-runtime-code-3fd2863221ed/

https://github.com/madou/typescript-transformer-handbook

https://levelup.gitconnected.com/writing-typescript-custom-ast-transformer-part-1-7585d6916819

https://blogs.u2u.be/diedrik/post/typescript-transformers-transform-and-rise-up

https://www.npmjs.com/package/ttypescript

> Unfortunately right now tsconfig.json does not allow specifying custom AST transformers.
> There’re a couple of alternatives you can utilize, each with its own caveat:
> https://github.com/TypeStrong/ts-loader for webpack ecosystem
https://github.com/TypeStrong/ts-node for REPL
https://github.com/cevek/ttypescript for tsc replacement
Write your own compiler wrapper

## ttypescript

For transformers ttypescript seems the best native like choice!

https://www.npmjs.com/package/ttypescript

### typescript-transform-macros (for macro)

ttypescript already have a Hygienic macros transformer

https://en.wikipedia.org/wiki/Hygienic_macro

You can check the transformer here:

https://github.com/LeDDGroup/typescript-transform-macros

See how it's used with ttypescript!

You can see too the directory bellow! For our first example

You can check our book example here:

[Examples](./ttypescriptTransformer/typescript-transform-macros/)

### Casting at scope

As asked in this StackOverflow question: https://stackoverflow.com/questions/25420966/can-i-type-cast-a-variable-in-block-scope

[Casting at scope test](./ttypescriptTransformer/typescript-transform-macros/src/castingAtScope)

To notice well how the macro usage go and how it compares to using a variable for escape see the files bellow:

[Macro usage file (compile with ttsc)](./ttypescriptTransformer/typescript-transform-macros/src/castingAtScope/index.ts)

```ts
declare function MACRO<T>(t: T): T;

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

const mStrategy = MACRO(
  strategy as keyof typeof PREDEFINED
);

let strategyClass: StrategyClass;

if (PREDEFINED[mStrategy]) {
  strategyClass = PREDEFINED[mStrategy];
} else {
  strategyClass = class SomeStrategy { } as StrategyClass;
}

const instance = new strategyClass();
```

[No macro usage (compile with tsc)](./ttypescriptTransformer/typescript-transform-macros/src/castingAtScope/index.index.tscVersion.ts)

```ts
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
```

After compilation:

[Macro usage file (compiled with ttsc)](./ttypescriptTransformer/typescript-transform-macros/dist/castingAtScope/index.js)

```ts
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PREDEFINED = {
    'SomeStrategy': class SomeStrategy {
    }
};
const strategy = 'someStrategy';
const mStrategy = MACRO(strategy);
let strategyClass;
if (PREDEFINED[mStrategy]) {
    strategyClass = PREDEFINED[mStrategy];
}
else {
    strategyClass = class SomeStrategy {
    };
}
const instance = new strategyClass();
//# sourceMappingURL=index.js.map
```

[No macro usage (compiled with tsc)](./ttypescriptTransformer/typescript-transform-macros/dist/castingAtScope/index.tscVersion.js)

```ts
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PREDEFINED = {
    'SomeStrategy': class SomeStrategy {
    }
};
const strategy = 'someStrategy';
const mStrategy = strategy; // <<<<<< you can see the variable here ending in final code >>>>>>
let strategyClass;
if (PREDEFINED[mStrategy]) {
    strategyClass = PREDEFINED[mStrategy];
}
else {
    strategyClass = class SomeStrategy {
    };
}
const instance = new strategyClass();
//# sourceMappingURL=index.tscVersion.js.map
```

No variable ending in the final code using the **macro** and macro transformer!

More example will be added!

You can check the example here:

https://github.com/LeDDGroup/typescript-transform-macros#example

and at:

https://github.com/codemix/babel-plugin-macros

The syntax is mostly the same! You have to relay!
