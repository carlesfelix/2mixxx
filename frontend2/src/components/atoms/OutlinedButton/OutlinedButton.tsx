import { usePointerElementRef } from "@/core/core-pointer-element";
import classNames from "classnames";
import { FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import { OutlinedButtonProps } from "./types";

function OutlinedButtonWithRef(
  props: OutlinedButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const {
    children,
    className,
    color = 'current',
    size = 'md',
    onClick
  } = props;
  const pointerElementRef = usePointerElementRef();
  const [ isHighlighted, setIsHighlighted ] = useState<boolean>(false);

  const rootClassName = classNames(
    'OutlinedButton',
    '_button',
    '_button--outlined',
    `_button--outlined-${color}`,
    `_button--${size}`,
    { '_button--highlighted': isHighlighted },
    className
  );

  function focusHandler(event: FocusEvent): void {
    if (event.target !== pointerElementRef.current) {
      setIsHighlighted(true);
    }
  }

  function blurHander(): void {
    setIsHighlighted(false);
  }

  return (
    <button
      onClick={onClick}
      onFocus={focusHandler}
      onBlur={blurHander}
      className={rootClassName}
      ref={ref}
    >
      {children}
    </button>
  );
}

const OutlinedButton = forwardRef(OutlinedButtonWithRef);
export default OutlinedButton;
