import { FocusContainer } from '@/core/core-focus'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import { type OverlayContainerProps } from './types'
import { useWindowEventListener } from '@/core/core-events'
import { matchSomeKeyboardKeyFilter } from '@/core/core-keyboard'
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
    dismissableKeyboardKeyFilters = [],
    dismissableMask = true,
    ...otherProps
  } = props

  useWindowEventListener('keydown', event => {
    if (matchSomeKeyboardKeyFilter(event, dismissableKeyboardKeyFilters)) {
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
    <div className={internalClassName} onClick={clickHandler}>
      <FocusContainer className={internalContentClassName} ref={setFloatingElement} {...otherProps}>
        {children}
      </FocusContainer>
    </div>
  )
}
