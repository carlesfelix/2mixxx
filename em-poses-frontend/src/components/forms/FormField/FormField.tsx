import { ReactNode } from 'react';
import classnames from 'classnames';
import './FormField.scss';

type Props = {
  label: string;
  errorMessage?: string;
  children: ReactNode
};

export default function FormField(props: Props) {
  const { label, errorMessage, children } = props;
  const fieldChildrenClassnames = classnames('field-children', {
    'field-error': !!errorMessage
  });
  return (
    <label className="FormField">
      <label className="field-label">{label}</label>
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