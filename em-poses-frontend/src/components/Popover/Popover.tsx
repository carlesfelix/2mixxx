import { ReactElement } from 'react';
import { Popover as TinyPopover, PopoverAlign, PopoverPosition } from 'react-tiny-popover';

type Props = {
  open: boolean;
  content: ReactElement;
  children: ReactElement
  onClickOutside?: () => void;
  positions?: PopoverPosition[];
  align?: PopoverAlign;
  containerClassName?: string;
};
export default function Popover(props: Props) {
  const {
    open, content, children, onClickOutside, positions,
    align, containerClassName
  } = props;
  return (
    <TinyPopover
      isOpen={open}
      positions={positions}
      content={content}
      onClickOutside={onClickOutside}
      align={align}
      containerClassName={containerClassName}
    >
      {children}
    </TinyPopover>
  );
}
