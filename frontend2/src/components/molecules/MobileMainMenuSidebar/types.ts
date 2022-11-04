import { MouseEvent } from "react";

export type MobileMainMenuSidebarProps = {
  className?: string;
  onClickBurgerButton?: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
};

export type MobileMainMenuProps = {
  className?: string;
  onClickBurgerButton?: (event: MouseEvent<HTMLButtonElement>) => void;
};
