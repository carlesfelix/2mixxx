import RenderFieldProps from "./RenderFieldProps";

type ControlledFieldProps<
  ExtraProps extends object = {}
> = ExtraProps & RenderFieldProps;

export default ControlledFieldProps;
