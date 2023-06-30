import BasicButton from '@/components/atoms/BasicButton'
import OutlinedButton from '@/components/atoms/OutlinedButton'
import { FocusWithKeyboard } from '@/core/core-keyboard-accessibility'
import { ReactElement, useRef } from 'react'

export default function NotFoundPage (): ReactElement {
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="NotFoundPage">
      NotFoundPage
      <button autoFocus>aaaa</button>
      <FocusWithKeyboard disabled>
        <div>
          Group 1
          <BasicButton color="primary">Primary basic</BasicButton>
          <BasicButton color="secondary">Secondary basic</BasicButton>
          <OutlinedButton color="primary">Outlined primary</OutlinedButton>
          <OutlinedButton color="secondary">Outlined secondary</OutlinedButton>
        </div>
      </FocusWithKeyboard>
      <FocusWithKeyboard disabled>
        <div style={{ marginTop: 32 }}>
          Group 2
          <BasicButton ref={btnRef} color="primary">Primary basic 1</BasicButton>
          <BasicButton color="secondary">Secondary basic</BasicButton>
          <OutlinedButton color="primary">Outlined primary</OutlinedButton>
          <OutlinedButton color="secondary">Outlined secondary</OutlinedButton>
        </div>
      </FocusWithKeyboard>
    </div>
  )
}
