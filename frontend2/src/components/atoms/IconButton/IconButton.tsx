import { usePointerElementRef } from "@/core/core-pointer-element";
import classNames from "classnames";
import { FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import { IconButtonProps } from "./types";

function IconButtonWithRef(
  props: IconButtonProps,
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
    'IconButton',
    '_button',
    '_button--icon',
    `_button--icon-${color}`,
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

const IconButton = forwardRef(IconButtonWithRef);
export default IconButton;
