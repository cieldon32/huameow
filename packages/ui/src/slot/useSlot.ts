import React from 'react';

export function useSlot(children: any) {
  const result: Record<string, any> = {
    children: []
  };
  React.Children.map(children, (child: React.ReactElement<any, React.JSXElementConstructor<any>>) => {
    if(React.isValidElement(child)){
      const type = child.type as any;
      const props = child.props;
      const name = type.displayName;
      if(name === 'Slot') {
        const slot = type.getSlot(child.props);
        result[props.name] = slot.next().value;
      } else if(name === 'Icon'){
        if(result['children'].length) {
          result['trailingicon'] = child;
        } else {
          result['leadingicon'] = child;
        }
      } else {
        result['children'].push(child);
      }
    } else {
      result['children'].push(child);
    }
  })
  return result;
}
