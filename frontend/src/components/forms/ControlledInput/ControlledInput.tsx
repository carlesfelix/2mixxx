import { ReactNode } from 'react';
import {
  Control, Controller, ControllerRenderProps,
  FieldValues, UseControllerProps
} from 'react-hook-form';
import { useTranslation } from '../../../services/i18n';
import FormField from '../../form/FormField';
import Checkbox, { CheckboxExtraProps } from '../inputs/Checkbox';
import Dropdown, { DropdownExtraProps } from '../inputs/Dropdown';
import InputText from '../inputs/InputText';
import { InputTextExtraProps } from '../inputs/InputText/InputText';
import MultiselectBox, { MultiselectBoxExtraProps } from '../inputs/MultiselectBox';
import RadioButton, { RadioButtonExtraProps } from '../inputs/RadioButton';
import RadioButtonBox, { RadioButtonBoxExtraProps } from '../inputs/RadioButtonBox';

type Field = { type: 'inputText', props?: InputTextExtraProps } |
{ type: 'dropdown', props: DropdownExtraProps } |
{ type: 'checkbox', props: CheckboxExtraProps } |
{ type: 'multiselectBox', props: MultiselectBoxExtraProps } |
{ type: 'radioButton', props: RadioButtonExtraProps } |
{ type: 'RadioButtonBox', props: RadioButtonBoxExtraProps };
  
type Props = {
  control: Control<FieldValues>;
  defaultValue?: unknown;
  rules?: UseControllerProps['rules'];
  label?: string;
  name: string;
  field: Field;
  className?: string;
};

export default function ControlledInput(props: Props) {
  const {
    control, defaultValue, rules, name,
    label, field, className
  } = props;
  const { t } = useTranslation();

  function getComponent(controllerRenderProps: ControllerRenderProps<FieldValues>): ReactNode {
    const { value, onChange, onBlur, name } = controllerRenderProps;
    switch(field.type) {
      case 'inputText':
        return (
          <InputText
            value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      case 'dropdown':
        return (
          <Dropdown
            value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      case 'multiselectBox':
        return (
          <MultiselectBox
            value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      case 'radioButton':
        return (
          <RadioButton
            value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      case 'RadioButtonBox':
        return (
          <RadioButtonBox
            value={value} onChange={onChange} onBlur={onBlur}
            name={name} extraProps={field.props}
          />
        );
      default:
        throw new Error(`fieldType does not exists`);
    }
  }
  function resolveMessage(message: string): string {
    try {
      const parsed = JSON.parse(message);
      if (
        'message' in parsed && typeof parsed.message === 'string' &&
        typeof parsed.options === 'object'
      ) {
        return t(parsed.message, parsed.options);
      }
      return '';
    } catch {
      return '';
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
        const resolvedErrorMessage = fieldState.error?.message &&
          resolveMessage(fieldState.error.message);
        return (
          <FormField
            className={className} errorMessage={resolvedErrorMessage} label={label}
            invalid={fieldState.invalid} required={isRequired}
          >
            {getComponent(renderField)}
          </FormField>
        );
      }}
    />
  );
}
