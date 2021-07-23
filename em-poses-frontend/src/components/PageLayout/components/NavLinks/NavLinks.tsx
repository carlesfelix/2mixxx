import { faCog, faListAlt, faPaperPlane, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavLinks.scss';

export default function NavLinks() {
  return (
    <div className="NavLinks">
      <a className="nav-link nav-link--active">
        <FontAwesomeIcon icon={faListAlt} />
      </a>
      <a className="nav-link">
        <FontAwesomeIcon icon={faPlusSquare} />
      </a>
      <a className="nav-link">
        <FontAwesomeIcon icon={faPaperPlane} />
      </a>
      <a className="nav-link">
        <FontAwesomeIcon icon={faCog} />
      </a>
    </div>
  );
}