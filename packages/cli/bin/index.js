#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const commands_1 = require("../commands");
const bootstrap = () => {
    const program = commander;
    program
        .version(require('../package.json').version, '-v, --version', 'Output the current version.')
        .usage('<command> [options]')
        .helpOption('-h, --help', 'Output usage information.');
    commands_1.CommandLoader.load(program);
    commander.parse(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();
