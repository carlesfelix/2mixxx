import { ReactElement } from 'react'
import { AsyncLayoutProps } from './types'

export function AsyncLayout (
  props: AsyncLayoutProps
): ReactElement {
  const {
    children,
    error,
    errorContent,
    inProgress,
    inProgressContent
  } = props

  if (inProgress) {
    return <>{inProgressContent}</>
  }

  if (error) {
    return <>{errorContent}</>
  }

  return <>{children}</>
}
