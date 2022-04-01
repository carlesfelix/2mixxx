import classNames from 'classnames';
import { forwardRef } from 'react';
import './FormField.scss';
import { FormFieldProps } from './types';

const FormField = forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const {
    label, errorMessage, children, invalid, className,
    required = false
  } = props;
  
  const formFieldClassName = classNames('FormField', className);
  const labelClassName = classNames('field-label', {
    'field-label--required': required
  });
  const fieldChildrenClassName = classNames('field-children', {
    'field-invalid': invalid
  });

  return (
    <div className={formFieldClassName} ref={ref} tabIndex={-1}>
      {
        !!label && (
          <span className={labelClassName}>{label}</span>
        )
      }
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
    </div>
  );
});

export default FormField
