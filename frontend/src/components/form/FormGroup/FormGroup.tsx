import classNames from 'classnames';
import { FormGroupProps } from './types';
import './FormGroup.scss';

export default function FormGroup(props: FormGroupProps) {
  const { disabled, legend, children, className } = props;
  const rootClassName = classNames('FormGroup', className);

  return (
    <fieldset disabled={disabled} className={rootClassName}>
      {
        legend && (
          <legend>{legend}</legend>
        )
      }
      {children}
    </fieldset>
  );
}