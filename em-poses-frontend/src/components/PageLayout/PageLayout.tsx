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
      <Toolbar title={toolbarTitle} linkBack={toolbarLinkBack} />
      <div className="page-container">
        {children}
      </div>
    </div>
  );
}
