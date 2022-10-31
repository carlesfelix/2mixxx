import { ControlPanelLayoutProps } from "./types";
import "./ControlPanelLayout.css";
import IconButton from "@/components/atoms/IconButton";
import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg';

export default function ControlPanelLayout(props: ControlPanelLayoutProps) {
  const { children } = props;
  return (
    <div className="ControlPanelLayout">
      <div className="ControlPanelLayout__menu-container">
        <div className="ControlPanelLayout__menu-header">
          <IconButton className="ControlPanelLayout__menu-btn" size="lg">
            <MenuIcon />
          </IconButton>
          <div className="ControlPanelLayout__title-container">
            <h3 className="_text _text--h3 ControlPanelLayout__title">2MIXX</h3>
          </div>
        </div>
        <div className="ControlPanelLayout__menu-content">
          Menu content
        </div>
      </div>
      <div className="ControlPanelLayout__main-container">
        <nav className="ControlPanelLayout__navigation-bar">
          nav here
        </nav>
        <div className="ControlPanelLayout__page-container">
          {children}
        </div>
      </div>
    </div>
  );
}
