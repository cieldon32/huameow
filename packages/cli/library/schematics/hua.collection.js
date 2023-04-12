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
exports.HuaCollection = void 0;
const abstract_collection_1 = require("./abstract.collection");
class HuaCollection extends abstract_collection_1.AbstractCollection {
    constructor(runner) {
        super('@huameow/schematics', runner);
    }
    execute(name, options) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const schematic = this.validate(name);
            yield _super.execute.call(this, schematic, options);
        });
    }
    static getSchematics() {
        return HuaCollection.schematics;
    }
    validate(name) {
        const schematic = HuaCollection.schematics.find(s => s.name === name || s.alias === name);
        if (schematic === undefined || schematic === null) {
            throw new Error(`Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`);
        }
        return schematic.name;
    }
}
exports.HuaCollection = HuaCollection;
HuaCollection.schematics = [
    { name: 'application', alias: 'application' },
    { name: 'library', alias: 'library' },
];
