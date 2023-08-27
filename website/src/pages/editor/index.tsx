import React from 'react';
import {Layout, Sider, argbFromHex,
  themeFromSourceColor,applyTheme} from '@huameow/ui';
import Components from './components';
import Stage from './stage';
import './style.css';

  const theme = themeFromSourceColor(argbFromHex('#8B5CF6'), []);
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

applyTheme(theme, { target: document.head, dark: systemDark });

export default function Editor(): JSX.Element {
  return (
    <Layout>
      <Sider>
        <Components />
      </Sider>
      <Stage />
    </Layout>
  );
}
