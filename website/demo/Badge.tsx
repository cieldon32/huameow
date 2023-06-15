import React from 'react';
import {Badge, Button} from '@huameow/ui';



const Demo = function() {
  return (
    <div>
      Badge:
      <Button type="link">消息<Badge>3</Badge></Button>
    </div>
  )
}

export default Demo;
