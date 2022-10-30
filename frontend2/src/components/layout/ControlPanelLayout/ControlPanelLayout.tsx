import { ControlPanelLayoutProps } from "./types";
import "./ControlPanelLayout.css";
import OutlinedButton from "@/components/atoms/OutlinedButton";

export default function ControlPanelLayout(props: ControlPanelLayoutProps) {
  const { children } = props;
  return (
    <div className="ControlPanelLayout">
      <div className="ControlPanelLayout__menu-container">
        
        <div className="a">
          
        </div>
        <div className="b">
          Menu container 2
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
