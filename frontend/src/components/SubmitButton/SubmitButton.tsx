import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { forwardRef, MouseEventHandler, ReactNode } from "react";
import ThemeColor from "../../types/ThemeColor";
import ThemeSize from "../../types/ThemeSize";
import './SubmitButton.scss';

type Props = {
  color?: ThemeColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
  inProgress?: boolean;
  className?: string;
  form?: string;
  size?: ThemeSize;
};

const SubmitButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    color, onClick, children, disabled,
    className, inProgress, form, size
  } = props;
  const buttonClassName = classNames(
    'SubmitButton',
    'btn',
    {
      [`btn-${size}`]: size,
      [`btn-${color}`]: color
    },
    className
  );
  return (
    <button
      type="submit"
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || inProgress}
      form={form}
      ref={ref}
    >
      {
        inProgress && (
          <span>
            <FontAwesomeIcon icon={faCircleNotch} spin />
          </span>
        )
      }
      <span className="SubmitButton__content">
        {children}
      </span>
    </button>
  );
});

export default SubmitButton;
