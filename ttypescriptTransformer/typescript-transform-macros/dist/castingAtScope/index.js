"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PREDEFINED = {
    'SomeStrategy': class SomeStrategy {
    }
};
const strategy = 'someStrategy';
let strategyClass;
if (PREDEFINED[strategy]) {
    strategyClass = PREDEFINED[strategy];
}
else {
    strategyClass = class SomeStrategy {
    };
}
const instance = new strategyClass();
//# sourceMappingURL=index.js.map