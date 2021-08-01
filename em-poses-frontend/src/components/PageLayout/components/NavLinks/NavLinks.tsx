import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import IAppLink from '../../../../models/IAppLink.model';
import './NavLinks.scss';

type Props = {
  links: IAppLink[]
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