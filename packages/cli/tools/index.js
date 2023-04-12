"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionValue = exports.exit = void 0;
const exit = (code = 0) => {
    process.exit(code);
};
exports.exit = exit;
const getOptionValue = (name, inputs) => {
    const idInput = inputs.find((input) => input.name === name);
    return idInput ? idInput.value : '';
};
exports.getOptionValue = getOptionValue;
