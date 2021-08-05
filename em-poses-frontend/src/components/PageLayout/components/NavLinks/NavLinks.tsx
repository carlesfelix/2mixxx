import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import AppLink from '../../../../types/AppLink';
import './NavLinks.scss';

type Props = {
  links: AppLink[]
};
export default function NavLinks(props: Props) {
  const { links } = props;
  return (
    <div className="NavLinks">
      {
        links.map((link, iLink) => (
          <NavLink className="nav-link" to={link.to} activeClassName="nav-link--active" key={iLink}>
            <FontAwesomeIcon icon={link.icon} />
          </NavLink>
        ))
      }
    </div>
  );
}