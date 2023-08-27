import {inflate} from 'pako';
import {lzo} from '../utils/lzo1x';
import {conseq} from '../utils';
import {UNDEFINED} from '../constant';

interface ScannerOptions {
  len?: number;
  v2?: boolean;
  bpu?: number;
  decoder?: any;
  tail?: number;
  searchTextLen?: any;
}

export const scanner = (
  buffer: ArrayBuffer,
  {
    len,
    v2,
    bpu = 1,
    decoder,
    tail = 0,
    searchTextLen
  }: ScannerOptions = {}) => {
  const dv = new DataView(buffer);
  let offset = 0;
  const methods = {
    forward: (len: number) =>{ return offset += len; },
    offset: () => { return offset; },
    readInt: () => {
      const res = dv.getUint32(offset, false);
      methods.forward(4);
      return res;
    },
    readNum: () => {
      methods.forward(4);
      return methods.readInt();
    },
    readUint8: () => {
      return conseq(dv.getUint8(offset),  methods.forward(1));
    },
    readUint16: () => {
      return conseq(dv.getUint16(offset, false), methods.forward(2));
    },
    checksum_v2: () => {
      offset += 4;
    },
    readBlock: (len: number, expectedBufSize: number, decryptor: Function) => {
      const comp_type = dv.getUint8(offset);
      if(comp_type === 0){
        if(v2){
          methods.forward(8);
        }
        return methods;
      } else {
        offset += 8;
        len -= 8;
        let tmp = new Uint8Array(buffer, offset, len);
        if (decryptor) {
          var passkey = new Uint8Array(8);
          passkey.set(new Uint8Array(buffer, offset - 4, 4));
          passkey.set([0x95, 0x36, 0x00, 0x00], 4);
          tmp = decryptor(tmp, passkey);
        }
        tmp = comp_type === 2 ? inflate(tmp) : lzo.decompress(tmp);
        methods.forward(len);
        return scanner(tmp.buffer, {
          len: tmp.length,
          v2,
          bpu,
          decoder,
          tail,
          searchTextLen
        });
      }
    },
    readText: () => {
      const len = searchTextLen(dv, offset);
      const res = conseq(
        decoder.decode(new Uint8Array(buffer, offset, len)),
        methods.forward(len + bpu)
      );
      return res;
    },
    readTextSized: (len: number) => {
      len *= bpu;
      const res = decoder ? decoder.decode(new Uint8Array(buffer, offset, len)) : '';
      methods.forward(len + tail);
      return res;
    },
    readShort: () => {
      if(v2) {
        return methods.readUint16()
      } else {
        return methods.readUint8()
      }
    },
    readRaw: function(len: number) {
      return conseq(
        new Uint8Array(buffer, offset, len),
        methods.forward(len === UNDEFINED ? buffer.byteLength - offset : len)
      );
    },
  }
  return Object.create(methods)
}
