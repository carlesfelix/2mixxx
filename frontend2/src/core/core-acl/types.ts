import { ReactNode } from "react";

export type AclContextValue = {
  permissions: string[];
  hasSomePermission: (permissions: string[]) => boolean;
  addPermissions: (permissions: string[]) => void;
  removePermissions: (permissions: string[]) => void;
  dataItemsFilter: <DataItem extends { permissions?: string[] }>(dataItems: DataItem[]) => DataItem[];
};

export type AclProviderProps = {
  children: ReactNode;
  initialPermissions?: string[];
};

export type AclProps = {
  children: ReactNode;
  fallback?: ReactNode;
  permissions: string[];
};
