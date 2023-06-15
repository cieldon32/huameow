import React from 'react';
import { Button, Icon, Slot } from '@huameow/ui';

const Demo = function () {
  return (
    <div>
      <Button>normal</Button>
      <Button type="link">btn</Button>
      <Button type="icon">
        <Icon>close</Icon>
        <Slot name="selectedIcon">
          <Icon>check</Icon>
        </Slot>
      </Button>
      <Button type="segment">btn</Button>
    </div>
  );
};

export default Demo;
