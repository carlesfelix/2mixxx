import classNames from 'classnames';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import AsyncLayout from '../../../AsyncLayout';
import Checkbox from '../Checkbox';
import './MultiselectBox.scss';

export type MultiselectBoxExtraProps<Item = any> = {
  labelProp: keyof Item & string;
  valueProp: keyof Item;
  labelPosition?: 'left' | 'right';
  items: Item[];
  onChecked?: (item: Item, checked: boolean) => void;
  inProgress?: boolean;
  error?: Error | null | boolean;
  errorMessage?: string;
  itemClassName?: string;
};
type MultiselectBoxProps<Item> = ControlledInputProps<any[], MultiselectBoxExtraProps<Item>>;
export default function MultiselectBox<Item = any>(props: MultiselectBoxProps<Item>) {
  const {
    extraProps, onChange, className = '',
    onBlur, value
  } = props;
  const {
    items, labelProp, valueProp,
    labelPosition, onChecked,
    inProgress, error,
    errorMessage, itemClassName = ''
  } = extraProps;
  
  function blurHandler(): void {
    onBlur && onBlur();
  }
  function changeHandler(item: Item): (checked: boolean) => void {
    return checked => {
      onChecked && onChecked(item, checked);
      if (checked) {
        onChange([ ...value, item[valueProp] ]);
      } else {
        onChange(value.filter(each => each !== item[valueProp]));
      }
    };
  }
  const multiselectBoxClassName = classNames(
    'MultiselectBox', className
  );
  const checkboxClassName = classNames(
    'checkbox-option', itemClassName
  );
  return (
    <div className={multiselectBoxClassName} onBlur={blurHandler}>
      <AsyncLayout
        inProgress={inProgress}
        error={error}
        errorMessage={errorMessage}
      >
        {
          items.map((item, iItem) => (
            <Checkbox
              key={iItem}
              extraProps={{
                label: item[labelProp],
                labelPosition
              }}
              onChange={changeHandler(item)}
              value={value.includes(item[valueProp])}
              className={checkboxClassName}
            />
          ))
        }
      </AsyncLayout>
    </div>
  );
}
