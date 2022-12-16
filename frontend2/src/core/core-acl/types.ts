import { ReactNode } from 'react'

export interface AclContextValue {
  permissions: string[]
  hasSomePermission: (permissions: string[]) => boolean
  addPermissions: (permissions: string[]) => void
  removePermissions: (permissions: string[]) => void
  dataItemsFilter: <DataItem extends { permissions?: string[] }>(dataItems: DataItem[]) => DataItem[]
}

export interface AclProviderProps {
  children: ReactNode
  initialPermissions?: string[]
}

export interface AclProps {
  children: ReactNode
  fallback?: ReactNode
  permissions: string[]
}
