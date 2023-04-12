"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const chalk = require("chalk");
const actions_1 = require("../actions");
const ui_1 = require("../library/ui");
const new_command_1 = require("./new.command");
class CommandLoader {
    static load(program) {
        new new_command_1.NewCommand(new actions_1.NewAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n${ui_1.ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
