import { dasherize } from '@angular-devkit/core/src/utils/strings';
import * as chalk from 'chalk';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import { Answers, Question } from 'inquirer';
import { join } from 'path';
import { promisify } from 'util';
import { Input } from '../commands';
import { defaultGitIgnore } from '../library/configuration/defaults';
import {
  AbstractPackageManager,
  PackageManager,
  PackageManagerFactory,
} from '../library/package-managers';
import { loadConfiguration } from '../library/utils/load-configuration';
import { generateInput, generateSelect } from '../library/questions/questions';
import { GitRunner } from '../library/runners/git.runner';
import {
  AbstractCollection,
  Collection,
  CollectionFactory,
  SchematicOption,
} from '../library/schematics';
import { EMOJIS, MESSAGES, BANNER } from '../library/ui';
import { AbstractAction } from './abstract.action';
import {exit} from '../tools';

export class NewAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const askRes = await askForMissingInformation(inputs.concat(options));
    console.log('inputs', inputs, options)
    if (askRes) {
      await this.initProject(inputs.concat(options));
    }
    exit();
  }

  async initProject(inputs: Input[]) {
    console.log('initProject', inputs)
    await generateApplicationFiles(inputs).catch(exit);
  }
}

const replaceInputMissingInformation = (
  inputs: Input[],
  answers: Answers,
): Input[] => {
  return inputs.map(
    input =>
      (input.value =
        input.value !== undefined
          ? getName(input, answers)
          : answers[input.name]),
  );
};

const getName = (input: Input, answers: Answers) => {
  if (input.value === './') {
    return answers[input.name];
  } else {
    return input.value;
  }
};

const askForMissingInformation = async (inputs: Input[]) => {
  console.info(MESSAGES.PROJECT_INFORMATION_START);
  let name = getValue(inputs, 'name');
  let type = getValue(inputs, 'type');
  const prompt: inquirer.PromptModule = inquirer.createPromptModule();
  if(!type) {
    const questions = [generateSelect('type')(MESSAGES.PROJECT_SELECTION_QUESTION)(['application', 'library'])];
    const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
    type = answers.type;
    replaceInputMissingInformation(inputs, answers);
  }
  if(!name) {
    const defaultName = type === 'application' ? 'my-app' : 'my-lib';
    const questions = [generateInput('name', MESSAGES.PROJECT_NAME)(defaultName)];
    const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
    name = answers.name;
    replaceInputMissingInformation(inputs, answers);
  }
  return true;
}

const getValue = (inputs: Input[], name: string) => {
  const res = inputs.find(input => input.name === name);
  return res?.value;
};


const generateApplicationFiles = async (inputs: Input[]) => {
  const name = getValue(inputs, 'name');
  const type = getValue(inputs, 'type');
  const collection: AbstractCollection = CollectionFactory.create(
    Collection.Hua,
  );
  const schematicOptions: SchematicOption[] = mapSchematicOptions(inputs);
  console.log('schematicOptions', schematicOptions)
  if(type === 'application') {
    await collection.execute('application', schematicOptions);
  }
  if(type === 'library') {
    await collection.execute('library', schematicOptions);
  }
  console.info();
};

const mapSchematicOptions = (options: Input[]): SchematicOption[] => {
  return options.reduce(
    (schematicOptions: SchematicOption[], option: Input) => {
      if (
        option.name !== 'skip-install' &&
        option.value !== 'package-manager'
      ) {
        schematicOptions.push(new SchematicOption(option.name, option.value));
      }
      return schematicOptions;
    },
    [],
  );
};

const installPackages = async (
  options: Input[],
  dryRunMode: boolean,
  installDirectory: string,
) => {
  const inputPackageManager: string = options.find(
    option => option.name === 'package-manager',
  )!.value as string;

  let packageManager: AbstractPackageManager;
  if (dryRunMode) {
    console.info();
    console.info(chalk.green(MESSAGES.DRY_RUN_MODE));
    console.info();
    return;
  }
  if (inputPackageManager !== undefined) {
    try {
      packageManager = PackageManagerFactory.create(inputPackageManager);
      await packageManager.install(installDirectory, inputPackageManager);
    } catch (error: any) {
      if (error && error.message) {
        console.error(chalk.red(error.message));
      }
    }
  } else {
    packageManager = await selectPackageManager();
    await packageManager.install(
      installDirectory,
      packageManager.name.toLowerCase(),
    );
  }
};

const selectPackageManager = async (): Promise<AbstractPackageManager> => {
  const answers: Answers = await askForPackageManager();
  return PackageManagerFactory.create(answers['package-manager']);
};

const askForPackageManager = async (): Promise<Answers> => {
  const questions: Question[] = [
    generateSelect('package-manager')(MESSAGES.PACKAGE_MANAGER_QUESTION)([
      PackageManager.NPM,
      PackageManager.YARN,
      PackageManager.PNPM,
    ]),
  ];
  const prompt = inquirer.createPromptModule();
  return await prompt(questions);
};

const initializeGitRepository = async (dir: string) => {
  const runner = new GitRunner();
  await runner.run('init', true, join(process.cwd(), dir)).catch(() => {
    console.error(chalk.red(MESSAGES.GIT_INITIALIZATION_ERROR));
  });
};

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
const createGitIgnoreFile = (dir: string, content?: string) => {
  const fileContent = content || defaultGitIgnore;
  const filePath = join(process.cwd(), dir, '.gitignore');
  return promisify(fs.writeFile)(filePath, fileContent);
};

const printCollective = () => {
  const dim = print('dim');
  const yellow = print('yellow');
  const emptyLine = print();
  emptyLine();
  yellow(BANNER);
  emptyLine();
  emptyLine();
  yellow(`Thanks for installing yw cli ${EMOJIS.PRAY}`);
  dim('Please consider donating to our open collective');
  dim('to help us maintain this package.');
  emptyLine();
  emptyLine();
  print()(
    `${chalk.bold(`${EMOJIS.WINE}  Donate:`)} ${chalk.underline(
      'https://xxxxx.com',
    )}`,
  );
  emptyLine();
};

const print = (color: string | null = null) => (str = '') => {
  const terminalCols = retrieveCols();
  const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
  const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
  const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
  if (color) {
    str = (chalk as any)[color](str);
  }
  console.log(leftPadding, str);
};

const retrieveCols = () => {
  const defaultCols = 80;
  try {
    const terminalCols = execSync('tput cols', {
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return parseInt(terminalCols.toString(), 10) || defaultCols;
  } catch {
    return defaultCols;
  }
};
