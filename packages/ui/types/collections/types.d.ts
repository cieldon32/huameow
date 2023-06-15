import { Key, ReactElement, ReactNode } from 'react';
export interface ItemProps<T> {
    children: ReactNode;
    title?: ReactNode;
    textValue?: string;
    'aria-label'?: string;
    childItems?: Iterable<T>;
    hasChildItems?: boolean;
}
export type ItemElement<T> = ReactElement<ItemProps<T>>;
export type ItemRenderer<T> = (item: T) => ItemElement<T>;
export interface PartialNode<T> {
    type?: string;
    key?: Key;
    value?: T;
    element?: ReactElement;
    wrapper?: (element: ReactElement) => ReactElement;
    rendered?: ReactNode;
    textValue?: string;
    'aria-label'?: string;
    index?: number;
    renderer?: ItemRenderer<T>;
    hasChildNodes?: boolean;
    childNodes?: () => IterableIterator<PartialNode<T>>;
    props?: any;
    shouldInvalidate?: (context: unknown) => boolean;
}
