import { Runner, RunnerFactory } from '../runners';
import { SchematicRunner } from '../runners/schematic.runner';
import { AbstractCollection } from './abstract.collection';
import { Collection } from './collection';
import { CustomCollection } from './custom.collection';
import { HuaCollection } from './hua.collection';

export class CollectionFactory {
  public static create(collection: Collection | string): AbstractCollection {
    switch (collection) {
      case Collection.Hua:
        return new HuaCollection(
          RunnerFactory.create(Runner.SCHEMATIC) as SchematicRunner,
        );

      default:
        return new CustomCollection(
          collection,
          RunnerFactory.create(Runner.SCHEMATIC) as SchematicRunner,
        );
    }
  }
}
