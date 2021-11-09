import classNames from 'classnames';
import { ReactNode } from 'react';
import Toolbar from '../Toolbar';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  className?: string;
};

export default function PageLayout(props: Props) {
  const {
    children, toolbarTitle,
    toolbarLinkBack, className = ''
  } = props;
  const pageLayoutClassName = classNames('PageLayout', {
    [className]: !!className
  });
  return (
    <div className={pageLayoutClassName}>
      <Toolbar title={toolbarTitle} linkBack={toolbarLinkBack} />
      <div className="page-container">
        {children}
      </div>
    </div>
  );
}
