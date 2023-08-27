import React from 'react';
import { Sider, Button, Icon } from '@huameow/ui';
import './style.css';

export default function Components(): JSX.Element {
  function doDrag(e: any, data) {
    e.dataTransfer.setData('data', JSON.stringify(data));
  }
  return (
    <Sider>
      <div
        className="box"
        draggable="true"
        onDragStart={e => doDrag(e, { name: 'button', Com: 'Button', props: {variant: 'filled'} })}
      >
        <Button variant="filled">按钮</Button>
      </div>
      <div
        className="box border"
        draggable="true"
        onDragStart={e => doDrag(e, { name: 'icons', Com: 'Icon' })}
      >
        图标
      </div>
      <div
        className="box border"
        draggable="true"
        onDragStart={e => doDrag(e, { name: 'text' })}
      >
        文本
      </div>
    </Sider>
  );
}
