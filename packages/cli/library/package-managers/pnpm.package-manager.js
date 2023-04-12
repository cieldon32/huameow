"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnpmPackageManager = void 0;
const runners_1 = require("../runners");
const abstract_package_manager_1 = require("./abstract.package-manager");
const package_manager_1 = require("./package-manager");
class PnpmPackageManager extends abstract_package_manager_1.AbstractPackageManager {
    constructor() {
        super(runners_1.RunnerFactory.create(runners_1.Runner.PNPM));
    }
    get name() {
        return package_manager_1.PackageManager.PNPM.toUpperCase();
    }
    get cli() {
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
exports.PnpmPackageManager = PnpmPackageManager;
