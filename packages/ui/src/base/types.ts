/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-14 16:45:18
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-14 16:46:26
 * @FilePath: /hm/packages/components/src/base/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-14 16:45:18
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-14 16:45:26
 * @FilePath: /hm/packages/components/src/base/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export type EventType = keyof GlobalEventHandlersEventMap;
export type SpecificEventListener<K extends EventType> = (evt: GlobalEventHandlersEventMap[K]) => void;
export type CustomEventListener<E extends Event> = (evt: E) => void;
export type WindowEventType = keyof WindowEventMap;
export type SpecificWindowEventListener<K extends WindowEventType> =
    (evt: WindowEventMap[K]) => void;

// `any` is required for mixin constructors
// tslint:disable:no-any
/**
 * A generic type for the constructor of an instance type. Note that this type
 * does not preserve accurate constructor parameters.
 *
 * @template T The instance type.
 */
export type Constructor<T = any> = {
  new (...args: any[]): T;
};
// tslint:enable:no-any
