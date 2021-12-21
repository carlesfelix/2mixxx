import classNames from 'classnames';
import { ReactNode } from 'react';
import './Label.scss';

type Props = {
  className?: string;
  children: ReactNode;
  header: ReactNode;
};
export default function Label(props: Props) {
  const {
    className = '', children,
    header
  } = props;
  const labelClassName = classNames(
    'Label', { [className]: !!className }
  );
  return (
    <div className={labelClassName}>
      <span className="Label__header">
        {header}
      </span>
      <span className="Label__content">
        {children}
      </span>
    </div>
  );
}
