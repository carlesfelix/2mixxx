import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg';
import IconButton from "@/components/atoms/IconButton";
import MainMenuLinks from '@/components/molecules/MainMenuLinks';
import { MAIN_MENU_LINKS } from '@/constants/links';
import classNames from "classnames";
import { MobileMainMenuProps } from "../../types";
import "./MobileMainMenu.css";

export default function MobileMainMenu(props: MobileMainMenuProps) {
  const { className, onClickBurgerButton } = props;
  const rootClassName = classNames('MobileMainMenu', className);

  return (
    <div className={rootClassName}>
      <div className="MobileMainMenu__menu-header">
        <IconButton className="MobileMainMenu__menu-btn" onClick={onClickBurgerButton} size="lg">
          <MenuIcon />
        </IconButton>
        <div className="MobileMainMenu__title-container">
          <h3 className="_text _text--h3 MobileMainMenu__title">2MIXX</h3>
        </div>
      </div>
      <div className="MobileMainMenu__menu-content">
        <MainMenuLinks linkItems={MAIN_MENU_LINKS} />
      </div>
    </div>
  );
}