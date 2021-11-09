import classNames from 'classnames';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import Checkbox from '../Checkbox';
import './MultiselectBox.scss';

export type MultiselectBoxExtraProps<Item = any> = {
  labelProp: keyof Item & string;
  valueProp: keyof Item;
  labelPosition?: 'left' | 'right';
  items: Item[];
  onChecked?: (item: Item, checked: boolean) => void;
};
type MultiselectBoxProps<Item> = ControlledInputProps<any[], MultiselectBoxExtraProps<Item>>;
export default function MultiselectBox<Item = any>(props: MultiselectBoxProps<Item>) {
  const {
    extraProps, onChange, className = '',
    onBlur, value
  } = props;
  const {
    items, labelProp, valueProp,
    labelPosition, onChecked
  } = extraProps;
  const multiselectBoxClassName = classNames('MultiselectBox', {
    [className]: !!className
  });
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
  return (
    <div className={multiselectBoxClassName} onBlur={blurHandler}>
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
            className="checkbox-option"
          />
        ))
      }
    </div>
  );
}
