import { type ReactElement } from 'react'
import { type FieldsetProps } from './types'
import classNames from 'classnames'
import Title from '@/components/atoms/Title'
import './Fieldset.css'

export default function Fieldset (props: FieldsetProps): ReactElement {
  const { children, legend, className } = props
  const rootClassName = classNames(
    'c-fieldset',
    { 'c-fieldset--with-legend': legend },
    className
  )

  return (
    <fieldset className={rootClassName}>
      {
        !!legend && (
          <legend className="c-fieldset__legend">
            <Title size="h5">{legend}</Title>
          </legend>
        )
      }
      {children}
    </fieldset>
  )
}
