import { InputHTMLAttributes, ReactNode } from 'react';
import { Control, Controller, ControllerRenderProps, FieldValues, UseControllerProps } from 'react-hook-form';
import FormField from '../FormField';

type Field = { type: 'inputText', props?: InputHTMLAttributes<HTMLInputElement> } |
{ type: 'select', props?: InputHTMLAttributes<HTMLSelectElement> };
  
type Props = {
  control: Control<FieldValues>;
  defaultValue: unknown;
  rules?: UseControllerProps['rules'];
  label: string;
  name: string;
  field: Field;
  className?: string;
};

export default function ControlledInput(props: Props) {
  const {
    control, defaultValue, rules, name,
    label, field, className
  } = props;
  
  function getComponent(controllerRenderProps: ControllerRenderProps<FieldValues>): ReactNode {
    switch(field.type) {
      case 'inputText':
        return <input className="input" type="text" {...field.props} {...controllerRenderProps} />;
      case 'select':
        return <select {...field.props} {...controllerRenderProps} />;
      default:
        throw new Error(`fieldType does not exists`);
    }
  }
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => {
        let errorMessage;
        if (fieldState.isDirty && fieldState.isTouched && fieldState.invalid && fieldState.error && fieldState.error.message) {
          errorMessage = fieldState.error.message;
        }
        return (
          <FormField className={className} errorMessage={errorMessage} label={label} invalid={fieldState.invalid}>
            {getComponent(field)}
          </FormField>
        );
      }}
    />
  );
}