import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg';
import IconButton from "@/components/atoms/IconButton";
import DesktopMainMenu from '@/components/molecules/DesktopMainMenu';
import MobileMainMenuSidebar from "@/components/molecules/MobileMainMenuSidebar";
import { useState } from "react";
import "./ControlPanelLayout.css";
import { ControlPanelLayoutProps } from "./types";

export default function ControlPanelLayout(props: ControlPanelLayoutProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleBurgerButtonHandler(): void {
    setIsOpen(old => !old);
  }

  return (
    <div className="ControlPanelLayout">
      <MobileMainMenuSidebar
        className="ControlPanelLayout__mobile-menu"
        isOpen={isOpen}
        onClickBurgerButton={toggleBurgerButtonHandler}
      />
      <DesktopMainMenu className="ControlPanelLayout__desktop-menu" />
      <div className="ControlPanelLayout__main-container">
        <nav className="ControlPanelLayout__navigation-bar">
          <IconButton onClick={toggleBurgerButtonHandler}>
            <MenuIcon />
          </IconButton>
        </nav>
        <div className="ControlPanelLayout__page-container">
          {children}
        </div>
      </div>
    </div>
  );
}
