import { AbstractRunner } from '../runners';
import { SchematicOption } from './schematic.option';

export class AbstractCollection {
  constructor(protected collection: string, protected runner: AbstractRunner) {}

  public async execute(
    name: string,
    options: SchematicOption[],
    extraFlags?: string,
  ) {
    let command = this.buildCommandLine(name, options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;
    console.log('execute', command)
    await this.runner.run(command);
  }

  private buildCommandLine(name: string, options: SchematicOption[]): string {
    console.log('buildCommandLine', name, this.buildOptions(options))
    return `${this.collection}:${name}${this.buildOptions(options)}`;
  }

  private buildOptions(options: SchematicOption[]): string {
    return options.reduce((line, option) => {
      console.log('buildOptions', option.toCommandString())
      return line.concat(` ${option.toCommandString()}`);
    }, '');
  }
}
