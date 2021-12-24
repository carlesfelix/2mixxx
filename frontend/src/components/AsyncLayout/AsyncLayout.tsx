import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import './AsyncLayout.scss';

type Props = {
  inProgress?: boolean;
  error?: Error | null | boolean;
  children: ReactNode;
  errorMessage?: string;
};

export default function AsyncLayout(props: Props) {
  const { error = '', inProgress, children, errorMessage } = props;
  if (error) {
    return (
      <div className="AsyncLayout layout layout-center-v">
        <span>{errorMessage}</span>
      </div>
    );
  }
  if (inProgress) {
    return (
      <div className="AsyncLayout layout layout-center-v">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
  }
  return <>{children}</>;
}