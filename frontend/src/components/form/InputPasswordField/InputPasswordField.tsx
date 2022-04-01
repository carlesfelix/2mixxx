import FieldController from "../FieldController";
import InputPassword from "../InputPassword/InputPassword";
import { InputPasswordFieldProps } from "./types";

export default function InputPasswordField(props: InputPasswordFieldProps) {
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
        <InputPassword
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          {...controlledFieldProps}
        />
      )}
    />
  );
}
