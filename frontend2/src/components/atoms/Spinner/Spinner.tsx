import classNames from "classnames";
import "./Spinner.css";
import { SpinnerProps } from "./types";

export default function Spinner(props: SpinnerProps) {
  const { color = 'current', className } = props;
  const rootClassName = classNames(
    'Spinner',
    `Spinner--${color}`,
    className
  )
  return (
    <div className={rootClassName}>
      <div className="Spinner__ring" />
      <div className="Spinner__ring" />
      <div className="Spinner__ring" />
      <div className="Spinner__ring" />
    </div>
  )
}
