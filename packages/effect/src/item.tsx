import React, { useEffect, useState } from 'react';
import { is, mergeDeepRight } from 'ramda';
import { useStore } from './provider';
import { Styled } from './styled';

export const EffectsItem = ({ children, name }: any) => {
  const [state, setState] = useState<any>({});
  const store: any = useStore();
  useEffect(() => {
    const source$ =
      name && store
        ? store[name] || store['load']?.[name]
        : null;
    if (source$) {
      const sub = source$.subscribe((res: any) => {
        console.log(name, 'subscribe', res)
        if (res) {
          setState((state: any) => {
            if (is(Array, res)) {
              return mergeDeepRight(state, { dataSource: res });
            } else {
              return mergeDeepRight(state, res);
            }
          });
        }
      });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [store[name], store['load']]);

  return (
    <div>
      {JSON.stringify(state)}
      <Styled name={name} {...state}>
        {children}
      </Styled>
    </div>
  );
};
