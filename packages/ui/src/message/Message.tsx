import { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom/client';
import classnames from 'classnames';
import {Dialog} from '@/dialog';
import {Notice} from './Notice';

export const Message: any = forwardRef(({className, type}: any, ref: any) => {
  const classNames = classnames('mdc-message', className, {
    ['info']: type === 'info',
    ['error']: type === 'error',
    ['warn']: type === 'warn',
    ['success']: type === 'success',
  });
  const [list, setList] = useState<any[]>([]);

  function doRemove(key: string) {
    setList((res) => res.filter((item: any) => item.key !== key))
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        add(data: any) {
          setList((res) => res.concat([data]))
        },
        remove(key: string) {
          doRemove(key);
        }
      };
    },
    [],
  );
  return (
    <Dialog className={classNames} ref={ref} visiable={true} isMessage={true}>
      {
        list.map(({text, key, type}: any) => (
          <Notice key={key} id={key} onClose={doRemove}>
            <Dialog.Container type={type}>{text}</Dialog.Container>
          </Notice>
        ))
      }
    </Dialog>
  )
});

Message.instance = (type: string, cb: Function) => {
  const ref = function(Message: any){
    cb({
      notice: function(message: any) {
        Message?.add?.(message);
      },
      component: Message,
      removeNotice: function(key: string){
        Message?.remove?.(key);
      }
    })
  }
  const div = document.createElement('div');
  div.setAttribute('id', 'message');
  document.body.appendChild(div);
  const root = ReactDOM.createRoot(
    div as HTMLElement
  );
  root.render(<Message ref={ref} type={type}></Message>);
}
