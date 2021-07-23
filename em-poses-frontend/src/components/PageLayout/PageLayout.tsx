import { ReactNode } from 'react';
import NavButtons from './components/NavLinks';
import Toolbar from './components/Toolbar';
import './PageLayout.scss';

type Props = {
  children: ReactNode,
  toolbarTitle: string,
  toolbarLink?: string,
};
export default function PageLayout(props: Props) {
  const { children, toolbarTitle } = props;
  return (
    <div className="PageLayout">
      <div className="toolbar-container">
        <Toolbar title={toolbarTitle} />
      </div>
      <div className="nav-container">
        <div className="limit-container">
          <NavButtons></NavButtons>
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
