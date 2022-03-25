import classNames from 'classnames';
import { ReactNode } from 'react';
import './BottomActionWrapper.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function BottomActionWrapper(props: Props) {
  const { children, className } = props;
  const rootClassName = classNames('BottomActionWrapper', className);
  return (
    <div className={rootClassName}>
      <span>
        {children}
      </span>
    </div>
  );
}
