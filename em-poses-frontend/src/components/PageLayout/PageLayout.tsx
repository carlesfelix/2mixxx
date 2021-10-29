import { ReactNode } from 'react';
import Toolbar from '../Toolbar';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
};

export default function PageLayout(props: Props) {
  const { children, toolbarTitle, toolbarLinkBack } = props;
  return (
    <div className="PageLayout">
      <div className="toolbar-container">
        <Toolbar title={toolbarTitle} linkBack={toolbarLinkBack} />
      </div>
      <div className="page-container">
        <div className="limit-container">
          {children}
        </div>
      </div>
    </div>
  );
}
