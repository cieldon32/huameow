import { AbstractRunner } from '../runners';
import { AbstractCollection } from './abstract.collection';
import { SchematicOption } from './schematic.option';

export interface Schematic {
  name: string;
  alias: string;
}

export class HuaCollection extends AbstractCollection {
  private static schematics: Schematic[] = [
    { name: 'application', alias: 'application' },
    { name: 'library', alias: 'library' },
  ];

  constructor(runner: AbstractRunner) {
    super('@huameow/schematics', runner);
  }

  public async execute(name: string, options: SchematicOption[]) {
    const schematic: string = this.validate(name);
    await super.execute(schematic, options);
  }

  public static getSchematics(): Schematic[] {
    return HuaCollection.schematics;
  }

  private validate(name: string) {
    const schematic = HuaCollection.schematics.find(
      s => s.name === name || s.alias === name,
    );

    if (schematic === undefined || schematic === null) {
      throw new Error(
        `Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`,
      );
    }
    return schematic.name;
  }
}
