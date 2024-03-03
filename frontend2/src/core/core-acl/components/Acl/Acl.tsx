import { type ReactElement } from 'react'
import useAcl from '../../hooks/useAcl'
import { type AclProps } from '../../types'

export default function Acl (props: AclProps): ReactElement {
  const {
    children, permissions,
    fallback
  } = props
  const { hasSomePermission } = useAcl()
  return hasSomePermission(permissions)
    ? (
    <>{children}</>
      )
    : (
    <>{fallback}</>
      )
}
