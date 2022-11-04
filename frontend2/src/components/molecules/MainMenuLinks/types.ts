import { ReactNode } from "react";

export type MainMenuLinkItem = {
  icon: ReactNode;
  label: string;
  to: string;
};

export type MainMenuLinksProps = {
  className?: string;
  linkItems: MainMenuLinkItem[];
};
