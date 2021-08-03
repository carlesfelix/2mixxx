import { ReactNode } from 'react';
import ILink from '../../models/ILink.model';
import IRoute from '../../models/IRoute.model';
import NavLinks from './components/NavLinks';
import Toolbar from '../Toolbar';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  routes: IRoute[];
  links?: ILink[];
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
