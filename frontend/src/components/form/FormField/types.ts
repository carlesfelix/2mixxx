import { ReactNode } from "react";

export type FormFieldProps = {
  label?: string;
  errorMessage?: string;
  invalid: boolean;
  children: ReactNode;
  className?: string;
  required?: boolean;
};
