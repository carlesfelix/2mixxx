import { AsyncLayoutProps } from './types'

export function AsyncLayout (props: AsyncLayoutProps) {
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
