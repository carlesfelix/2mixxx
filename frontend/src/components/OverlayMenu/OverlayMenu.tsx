import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import OptionItem from '../../types/OptionItem';
import Popover from '../Popover';
import './OverlayMenu.scss';

type Props = {
  items: OptionItem[];
  align?: 'center' | 'end' | 'start';
  children: ReactNode;
  buttonClassName?: string;
  minWidth?: string;
};

export default function OverlayMenu(props: Props) {
  const {
    items, align = 'end', children,
    buttonClassName = 'btn default-btn-menu', minWidth
  } = props;
  const [ open, setOpen ] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, [])
  function clickHandler(): void {
    setOpen(old => !old);
  }
  function clickOutsideHandler(): void {
    setOpen(false);
  }
  function selectItemHandler(selectedItem: OptionItem): MouseEventHandler<HTMLButtonElement> {
    return () => {
      setOpen(false);
      selectedItem.onSelected && selectedItem.onSelected();
    };
  }
  const content = (
    <div className="overlay-menu-content">
      <ul className="card card-secondary" style={{ minWidth }}>
        {
          items.map((item, iItem) => (
            <li key={iItem}>
              <button onClick={selectItemHandler(item)} className="btn" type="button">
                {item.label}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );

  return (
    <div className="OverlayMenu">
      <Popover
        open={open} onClickOutside={clickOutsideHandler}
        content={content} positions={['bottom', 'top']}
        align={align} containerClassName="OverlayMenu__content"
      >
        <button onClick={clickHandler} className={buttonClassName}>
          {children}
        </button>
      </Popover>
    </div>
  );
}
