import { faArrowLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import OptionItem from '../../types/OptionItem';
import OverlayMenu from '../OverlayMenu';
import './Toolbar.scss';

type Props = {
  title?: string;
  linkBack?: string;
  menu?: OptionItem[];
};
export default function Toolbar(props: Props) {
  const { title, linkBack, menu = [] } = props;
  return (
    <nav className="Toolbar">
      {
        linkBack && (
          <span className="toolbar-item toolbar-link">
            <NavLink to={linkBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </NavLink>
          </span>
        )
      }
      <span className="toolbar-item toolbar-title">
        {title}
      </span>
      {
        !!menu.length && (
          <span className="toolbar-item toolbar-menu">
            <OverlayMenu items={menu}>
              <span className="toolbar-menu-btn">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
            </OverlayMenu>
          </span>
        )
      }
    </nav>
  );
}