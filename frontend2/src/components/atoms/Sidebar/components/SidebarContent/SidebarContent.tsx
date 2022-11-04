import { useFocusTrap } from "@/core/core-hooks";
import classNames from "classnames";
import { useRef } from "react";
import { SidebarContentProps } from "../../types";
import "./SidebarContent.css";

export default function SidebarContent(props: SidebarContentProps) {
  const { children, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref);
  const rootClassName = classNames('SidebarContent', className);
  return (
    <div className={rootClassName} ref={ref}>
      {children}
    </div>
  );
}
