import { RefObject } from 'react'

export function hasChildren (elementRef: RefObject<Element>): boolean {
  return !!elementRef.current?.querySelector('* [data-focus-with-keyboard="true"]')
}
