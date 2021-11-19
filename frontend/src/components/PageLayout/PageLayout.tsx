import classNames from 'classnames';
import { ReactNode } from 'react';
import AsyncLayout from '../AsyncLayout';
import Toolbar from '../Toolbar';
import './PageLayout.scss';

type Props = {
  children?: ReactNode;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  className?: string;
  inProgress?: boolean;
  error?: Error | null | boolean;
  errorMessage?: string;
};

export default function PageLayout(props: Props) {
  const {
    children, toolbarTitle,
    toolbarLinkBack, className = '',
    error, inProgress, errorMessage
  } = props;
  const pageLayoutClassName = classNames('PageLayout', {
    [className]: !!className
  });
  return (
    <div className={pageLayoutClassName}>
      <Toolbar
        title={inProgress ? 'Loading...' : toolbarTitle}
        linkBack={toolbarLinkBack}
      />
      <div className="page-container">
        <AsyncLayout
          inProgress={inProgress}
          error={error}
          errorMessage={errorMessage}
        >
          {children}
        </AsyncLayout>
      </div>
    </div>
  );
}
