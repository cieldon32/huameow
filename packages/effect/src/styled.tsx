import React from 'react';
import { isNil, pickBy, hasIn } from 'ramda';

type IProps = Record<string, any>;

const reduceStyle = ({ hide, ...props }: any) => {
  const styles = {
    ...props,
  };
  if (!isNil) {
    styles.display = hide ? 'none' : 'block';
  }
  return styles;
};

const getCssAndProps = (props: IProps) => {
  const attrs = pickBy(
    (_, key: string) => hasIn(key, document.documentElement.style),
    props,
  );
  const componentProps = pickBy(
    (_, key) => !hasIn(key, document.documentElement.style),
    props,
  );
  return {
    css: reduceStyle(attrs),
    componentProps,
  };
};

export const Styled = ({ children, name, child, ...props }: any) => {
  const { css, componentProps = {} } = getCssAndProps(props);

  return React.cloneElement(
    children,
    {
      style: css,
      name,
      ...(componentProps as IProps),
    },
    child || children.props.children,
  );
};
