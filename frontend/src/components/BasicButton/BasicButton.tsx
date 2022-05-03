import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { forwardRef, MouseEventHandler, ReactNode } from "react";
import ThemeColor from "../../types/ThemeColor";
import ThemeSize from "../../types/ThemeSize";
import './BasicButton.scss';

type Props = {
  color?: ThemeColor;
  size?: ThemeSize,
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  inProgress?: boolean;
};

const BasicButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    color, onClick, children, size,
    disabled, className, inProgress
  } = props;
  const buttonClassName = classNames(
    'BasicButton',
    'btn',
    {
      [`btn-${size}`]: size,
      [`btn-${color}`]: color
    },
    className
  );
  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {
        inProgress && (
          <span className="BasicButton__progress">
            <FontAwesomeIcon icon={faCircleNotch} spin />
          </span>
        )
      }
      <span className="BasicButton__content">
        {children}
      </span>
    </button>
  );
});

export default BasicButton;
