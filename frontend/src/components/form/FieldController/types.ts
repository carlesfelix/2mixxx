import { ReactElement } from "react";
import FieldProps from "../../../types/FieldProps";
import RenderFieldProps from "../../../types/RenderFieldProps";

export type FieldControllerProps = FieldProps<{
  render: (controlledFieldProps: RenderFieldProps) => ReactElement;
}>;
