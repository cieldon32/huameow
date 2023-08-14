import React from 'react';

export function withTd(children: any, data: any) {
  if(React.isValidElement(children)) {
    const {onClick, ...props} = children.props as any;
    function doCLick() {
      console.log('doCLick', data)
      onClick(data);
    }
    return <children.type {...props} onClick={doCLick} />
  } else {
    return data[children];
  }
}
