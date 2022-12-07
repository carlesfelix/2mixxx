import { useEffect, useState } from 'react'

export default function createAppendChildElementHook (
  targetElementId: string,
  childElementTagName: keyof HTMLElementTagNameMap = 'div'
) {
  const targetElement = window.document.getElementById(targetElementId)

  function useAppendChildElement (): HTMLElement {
    const [el] = useState<HTMLElement>(() => {
      const initialEl = window.document.createElement(childElementTagName)
      return initialEl
    })
    useEffect(() => {
      if (!targetElement) {
        throw new Error(`Element with id "${targetElementId}" must be present in the DOM`)
      }
      targetElement.appendChild(el)
      return () => {
        targetElement.removeChild(el)
      }
    }, [el])
    return el
  }

  return useAppendChildElement
}
