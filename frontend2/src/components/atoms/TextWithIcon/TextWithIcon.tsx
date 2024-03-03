import { type TextWithIconProps } from './types'
import './TextWithIcon.css'
import { type ReactElement } from 'react'

export default function TextWithIcon (props: TextWithIconProps): ReactElement {
  const { children, icon } = props
  return (
    <span className="c-text-with-icon">
      {icon}
      <span>{children}</span>
    </span>
  )
}
