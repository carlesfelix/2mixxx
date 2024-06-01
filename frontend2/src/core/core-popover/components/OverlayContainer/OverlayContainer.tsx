import { FocusContainer } from '@/core/core-focus'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import { type OverlayContainerProps } from './types'
import { useWindowEventListener } from '@/core/core-events'
import './OverlayContainer.css'

export default function OverlayContainer (props: OverlayContainerProps): ReactElement {
  const {
    onClose,
    onClick,
    children,
    setFloatingElement,
    contentClassName,
    className,
    touchUI = false,
    dismissableKeyboardCodes = [],
    dismissableMask = true,
    ...otherProps
  } = props

  useWindowEventListener('keydown', event => {
    if (dismissableKeyboardCodes.includes(event.code)) {
      onClose?.()
    }
  })

  function clickHandler (event: React.MouseEvent< HTMLDivElement>): void {
    onClick?.(event)
    if (dismissableMask && event.target === event.currentTarget) {
      onClose?.()
    }
  }
  const internalClassName = classNames(
    'c-overlay-container',
    { 'c-overlay-container--touch-ui': touchUI },
    className
  )
  const internalContentClassName = classNames('c-overlay-container__content', contentClassName)
  return (
    <FocusContainer className={internalClassName} onClick={clickHandler} {...otherProps}>
      <div className={internalContentClassName} ref={setFloatingElement}>
        {children}
      </div>
    </FocusContainer>
  )
}
