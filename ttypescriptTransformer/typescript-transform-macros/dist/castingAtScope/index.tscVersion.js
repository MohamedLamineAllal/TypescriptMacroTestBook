"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PREDEFINED = {
    'SomeStrategy': class SomeStrategy {
    }
};
const strategy = 'someStrategy';
const mStrategy = strategy;
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