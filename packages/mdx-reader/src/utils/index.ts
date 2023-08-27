
import ripemd128 from './ripemd128';

export async function readFile(file: File, offset: number, len: number) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
        resolve(reader.result)
    };
    reader.readAsArrayBuffer(file.slice(offset, offset + len));
  });
}

export const getExtension = (filename: string, defaultExt: string): string => {
  return filename ? /(?:\.([^.]+))?$/.exec(filename)![1] : defaultExt;
};

export const parseXml = (str: string) => {
  return (new DOMParser()).parseFromString(str, 'text/xml');
}

/*
   * Decrypt encrypted data block of keyword index (attrs.Encrypted = "2").
   * @see https://github.com/zhansliu/writemdict/blob/master/fileformat.md#keyword-index-encryption
   * @param buf an ArrayBuffer containing source data
   * @param key an ArrayBuffer holding decryption key, which will be supplied to ripemd128() before decryption
   * @return an ArrayBuffer carrying decrypted data, occupying the same memory space of source buffer
   */
export function decrypt(buf: Uint8Array, key: any): ArrayBuffer {
  key = ripemd128(key);
  let byte, keylen = key.length, prev = 0x36, i = 0, len = buf.length;
  for (; i < len; i++) {
      byte = buf[i];
      byte = ((byte >> 4) | (byte << 4));
      byte = byte ^ prev ^ (i & 0xFF) ^ key[i % keylen];
      prev = buf[i];
      buf[i] = byte;
  }
  return buf;
}

export function conseq (...args: any) {
  return args[0];
}

/**
 * Test if a value of dictionary attribute is true or not.
 */
export function isTrue(v: string | boolean) {
  v = ((v || false) + '').toLowerCase();
  return v === 'yes' || v === 'true';
}

/**
 * Match the first element in list with given offset.
 */
export function matchOffset(list: any[], offset: number) {
  return list.some(function(el: any) { return el.offset === offset ? list = [el] : false; }) ? list : [];
}
