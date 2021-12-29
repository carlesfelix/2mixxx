import { ReactNode } from 'react';

type InputOption<InputOptionValue = string> = {
  label: ReactNode;
  value: InputOptionValue;
}

export default InputOption;
