import classNames from 'classnames';
import { ReactNode } from 'react';
import './Section.scss';

type Props = {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
};

export default function Section(props: Props) {
  const { className = '', header, children } = props;
  const sectionClassName = classNames(
    'Section',
    { [className]: !!className }
  );
  return (
    <div className={sectionClassName}>
      {
        !!header && (
          <div className="Section__header">
            {header}
          </div>
        )
      }
      <div className="Section__content">
        {children}
      </div>
    </div>
  );
}