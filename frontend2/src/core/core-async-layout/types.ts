import { ReactNode } from 'react'

export type AsyncLayoutProps = {
  children: ReactNode;
  error?: Error | boolean;
  errorContent?: ReactNode;
  inProgress?: boolean;
  inProgressContent?: ReactNode;
};
