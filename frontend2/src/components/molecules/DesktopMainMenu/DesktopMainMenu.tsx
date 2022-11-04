import classNames from "classnames";
import "./DesktopMainMenu.css";
import { DesktopMainMenuProps } from "./types";

export default function DesktopMainMenu(props: DesktopMainMenuProps) {
  const { className } = props;
  const rootClassName = classNames('DesktopMainMenu', className);

  return (
    <div className={rootClassName}>
      <div className="DesktopMainMenu__menu-header">
        <div className="DesktopMainMenu__title-container">
          <h3 className="_text _text--h3 DesktopMainMenu__title">2MIXX</h3>
        </div>
      </div>
      <div className="DesktopMainMenu__menu-content">
        Links here desktop
      </div>
    </div>
  );
}
