import { ReactNode } from "react";

export type SidebarStatus = 'opening' | 'closing' | 'opened' | 'closed';
export type SidebarProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};
