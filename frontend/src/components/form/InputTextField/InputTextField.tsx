import FieldController from "../FieldController";
import InputText from "../InputText";
import { InputTextFieldProps } from "./types";

export default function InputTextField(props: InputTextFieldProps) {
  const {
    control, name, fieldClassName,
    defaultValue = '', label, rules,
    disabled, placeholder, className
  } = props;
  return (
    <FieldController
      name={name}
      control={control}
      defaultValue={defaultValue}
      label={label}
      rules={rules}
      fieldClassName={fieldClassName}
      render={controlledFieldProps => (
        <InputText
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          {...controlledFieldProps}
        />
      )}
    />
  );
}
