"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicRunner = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const abstract_runner_1 = require("./abstract.runner");
class SchematicRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super(`"${SchematicRunner.findClosestSchematicsBinary()}"`);
    }
    static getModulePaths() {
        return module.paths;
    }
    static findClosestSchematicsBinary() {
        const subPath = (0, path_1.join)('.bin', 'schematics');
        for (const path of this.getModulePaths()) {
            const binaryPath = (0, path_1.resolve)(path, subPath);
            if ((0, fs_1.existsSync)(binaryPath)) {
                return binaryPath;
            }
        }
        throw new Error("'schematics' binary path could not be found!");
    }
}
exports.SchematicRunner = SchematicRunner;
