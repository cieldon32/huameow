import React from "react";

const getSlotProps = (children: any, slotKeys: string[]) =>
  React.Children.toArray(children).reduce((curr: any, child) => {
    if (React.isValidElement(child)) {
      const tag: string = (child.type as any)?.displayName;
      if (slotKeys?.includes(tag)) {
        curr[tag] = child.props;
      }
    }
    return curr;
  }, {});

const getCleanChildren = (children: any, slotKeys: string[]) => {
  const res = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement(child)) {
      const tag: string = (child.type as any)?.displayName;
      return !slotKeys?.includes(tag);
    }
    return true;
  });
  return res.length > 0 ? res : undefined;
};

const createResultComponent = (Component: any) => {
  const ResultComponent = React.memo((props: any) => {
    const {
      children,
      propagateSlotProps,
      slots = [],
      ...otherProps
    } = props;

    // Find and get out all childProps
    const slotProps = React.useMemo(() => getSlotProps(children, slots), [
      slots,
      children
    ]);
    // Clean children from childProps components
    const cleanChildren = React.useMemo(
      () => getCleanChildren(children, slots),
      [slots, children]
    );

    const passProps = React.useMemo(
      () => ({
        ...otherProps,
        slots: { ...propagateSlotProps, ...slotProps }
      }),
      [otherProps, slotProps, propagateSlotProps]
    );

    return React.createElement(Component, passProps, cleanChildren);
  });

  return ResultComponent;
};

const EXCLUDED_NAMES = [
  // Excluded by uppercase check
  // '__docgenInfo',
  // '$$typeof',
  // 'childContextTypes',
  // 'contextType',
  // 'contextTypes',
  // 'defaultProps',
  // 'displayName',
  // 'getDefaultProps',
  // 'getDerivedStateFromProps',
  // 'propTypes',
  // 'tag',
  // 'toJSON',
  "PropTypes"
];

const isComponentName = (name: any) => {
  const res =
    typeof name === "string" &&
    !EXCLUDED_NAMES.includes(name) &&
    name.match(/^[A-Z0-9]/);
  return res;
};

export const withSlot = <P>(WrapComponent: React.FC<P>) => {
  const Component = React.memo(createResultComponent(WrapComponent));
  const ProxyComponent = new Proxy(Component, {
    get(target: any, key, receiver) {
      if (key in target || typeof key === "symbol" || !isComponentName(key)) {
        return Reflect.get(target, key, receiver);
      }

      const slotKeys = Reflect.get(target, "defaultProps")?.slots || [];
      const cmp = Reflect.get(target, key);
      if (!cmp) {
        const NullComponent: React.FC = () => null;
        NullComponent.displayName = key as string;
        Reflect.set(target, key, NullComponent);
      }
      Reflect.set(target, "defaultProps", {
        ...target.defaultProps,
        slots: [...slotKeys, key]
      });

      return Reflect.get(target, key, receiver);
    }
  });

  return ProxyComponent;
};
