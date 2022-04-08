import BaseFieldProps from "./BaseFieldProps";

type FieldProps<Props extends object = {}> = Props & BaseFieldProps;

export default FieldProps;
