import * as chalk from 'chalk';
import { EMOJIS } from './emojis';

export const MESSAGES = {
  PROJECT_SELECTION_QUESTION: '请选择项目类型：',
  PROJECT_NAME: '项目的名称是什么？',
  PROJECT_NAME_ERROR: '项目名称需要以yw-开始',
  LIBRARY_PROJECT_SELECTION_QUESTION:
    'Which project would you like to add the library to?',
  DRY_RUN_MODE: 'Command has been executed in dry run mode, nothing changed!',
  PROJECT_INFORMATION_START: `${EMOJIS.ZAP}  We will scaffold your project in a few seconds..`,
  RUNNER_EXECUTION_ERROR: (command: string) => `\n失败在命令: ${command}`,
  PACKAGE_MANAGER_QUESTION: `${EMOJIS.HEART}  用哪一种包管理器呢?`,
  PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `正在安装包... ${EMOJIS.COFFEE}`,
  PACKAGE_MANAGER_UPDATE_IN_PROGRESS: `正在更新包... ${EMOJIS.COFFEE}`,
  PACKAGE_MANAGER_UPGRADE_IN_PROGRESS: `正在升级包... ${EMOJIS.COFFEE}`,
  PACKAGE_MANAGER_PRODUCTION_INSTALLATION_IN_PROGRESS: `Package installation in progress... ${EMOJIS.COFFEE}`,
  GIT_INITIALIZATION_ERROR: 'Git仓库还没有被初始化',
  PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name: string) =>
    name !== '.'
      ? `${EMOJIS.ROCKET}  成功创建项目： ${chalk.green(name)}`
      : `${EMOJIS.ROCKET}  成功创建一个新项目`,
  GET_STARTED_INFORMATION: `${EMOJIS.POINT_RIGHT}  按照下面的命令开始：`,
  CHANGE_DIR_COMMAND: (name: string) => `$ cd ${name}`,
  START_COMMAND: (name: string) => `$ ${name} start`,
  PACKAGE_MANAGER_INSTALLATION_FAILED: `${EMOJIS.SCREAM}  包安装失败，原因如下`,
  // tslint:disable-next-line:max-line-length
  INFORMATION_PACKAGE_MANAGER_FAILED: `${EMOJIS.SMIRK}  cannot read your project package.json file, are you inside your project directory?`,
  LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE: (name: string) =>
    `Unable to install library ${name} because package did not install. Please check package name.`,
  LIBRARY_INSTALLATION_FAILED_NO_LIBRARY: 'No library found.',
  LIBRARY_INSTALLATION_STARTS: 'Starting library setup...',
  BUILD_ERROR: '不可以在master分支下构建与发布！',
  API_YAPI_TOKEN: '请输入token',
  API_YAPI_UID: '请输入uid',
  API_YAPI_SERVERURL: '请输入yapi_serverUrl',
  API_YAPI_PROJECTID: '请输入projectId',
  API_SERVERURL: '请输入serverUrl',
};
