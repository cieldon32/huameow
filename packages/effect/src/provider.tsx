import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { is } from 'ramda';
// import { fromEvent,
//   merge,
//   // isObservable
//   // BehaviorSubject
// } from 'rxjs';
// import { map as rxjsMap} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { EffectsItem } from './item';
import { createStore } from './flow2store/createStore';

type Props = Record<string, any>

export const EffectsContext = createContext({});

export const useStore = () => useContext(EffectsContext);

export const EffectsProvider = ({ children, flow, apis }: any) => {
  const [store, setStore] = useState({});
  const cloneElement = (child: any) => {
    if (is(String, child) || !child) {
      return child;
    }
    const element = React.cloneElement(child as any);
    const { children, ...props } = element.props as Props;
    const Elemt = (props: Props) => {
      if (element.type) {
        return (
          <element.type {...props}>
            {is(String, children) ? children : reduceChildren(children)}
          </element.type>
        );
      } else {
        return null;
      }
    };
    return (
      <EffectsItem name={props['data-name'] || props['name']} key={uuidv4()}>
        <Elemt {...props} />
      </EffectsItem>
    );
  };

  const reduceChildren = (childs: ReactNode[] | ReactNode) => {
    if (is(Array, childs)) {
      return childs.map((child) => cloneElement(child));
    } else {
      return cloneElement(childs);
    }
  };

  const childs = useMemo(() => {
    if (children) {
      return reduceChildren(children);
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    if(flow){
      const store = createStore(flow, apis);
      console.log('store', store)
      setStore(store);
    }

  }, []);

  // useEffect(() => {
  //   const load$ = fromEvent(window, 'load');
  //   const test1$ = document.querySelectorAll("div[data-name=test1]");
  //   const test2$ = load$.pipe(
  //     rxjsMap(() => ({
  //             height: "50px",
  //             background: "red"
  //           }))
  //   )
  //   const test1Click = fromEvent(test1$, "click").pipe(
  //     rxjsMap(() => ({
  //       background: "blue"
  //     }))
  //   );
  //   const result = {
  //     load: {
  //       test1: load$.pipe(
  //         rxjsMap(() => ({
  //           height: "100px",
  //           background: "blue"
  //         }))
  //       ),
  //       a: load$.pipe(
  //         rxjsMap(() => ({
  //           disabled: true
  //         }))
  //       ),
  //       b: load$.pipe(
  //         rxjsMap(() => ({
  //           disabled: false
  //         }))
  //       ),
  //       c: load$.pipe(
  //         rxjsMap(() => ({
  //           disabled: false
  //         }))
  //       ),
  //       d: load$.pipe(
  //         rxjsMap(() => ({
  //           disabled: false
  //         }))
  //       ),
  //     },
  //     test2: merge(test2$, test1Click)
  //   }
  //   console.log('store', flow, apis, result)
  //   setStore(result);
  // }, [])

  return (
    <EffectsContext.Provider value={store}>
      {flow ? childs : children}
    </EffectsContext.Provider>
  );
};
