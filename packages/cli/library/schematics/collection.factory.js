"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionFactory = void 0;
const runners_1 = require("../runners");
const collection_1 = require("./collection");
const custom_collection_1 = require("./custom.collection");
const hua_collection_1 = require("./hua.collection");
class CollectionFactory {
    static create(collection) {
        switch (collection) {
            case collection_1.Collection.Hua:
                return new hua_collection_1.HuaCollection(runners_1.RunnerFactory.create(runners_1.Runner.SCHEMATIC));
            default:
                return new custom_collection_1.CustomCollection(collection, runners_1.RunnerFactory.create(runners_1.Runner.SCHEMATIC));
        }
    }
}
exports.CollectionFactory = CollectionFactory;
