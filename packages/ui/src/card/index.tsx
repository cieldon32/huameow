import { forwardRef,useRef} from 'react';
import classnames from 'classnames';
// import { Button } from '@/button';
import { Ripple } from '@/ripple';
import { useSlot } from '@/slot';
import './style/index.scss';

export const Card = forwardRef(({
  // title,
  className, children }: any, ref: any) => {
  const $el = ref || useRef(null);
  const slots = useSlot(children);
  const classNames = classnames('mdc-card', className, {

  });
  return (
    <div className={classNames} ref={$el}>

      <div className="mdc-card__primary-action">
        {slots.header}
        {/* <div className="mdc-card__media mdc-card__media--square">
          <div className="mdc-card__media-content">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg" />
          </div>
        </div> */}
        <Ripple parent={$el}></Ripple>
      </div>
      {/* <div className="mdc-card__content">{slots.children}</div> */}
      {/* <div className="mdc-card__actions">
        <div className="mdc-card__action-buttons">
          <Button className="mdc-card__action mdc-card__action--button">
            Action 1
          </Button>
          <Button className="mdc-card__action mdc-card__action--button">
            Action 2
          </Button>
        </div>
        <div className="mdc-card__action-icons">
          <Button
            className="mdc-card__action mdc-card__action--icon"
            type="icon"
          >
            share
          </Button>
          <Button
            className="mdc-card__action mdc-card__action--icon"
            type="icon"
          >
            more_horiz
          </Button>
        </div>
      </div> */}
    </div>
  );
});
