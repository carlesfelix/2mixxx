import { InputHTMLAttributes, ReactNode } from 'react';
import { Control, Controller, ControllerRenderProps, FieldValues, UseControllerProps } from 'react-hook-form';
import FormField from '../FormField';
import InputText from '../inputs/InputText';

type Field = { type: 'inputText', props?: InputHTMLAttributes<HTMLInputElement> } |
{ type: 'select', props?: InputHTMLAttributes<HTMLSelectElement> };
  
type Props = {
  control: Control<FieldValues>;
  defaultValue?: unknown;
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
    const { value, onChange, onBlur, name } = controllerRenderProps;
    switch(field.type) {
      case 'inputText':
        return (
          <InputText value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      case 'select':
        return <select {...field.props} {...controllerRenderProps} />;
      default:
        throw new Error(`fieldType does not exists`);
    }
  }
  const isRequired = !!(rules && rules.required && (typeof rules.required === 'string' ||
    (typeof rules.required === 'object' && rules.required.value)));
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: renderField, fieldState }) => {
        return (
          <FormField
            className={className} errorMessage={fieldState.error?.message} label={label}
            invalid={fieldState.invalid} required={isRequired}
          >
            {getComponent(renderField)}
          </FormField>
        );
      }}
    />
  );
}
