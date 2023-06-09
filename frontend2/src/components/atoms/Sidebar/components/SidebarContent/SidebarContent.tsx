import { useInternalRef } from '@/core/core-hooks'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement, useEffect } from 'react'
import { SidebarContentProps } from '../../types'
import './SidebarContent.css'

function SidebarContentWithRef (
  props: SidebarContentProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const { children, className } = props
  const [refCallback, internalRef] = useInternalRef(ref)

  useEffect(() => {
    internalRef.current?.focus()
  }, [internalRef])

  const rootClassName = classNames('SidebarContent', className)

  return (
    <div className={rootClassName} ref={refCallback} tabIndex={-1} role="complementary">
      {children}
    </div>
  )
}

const SidebarContent = forwardRef(SidebarContentWithRef)
export default SidebarContent
