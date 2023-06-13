import { useInternalRef } from '@/core/core-hooks'
import { useKeyboardAccessibility } from '@/core/core-keyboard-accessibility'
import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { BasicButtonProps } from './types'

function BasicButtonWithRef (
  props: BasicButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const {
    children,
    className,
    color = 'current',
    size = 'md',
    onClick
  } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const [refCallback, internalRef] = useInternalRef(ref)

  const rootClassName = classNames(
    'BasicButton',
    '_button',
    '_button--basic',
    `_button--basic-${color}`,
    `_button--${size}`,
    { '_button--highlighted': isHighlighted(internalRef) },
    className
  )

  return (
    <button
      onClick={onClick}
      className={rootClassName}
      ref={refCallback}
    >
      {children}
    </button>
  )
}

const BasicButton = forwardRef(BasicButtonWithRef)
export default BasicButton
