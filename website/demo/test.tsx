import React from 'react';
import {argbFromHex, themeFromSourceColor, applyTheme, Grid, Row, Cell} from '@hm/components';

const theme = themeFromSourceColor(argbFromHex('#ffb379'));
applyTheme(theme);

const App = function() {
  return (
    <div>
      <Grid>
        <Row>
          <Cell span={6}>ssss</Cell>
          <Cell span={6}>ssss</Cell>
        </Row>
      </Grid>
    </div>
  )
}

export default App;
