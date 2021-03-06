import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { forwardRef, MouseEventHandler, ReactNode } from "react";
import ThemeColor from "../../types/ThemeColor";
import ThemeSize from "../../types/ThemeSize";

type Props = {
  color?: ThemeColor;
  size?: ThemeSize,
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  inProgress?: boolean;
};

const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    color, onClick, children, size,
    disabled, className, inProgress
  } = props;
  const buttonClassName = classNames(
    'IconButton',
    'btn',
    {
      [`btn-${size}`]: size,
      [`btn-${color}`]: color
    },
    'btn-icon',
    className
  );
  
  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || inProgress}
      ref={ref}
    >
      {
        inProgress ? (
          <FontAwesomeIcon icon={faCircleNotch} spin className="_svg" />
        ) : (
          children
        )
      }
    </button>
  );
});

export default IconButton;
