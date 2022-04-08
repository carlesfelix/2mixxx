import { Controller } from "react-hook-form";
import { useTranslation } from "../../../services/i18n";
import FormField from "../FormField";
import { FieldControllerProps } from "./types";

export default function FieldController(props: FieldControllerProps) {
  const {
    control, defaultValue, rules, name,
    label, render, fieldClassName
  } = props;
  const { t } = useTranslation();

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
            className={fieldClassName}
            errorMessage={resolvedErrorMessage}
            label={label}
            invalid={fieldState.invalid}
            required={isRequired}
            ref={renderField.ref}
          >
            {render(renderField)}
          </FormField>
        );
      }}
    />
  );
}
