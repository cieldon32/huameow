import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import md5 from 'md5';
import './style/index.scss';

export function Form({ children, className }: any) {
  const classNames = classnames('mdc-form', className);
  const [fileds, setFileds] = useState<any>({});
  const [requireds, setRequired] = useState<string[]>([]);
  useEffect(() => {
    const list: string[] = [];
    const params: Record<string, any> = {};
    React.Children.map(children, (child) => {
      if(child.props.required) {
        list.push(child.props.name)
      }
      if(child.props.value){
        params[child.props.name] = child.props.value;
      }
    });
    setRequired(list);
    setFileds(params);
  }, []);
  return (
    <form className={classNames}>
      {React.Children.map(children, child => {
        const element: any = React.cloneElement(child as any);
        const isField = element.type.displayName !== 'Button';
        const {
          name,
          label,
          variant,
          onSubmit,
          children,
          type,
          disabled,
          value,
          ...props
        } = element.props;
        const isMd5 = element.props.type === 'password';
        const className = classnames('mdc-form-item', element.props.className);
        function restValue(v: string) {
          if (isMd5) {
            return md5(v);
          } else {
            return v;
          }
        }
        function doChange(value: any) {
          const v = restValue(value);
          setFileds((res: any) => {
            const result = { ...res, [name]: v }
            return result
          });
        }
        function doSubmit() {
          const list = requireds.filter((key: string) => fileds[key]);
          if (requireds.length && requireds.length === list.length) {
            onSubmit(fileds);
          }
          if(!requireds.length){
            onSubmit(fileds);
          }
        }
        const events = isField
          ? { onChange: doChange }
          : {
              onClick: doSubmit,
            };

        return (
          <element.type
            {...props}
            className={className}
            name={name}
            label={label}
            children={children}
            variant={variant}
            type={type}
            value={value}
            disabled={disabled}
            {...events}
          ></element.type>
        );
      })}
    </form>
  );
}
