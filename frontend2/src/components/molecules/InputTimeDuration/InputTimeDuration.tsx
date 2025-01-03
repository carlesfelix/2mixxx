import { type ForwardedRef, forwardRef, type ReactNode } from 'react'
import { type InputTimeDurationProps } from './types'
import classNames from 'classnames'
import './InputTimeDuration.css'
import Text from '@/components/atoms/Text'
import InputNumber from '@/components/atoms/InputNumber'
import { type FormatTimePrecision, getFormatTime, getMillisecondsFromFormatTime } from '@/core/core-date'

function InputTimeDurationWithRef (
  props: InputTimeDurationProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactNode {
  const { onChange, precisions, value, id, className, negative } = props
  const rootClassName = classNames('c-input-time-duration', className)
  const formattedTime = getFormatTime(window.Math.abs(value), precisions)

  function changeHandler (nextValue: number, precision: FormatTimePrecision): void {
    const nextValueMs = getMillisecondsFromFormatTime({
      ...formattedTime,
      [precision]: nextValue
    })
    if (nextValueMs >= 0) {
      onChange(nextValueMs * (negative ? -1 : 1))
    }
  }

  return (
    <div className={rootClassName}>
      {
        precisions.map((precision, iPrecision) => (
          <div className='c-input-time-duration__layer' key={precision}>
            <InputNumber
              className='c-input-time-duration__partial-input'
              onChange={nextValue => changeHandler(nextValue, precision)}
              value={formattedTime[precision]}
              id={iPrecision ? undefined : id}
              ref={iPrecision ? undefined : ref}
            />
            <Text size="extra-small" weight='semi-bold'>{precision}</Text>
          </div>
        ))
      }
    </div>
  )
}

const InputTimeDuration = forwardRef(InputTimeDurationWithRef)

export default InputTimeDuration
