import md5 from 'md5';
import {v4} from 'uuid'
import {Message} from './Message';
import './style.scss';

let messageInstance : any;


function notice (args: any) {
  const target = args.key;
  const closePromise = new Promise(_resolve => {
    // const callback = () => {
    //   if (typeof args.onClose === 'function') {
    //     args.onClose();
    //   }
    //   return resolve(true);
    // };
    if(messageInstance) {
      messageInstance.notice(args)
    } else {
      Message.instance(args.type, (instance: any) => {
        messageInstance = instance;
        messageInstance.notice(args);
      });
    }
  });
  const result: any = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (reselove: any, rejected: any) => {
    closePromise.then(reselove, rejected);
  }
  result.promise = closePromise;
  return result;
}

export function info(text: string) {
  notice({text, key: md5(v4()), type: 'info'})
}

export function error(text: string) {
  notice({text, key: md5(v4()), type: 'error'})
}

export function warn(text: string) {
  notice({text, key: md5(v4()), type: 'warn'})
}

export function success(text: string) {
  notice({text, key: md5(v4()), type: 'success'})
}
