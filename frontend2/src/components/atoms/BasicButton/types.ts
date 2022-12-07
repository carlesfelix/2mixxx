import ButtonSize from '@/types/ButtonSize'
import ThemeColor from '@/types/ThemeColor'
import { MouseEventHandler, ReactNode } from 'react'

export type BasicButtonProps = {
  children: ReactNode;
  color?: ThemeColor;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSize;
};
