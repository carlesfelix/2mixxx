import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import IAppRoute from '../../../../models/IAppRoute.model';
import './NavLinks.scss';

type Props = {
  routes: IAppRoute[]
};
export default function NavLinks(props: Props) {
  const { routes } = props;
  return (
    <div className="NavLinks">
      {
        routes.map((appRoute, iAppRoute) => (
          appRoute.navLink && (
            <NavLink className="nav-link" to={appRoute.navLink.to} activeClassName="nav-link--active" key={iAppRoute}>
              <FontAwesomeIcon icon={appRoute.navLink.icon} />
            </NavLink>
          )
        ))
      }
    </div>
  );
}