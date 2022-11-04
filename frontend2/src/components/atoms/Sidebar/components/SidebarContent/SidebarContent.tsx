import { useFocusTrap } from "@/core/core-hooks";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { SidebarContentProps } from "../../types";
import "./SidebarContent.css";

export default function SidebarContent(props: SidebarContentProps) {
  const { children, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);
  useFocusTrap(ref);
  const rootClassName = classNames('SidebarContent', className);
  return (
    <div className={rootClassName} ref={ref} tabIndex={-1} role="complementary">
      {children}
    </div>
  );
}
