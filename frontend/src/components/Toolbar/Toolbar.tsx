import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import './Toolbar.scss';

type Props = {
  title?: string;
  linkBack?: string;
};
export default function Toolbar(props: Props) {
  const { title, linkBack } = props;
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
    </nav>
  );
}