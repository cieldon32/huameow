import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getParameters } from 'codesandbox/lib/api/define';

import CodeSection, { getSourceString } from '../CodeSection';
import CodeExpandSvg from './codeExpand.svg';
import CodeCollapseSvg from './codeCollapse.svg';
import CodeSandboxSvg from './codeSandbox.svg';
import GithubSvg from './github.svg';

import styles from './index.module.less';

export interface FileListMap {
  fileName: string;
  fileSuffix: string;
  fileContent: string;
}
export interface PlaygroundProps {
  /**
   * 文件列表
   */
  filelist: FileListMap[];
  sourceurl: string;
  children?: React.ReactNode;
}

/**
 * 输入的根据文件列表（需要明确的后缀名），像编辑器一样展示代码。
 * @param props.fileList
 */
export default function Playground({ filelist, sourceurl, children }: PlaygroundProps) {
  const [codeShowed, setCodeShowed] = useState(false);
  const toggleCode = () => {
    console.log('toggleCode', filelist)
    setCodeShowed((s) => !s);
  };
  const { siteConfig: { customFields = {} } = {} } = useDocusaurusContext();
  const { demoSourceUrl = '', codeSandboxPacakgeConfig } = customFields;

  return (
    <BrowserOnly>
      {() => {
        return (
          <div className={styles.playgroundContainer}>
            <div className={styles.playgroundContent}>{children}</div>
            <div className={styles.codeBoxActions}>
              {codeSandboxPacakgeConfig && filelist?.length > 0 && (
                <OpenCodeSandbox fileList={filelist} codeSandboxPacakgeConfig={codeSandboxPacakgeConfig} />
              )}
              {codeShowed && (
                <span className={styles.svgIcon} onClick={toggleCode}>
                  <CodeExpandSvg />
                </span>
              )}
              {!codeShowed && (
                <span className={styles.svgIcon} onClick={toggleCode}>
                  <CodeCollapseSvg />
                </span>
              )}
              {sourceurl && (
                <a href={`${demoSourceUrl}/${sourceurl}`} target="_blank" className={styles.svgIcon} rel="noreferrer">
                  <GithubSvg />
                </a>
              )}
            </div>
            {codeShowed && filelist?.length > 0 && (
              <div className={styles.playgroundIDE}>
                {filelist.length === 1 && (
                  <CodeSection language={filelist[0].fileSuffix} source={filelist[0].fileContent} />
                )}
                {filelist.length > 1 && (
                  <Tabs
                    defaultValue="0"
                    values={filelist.map(({ fileName, fileSuffix }, index) => {
                      const value = `${fileName}.${fileSuffix}`;
                      return {
                        label: value,
                        value: String(index),
                      };
                    })}
                  >
                    {filelist.map(({ fileName, fileContent, fileSuffix }, index) => {
                      const value = `${fileName}.${fileSuffix}`;

                      return (
                        <TabItem value={String(index)} key={value}>
                          <CodeSection language={fileSuffix} source={fileContent} />
                        </TabItem>
                      );
                    })}
                  </Tabs>
                )}
              </div>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
}

function OpenCodeSandbox(props: { fileList: FileListMap[]; codeSandboxPacakgeConfig: Record<string, any> }) {
  const { fileList, codeSandboxPacakgeConfig } = props;
  const { fileName: AppName } = fileList[0] || {};
  const files = fileList
    .filter((f) => {
      if (f.fileSuffix === 'jsx') {
        // 目前只处理 tsx 和 其他类型的文件，忽略 jsx
        return false;
      }
      return true;
    })
    .reduce((acc, cur) => {
      acc[`${cur.fileName}.${cur.fileSuffix}`] = {
        content: getSourceString(cur.fileContent),
        isBinary: false,
      };
      return acc;
    }, {});

  const onClick = () => {
    const parameters = getParameters({
      files: {
        'sandbox.config.json': {
          content: JSON.stringify(
            {
              template: 'create-react-app-typescript',
            },
            null,
            2,
          ),
          isBinary: false,
        },
        'index.html': {
          content: '<div style="padding: 16px;" id="root"></div>',
          isBinary: false,
        },
        'index.tsx': {
          content: `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './${AppName}';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
          `,
          isBinary: false,
        },
        'package.json': {
          content: JSON.stringify(
            {
              name: AppName,
              main: 'index.tsx',
              dependencies: {
                ...codeSandboxPacakgeConfig.dependencies,
              },
              devDependencies: {
                ...codeSandboxPacakgeConfig.devDependencies,
              },
            },
            null,
            2,
          ),
          isBinary: false,
        },
        ...files,
      },
    });

    const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
    window.open(url);
  };

  return (
    <span className={styles.svgIcon} onClick={onClick}>
      <CodeSandboxSvg />
    </span>
  );
}
