import { ReactNode } from "react";

export type FormGroupProps = {
  disabled?: boolean;
  legend?: ReactNode;
  children: ReactNode;
  className?: string;
};
