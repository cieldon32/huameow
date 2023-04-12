"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class NewCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('new [name]')
            .alias('n')
            .description('Generate a application or library.')
            .option('--directory [directory]', 'Specify the destination directory')
            .option('-d, --dry-run', 'Report actions that would be performed without writing out results.')
            .option('-s, --skip-install', 'Skip package installation.')
            .option('-p, --package-manager [package-manager]', 'Specify package manager.')
            .option('--type [type]', 'application or library')
            .action((name, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({ name: 'type', value: command.type });
            const inputs = [];
            inputs.push({ name: 'name', value: name });
            yield this.action.handle(inputs, options);
        }));
    }
}
exports.NewCommand = NewCommand;
