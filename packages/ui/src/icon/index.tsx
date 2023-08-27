import {useEffect, useRef} from 'react';
import classnames from 'classnames';
import gsap from "gsap";
import {IconProps} from './interface';
import {CSS_CLASSES} from './constants';
import './index.scss';

export const Icon = ({
  className,
  children,
  stage
}: IconProps) => {
  const div = useRef(null);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
  });

  useEffect(() => {
    switch(stage) {
      case 'rotate': {
        gsap.to(div.current, {rotation:"360", duration: 4, ease: 'none', repeat:-1});
        break;
      }
      default:{
        break;
      }
    }

  }, [div.current])

  return (
    <div className={classNames} ref={div}>
      <span>{children}</span>
    </div>
  )
}

Icon.displayName = 'Icon';
