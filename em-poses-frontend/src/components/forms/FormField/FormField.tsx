import { ReactNode } from 'react';
import classnames from 'classnames';
import './FormField.scss';

type Props = {
  label: string;
  errorMessage?: string;
  invalid: boolean;
  children: ReactNode;
  className?: string;
};

export default function FormField(props: Props) {
  const { label, errorMessage, children, invalid, className = '' } = props;
  
  const formFieldClassnames = classnames('FormField', {
    [className]: !!className
  });
  const fieldChildrenClassnames = classnames('field-children', {
    'field-invalid': invalid
  });

  return (
    <label className={formFieldClassnames}>
      <span className="field-label">{label}</span>
      <div className={fieldChildrenClassnames}>
        {children}
      </div>
      {
        !!errorMessage && (
          <span className="field-error-message">
            {errorMessage}
          </span>
        )
      }
    </label>
  );
}