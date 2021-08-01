import { ReactNode } from 'react';
import IAppLink from '../../models/IAppLink.model';
import IAppRoute from '../../models/IAppRoute.model';
import NavLinks from './components/NavLinks';
import Toolbar from '../Toolbar';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  routes: IAppRoute[];
  links?: IAppLink[];
};

export default function PageLayout(props: Props) {
  const { children, toolbarTitle, toolbarLinkBack, links } = props;
  return (
    <div className="PageLayout">
      <div className="toolbar-container">
        <Toolbar title={toolbarTitle} linkBack={toolbarLinkBack} />
      </div>
      {
        !!links && (
          <div className="nav-container">
            <div className="limit-container">
              <NavLinks links={links}></NavLinks>
            </div>
          </div>
        )
      }
      <div className="page-container">
        <div className="limit-container">
          {children}
        </div>
      </div>
    </div>
  );
}
