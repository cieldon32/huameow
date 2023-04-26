import {CSS_CLASSES} from './constants';
import './style/index.scss';

export const Layout = ({
  children
}: any) => {
  return (
    <div className={CSS_CLASSES.ROOT}>
      <div className={CSS_CLASSES.ROW}>
        <section className={CSS_CLASSES.SECTION}>
          <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">menu</button>
          <span className="mdc-top-app-bar__title">{children}</span>
        </section>
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
          <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button>
          <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button>
        </section>
      </div>
    </div>
  )
}
