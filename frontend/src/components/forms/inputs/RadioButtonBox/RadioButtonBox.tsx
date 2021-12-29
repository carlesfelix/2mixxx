import classNames from 'classnames';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import InputOption from '../../../../types/InputOption';
import InputOptions from '../../../../types/InputOptions';
import RadioButton from '../RadioButton/RadioButton';

export type RadioButtonBoxExtraProps = {
  items: InputOptions<any>;
  radioButtonPosition?: 'left' | 'right';
  itemClassName?: string;
};
type RadioButtonBoxProps = ControlledInputProps<any, RadioButtonBoxExtraProps>;

export default function RadioButtonCards(props: RadioButtonBoxProps) {
  const {
    extraProps, onChange, value,
    className = '', onBlur
  } = props;
  const { items, radioButtonPosition, itemClassName = '' } = extraProps;
  const radioButtonBoxClassName = classNames('RadioButtonBox', {
    [className]: !!className
  });
  const radioButtonItemClassName = classNames('radio-button-item', {
    [itemClassName]: !!itemClassName
  });
  function changeHandler(item: InputOption): () => void {
    return () => {
      onChange(item.value);
    };
  }
  function blurHandler(): void {
    onBlur && onBlur();
  }
  return (
    <div className={radioButtonBoxClassName} onBlur={blurHandler}>
      {
        items.map((eachItem, iEachItem) => (
          <RadioButton
            key={iEachItem}
            className={radioButtonItemClassName}
            onChange={changeHandler(eachItem)}
            value={eachItem.value === value}
            extraProps={{
              label: eachItem.label,
              labelPosition: radioButtonPosition
            }}
          />
        ))
      }
    </div>
  );
}
