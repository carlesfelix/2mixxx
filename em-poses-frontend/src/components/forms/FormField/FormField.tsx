import classNames from 'classnames';
import { ReactNode } from 'react';
import './FormField.scss';


type Props = {
  label: string;
  errorMessage?: string;
  invalid: boolean;
  children: ReactNode;
  className?: string;
  required?: boolean;
};

export default function FormField(props: Props) {
  const {
    label, errorMessage, children, invalid, className = '',
    required = false
  } = props;
  
  const formFieldClassName = classNames('FormField', {
    [className]: !!className
  });
  const labelClassName = classNames('field-label', {
    'field-label--required': required
  });
  const fieldChildrenClassName = classNames('field-children', {
    'field-invalid': invalid
  });

  return (
    <label className={formFieldClassName}>
      <span className={labelClassName}>{label}</span>
      <div className={fieldChildrenClassName}>
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
