import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement, useEffect, useRef } from 'react'
import { SidebarContentProps } from '../../types'
import './SidebarContent.css'

function SidebarContentWithRef (
  props: SidebarContentProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const { children, className } = props
  const internalRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    internalRef.current?.focus()
  }, [ref])

  const rootClassName = classNames('SidebarContent', className)

  function refCallback (element: HTMLDivElement): void {
    internalRef.current = element
    if (typeof ref === 'function') {
      ref(element)
    } else if (ref !== null) {
      ref.current = element
    }
  }
  return (
    <div className={rootClassName} ref={refCallback} tabIndex={-1} role="complementary">
      {children}
    </div>
  )
}

const SidebarContent = forwardRef(SidebarContentWithRef)
export default SidebarContent
