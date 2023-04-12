import { Runner, RunnerFactory } from '../runners';
import { PnpmRunner } from '../runners/pnpm.runner';
import { AbstractPackageManager } from './abstract.package-manager';
import { PackageManager } from './package-manager';
import { PackageManagerCommands } from './package-manager-commands';

export class PnpmPackageManager extends AbstractPackageManager {
  constructor() {
    super(RunnerFactory.create(Runner.PNPM) as PnpmRunner);
  }

  public get name() {
    return PackageManager.PNPM.toUpperCase();
  }

  get cli(): PackageManagerCommands {
    return {
      install: 'install',
      add: 'add',
      update: 'upgrade',
      remove: 'remove',
      saveFlag: '',
      saveDevFlag: '-D',
    };
  }
}
