import { ReactNode } from 'react';
import IAppRoute from '../../models/IAppRoute.model';
import NavLinks from './components/NavLinks';
import Toolbar from './components/Toolbar';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
  toolbarTitle: string;
  toolbarLink?: string;
  routes: IAppRoute[];
};

export default function PageLayout(props: Props) {
  const { children, toolbarTitle, toolbarLink, routes } = props;
  return (
    <div className="PageLayout">
      <div className="toolbar-container">
        <Toolbar title={toolbarTitle} link={toolbarLink} />
      </div>
      <div className="nav-container">
        <div className="limit-container">
          <NavLinks routes={routes}></NavLinks>
        </div>
      </div>
      <div className="page-container">
        <div className="limit-container">
          {children}
        </div>
      </div>
    </div>
  );
}
