import Sidebar from '@/components/atoms/Sidebar';
import classNames from "classnames";
import MobileMainMenu from './components/MobileMainMenu';
import { MobileMainMenuSidebarProps } from "./types";
import "./MobileMainMenuSidebar.css";

export default function MobileMainMenuSidebar(props: MobileMainMenuSidebarProps) {
  const { className, onClickBurgerButton, isOpen } = props;
  const rootClassName = classNames('MobileMainMenuSidebar', className);
  return (
    <Sidebar className={rootClassName} isOpen={isOpen}>
      <MobileMainMenu
        onClickBurgerButton={onClickBurgerButton}
        className="MobileMainMenuSidebar__menu"
      />
    </Sidebar>
  );
}
