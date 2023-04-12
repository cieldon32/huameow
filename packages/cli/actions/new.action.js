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
exports.NewAction = void 0;
const chalk = require("chalk");
const child_process_1 = require("child_process");
const fs = require("fs");
const inquirer = require("inquirer");
const path_1 = require("path");
const util_1 = require("util");
const defaults_1 = require("../library/configuration/defaults");
const package_managers_1 = require("../library/package-managers");
const questions_1 = require("../library/questions/questions");
const git_runner_1 = require("../library/runners/git.runner");
const schematics_1 = require("../library/schematics");
const ui_1 = require("../library/ui");
const abstract_action_1 = require("./abstract.action");
const tools_1 = require("../tools");
class NewAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const askRes = yield askForMissingInformation(inputs.concat(options));
            console.log('inputs', inputs, options);
            if (askRes) {
                yield this.initProject(inputs.concat(options));
            }
            (0, tools_1.exit)();
        });
    }
    initProject(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('initProject', inputs);
            yield generateApplicationFiles(inputs).catch(tools_1.exit);
        });
    }
}
exports.NewAction = NewAction;
const replaceInputMissingInformation = (inputs, answers) => {
    return inputs.map(input => (input.value =
        input.value !== undefined
            ? getName(input, answers)
            : answers[input.name]));
};
const getName = (input, answers) => {
    if (input.value === './') {
        return answers[input.name];
    }
    else {
        return input.value;
    }
};
const askForMissingInformation = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(ui_1.MESSAGES.PROJECT_INFORMATION_START);
    let name = getValue(inputs, 'name');
    let type = getValue(inputs, 'type');
    const prompt = inquirer.createPromptModule();
    if (!type) {
        const questions = [(0, questions_1.generateSelect)('type')(ui_1.MESSAGES.PROJECT_SELECTION_QUESTION)(['application', 'library'])];
        const answers = yield prompt(questions);
        type = answers.type;
        replaceInputMissingInformation(inputs, answers);
    }
    if (!name) {
        const defaultName = type === 'application' ? 'my-app' : 'my-lib';
        const questions = [(0, questions_1.generateInput)('name', ui_1.MESSAGES.PROJECT_NAME)(defaultName)];
        const answers = yield prompt(questions);
        name = answers.name;
        replaceInputMissingInformation(inputs, answers);
    }
    return true;
});
const getValue = (inputs, name) => {
    const res = inputs.find(input => input.name === name);
    return res === null || res === void 0 ? void 0 : res.value;
};
const generateApplicationFiles = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const name = getValue(inputs, 'name');
    const type = getValue(inputs, 'type');
    const collection = schematics_1.CollectionFactory.create(schematics_1.Collection.Hua);
    const schematicOptions = mapSchematicOptions(inputs);
    console.log('schematicOptions', schematicOptions);
    if (type === 'application') {
        yield collection.execute('application', schematicOptions);
    }
    if (type === 'library') {
        yield collection.execute('library', schematicOptions);
    }
    console.info();
});
const mapSchematicOptions = (options) => {
    return options.reduce((schematicOptions, option) => {
        if (option.name !== 'skip-install' &&
            option.value !== 'package-manager') {
            schematicOptions.push(new schematics_1.SchematicOption(option.name, option.value));
        }
        return schematicOptions;
    }, []);
};
const installPackages = (options, dryRunMode, installDirectory) => __awaiter(void 0, void 0, void 0, function* () {
    const inputPackageManager = options.find(option => option.name === 'package-manager').value;
    let packageManager;
    if (dryRunMode) {
        console.info();
        console.info(chalk.green(ui_1.MESSAGES.DRY_RUN_MODE));
        console.info();
        return;
    }
    if (inputPackageManager !== undefined) {
        try {
            packageManager = package_managers_1.PackageManagerFactory.create(inputPackageManager);
            yield packageManager.install(installDirectory, inputPackageManager);
        }
        catch (error) {
            if (error && error.message) {
                console.error(chalk.red(error.message));
            }
        }
    }
    else {
        packageManager = yield selectPackageManager();
        yield packageManager.install(installDirectory, packageManager.name.toLowerCase());
    }
});
const selectPackageManager = () => __awaiter(void 0, void 0, void 0, function* () {
    const answers = yield askForPackageManager();
    return package_managers_1.PackageManagerFactory.create(answers['package-manager']);
});
const askForPackageManager = () => __awaiter(void 0, void 0, void 0, function* () {
    const questions = [
        (0, questions_1.generateSelect)('package-manager')(ui_1.MESSAGES.PACKAGE_MANAGER_QUESTION)([
            package_managers_1.PackageManager.NPM,
            package_managers_1.PackageManager.YARN,
            package_managers_1.PackageManager.PNPM,
        ]),
    ];
    const prompt = inquirer.createPromptModule();
    return yield prompt(questions);
});
const initializeGitRepository = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const runner = new git_runner_1.GitRunner();
    yield runner.run('init', true, (0, path_1.join)(process.cwd(), dir)).catch(() => {
        console.error(chalk.red(ui_1.MESSAGES.GIT_INITIALIZATION_ERROR));
    });
});
/**
 * Write a file `.gitignore` in the root of the newly created project.
 * `.gitignore` available in `@ywfe/schematics` cannot be published to
 * NPM (needs to be investigated).
 *
 * @param dir Relative path to the project.
 * @param content (optional) Content written in the `.gitignore`.
 *
 * @return Resolves when succeeds, or rejects with any error from `fn.writeFile`.
 */
const createGitIgnoreFile = (dir, content) => {
    const fileContent = content || defaults_1.defaultGitIgnore;
    const filePath = (0, path_1.join)(process.cwd(), dir, '.gitignore');
    return (0, util_1.promisify)(fs.writeFile)(filePath, fileContent);
};
const printCollective = () => {
    const dim = print('dim');
    const yellow = print('yellow');
    const emptyLine = print();
    emptyLine();
    yellow(ui_1.BANNER);
    emptyLine();
    emptyLine();
    yellow(`Thanks for installing yw cli ${ui_1.EMOJIS.PRAY}`);
    dim('Please consider donating to our open collective');
    dim('to help us maintain this package.');
    emptyLine();
    emptyLine();
    print()(`${chalk.bold(`${ui_1.EMOJIS.WINE}  Donate:`)} ${chalk.underline('https://xxxxx.com')}`);
    emptyLine();
};
const print = (color = null) => (str = '') => {
    const terminalCols = retrieveCols();
    const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
    const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
    const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
    if (color) {
        str = chalk[color](str);
    }
    console.log(leftPadding, str);
};
const retrieveCols = () => {
    const defaultCols = 80;
    try {
        const terminalCols = (0, child_process_1.execSync)('tput cols', {
            stdio: ['pipe', 'pipe', 'ignore'],
        });
        return parseInt(terminalCols.toString(), 10) || defaultCols;
    }
    catch (_a) {
        return defaultCols;
    }
};
