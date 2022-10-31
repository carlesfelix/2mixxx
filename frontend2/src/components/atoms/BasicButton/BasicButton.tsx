import { usePointerElementRef } from "@/core/core-pointer-element";
import classNames from "classnames";
import { FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import { BasicButtonProps } from "./types";

function BasicButtonWithRef(
  props: BasicButtonProps,
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
    'BasicButton',
    '_button',
    '_button--basic',
    `_button--basic-${color}`,
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

const BasicButton = forwardRef(BasicButtonWithRef);
export default BasicButton;
