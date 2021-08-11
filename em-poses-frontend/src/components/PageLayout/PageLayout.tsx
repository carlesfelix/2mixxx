import { ReactNode } from 'react';
import AppLink from '../../types/AppLink';
import Toolbar from '../Toolbar';
import NavLinks from './components/NavLinks';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  links?: AppLink[];
  parentUrl?: string;
};

export default function PageLayout(props: Props) {
  const { children, toolbarTitle, toolbarLinkBack, links, parentUrl = '' } = props;
  return (
    <div className="PageLayout">
      <div className="toolbar-container">
        <Toolbar title={toolbarTitle} linkBack={toolbarLinkBack} />
      </div>
      {
        !!links && (
          <div className="nav-container">
            <div className="limit-container">
              <NavLinks links={links} parentUrl={parentUrl}></NavLinks>
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
