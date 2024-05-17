import classNames from 'classnames'
import { type ForwardedRef, forwardRef, type ReactElement } from 'react'
import { type SidebarContentProps } from '../../types'
import './SidebarContent.css'

function SidebarContentWithRef (
  props: SidebarContentProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const { children, className } = props

  const rootClassName = classNames('c-sidebar-content', className)

  return (
    <div className={rootClassName} ref={ref} role="complementary">
      {children}
    </div>
  )
}

const SidebarContent = forwardRef(SidebarContentWithRef)
export default SidebarContent
