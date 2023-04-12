import { Command, CommanderStatic } from 'commander';
import { Collection } from '../library/schematics';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class NewCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('new [name]')
      .alias('n')
      .description('Generate a application or library.')
      .option('--directory [directory]', 'Specify the destination directory')
      .option(
        '-d, --dry-run',
        'Report actions that would be performed without writing out results.',
      )
      .option('-s, --skip-install', 'Skip package installation.')
      .option(
        '-p, --package-manager [package-manager]',
        'Specify package manager.',
      )
      .option(
        '--type [type]',
        'application or library',
      )
      .action(async (name: string, command: Command) => {
        const options: Input[] = [];
        options.push({ name: 'type', value: command.type });

        const inputs: Input[] = [];
        inputs.push({ name: 'name', value: name });
        await this.action.handle(inputs, options);
      });
  }
}
