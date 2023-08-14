import classnames from 'classnames';
import './style.scss';

export function Flex({className, children, dir = 'row', ...props}: any) {
  const classNames = classnames('mdc-flex', className, {
    ['row']: dir === 'row',
    ['column']: dir === 'column',
  });
  return (
    <div className={classNames} {...props}>{children}</div>
  )
}
