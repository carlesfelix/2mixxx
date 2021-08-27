import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  inProgress: boolean;
  error?: Error | null | boolean;
  children: ReactNode;
  errorMessage?: string;
  className?: string;
};

export default function AsyncLayout(props: Props) {
  const { error = '', inProgress, children, errorMessage, className = '' } = props;
  const rootClassName = classNames('AsyncLayout', {
    [className]: !!className
  });
  if (error) {
    return (
      <div className={rootClassName}>
        <span>{errorMessage}</span>
      </div>
    );
  }
  if (inProgress) {
    return (
      <div className={rootClassName}>
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    );
  }
  return <>{children}</>;
}