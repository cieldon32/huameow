import { Observable, Observer } from 'rxjs';
import {parseXml, decrypt, isTrue, getExtension} from '../utils';
import {REGEXP_STRIPKEY} from '../constant';

export const readHeader = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, file, next, ...rest}: any) => {
          const UTF_16LE = new TextDecoder('utf-16le');
          const header_str = UTF_16LE.decode(new Uint8Array(buffer, 0, next)).replace(/\0$/, '');
          const xml: any = parseXml(header_str).querySelector('Dictionary, Library_Data')!.attributes;
          const attrs: any = {};
          for (let i = 0, item: any; i < xml.length; i++) {
            item = xml.item(i);
            attrs[item.nodeName] = item.nodeValue;
          }

          attrs.Encrypted = parseInt(attrs.Encrypted, 10) || 0;
          attrs.Encoding = attrs.Encoding || 'UTF-16';
          const isV2 = parseInt(attrs.GeneratedByEngineVersion, 10) >= 2.0;
          const bpu = (attrs.Encoding === 'UTF-16') ? 2 : 1;
          let adaptKey = function(key: string) {return key;};
          const ext = getExtension(file.name, 'mdx');
          const regexp = REGEXP_STRIPKEY[ext];
          if(isTrue(attrs.KeyCaseSensitive)) {
            adaptKey = isTrue(attrs.StripKey) ? function(key) { return key.replace(regexp, '$1'); } : adaptKey
          } else {
            adaptKey = isTrue(attrs.StripKey || (isV2 ? '' : 'yes')) ? function(key: string) { return key ? key.toLowerCase().replace(regexp, '$1') : key; } : function(key: string) { return key ? key.toLowerCase() : key; }
          }
          observer.next({
            ...rest,
            next,
            file,
            buffer,
            offset: next + 4,
            v2: isV2,
            decryptors: attrs.Encrypted & 0x02 ? [false, decrypt] : [false, false],
            bpu,
            attrs,
            decoder: new TextDecoder(attrs.Encoding || 'UTF-16LE'),
            tail: isV2 ? bpu : 0,
            searchTextLen: attrs.Encoding === 'UTF-16' ? function(dv: DataView, offset: number) {
              offset = offset;
              var mark = offset;
              while (dv.getUint16(offset)) { offset+= bpu; };
              return offset - mark;
            } : function(dv: DataView, offset: number) {
              offset = offset;
              var mark = offset;
              while (dv.getUint8(offset++)) { /* scan for NUL */ }
              return offset - mark - 1;
            },
            adaptKey
          });

      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => {
      subscription.unsubscribe();
    }
  })
}
