import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg';
import IconButton from "@/components/atoms/IconButton";
import classNames from "classnames";
import { MobileMainMenuProps } from "../../types";
import "./MobileMainMenu.css";

export default function MobileMainMenu(props: MobileMainMenuProps) {
  const { className, onClickBurgerButton } = props;
  const rootClassName = classNames('MobileMainMenu', className);

  return (
    <div className={rootClassName}>
      <div className="MobileMainMenu__menu-header">
        <IconButton className="MobileMainMenu__menu-btn" onClick={onClickBurgerButton}>
          <MenuIcon />
        </IconButton>
        <div className="MobileMainMenu__title-container">
          <h3 className="_text _text--h3 MobileMainMenu__title">2MIXX</h3>
        </div>
      </div>
      <div className="MobileMainMenu__menu-content">
        Links here
      </div>
    </div>
  );
}