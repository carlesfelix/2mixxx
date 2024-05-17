import {
  type ReferenceElement,
  computePosition,
  type Middleware,
  flip,
  shift,
  limitShift,
  size
} from '@floating-ui/dom'
import { type PopoverOptions } from './types'

export function updatePosition (
  referenceEl: ReferenceElement,
  floatingEl: HTMLElement,
  options: Partial<PopoverOptions> = {}
): void {
  const { placement, strategy, fillMinWidth, fillWidth, preventCollisions } = options
  const middleware: Middleware[] = []
  if (preventCollisions) {
    middleware.push(flip())
  }
  middleware.push(size({
    apply ({ rects, elements }) {
      if (fillMinWidth) {
        Object.assign(elements.floating.style, {
          minWidth: `${rects.reference.width}px`
        })
      }
      if (fillWidth) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`
        })
      }
    }
  }))
  if (preventCollisions) {
    middleware.push(shift({ limiter: limitShift() }))
  }
  computePosition(referenceEl, floatingEl, {
    placement,
    strategy,
    middleware
  }).then(({ x, y }) => {
    Object.assign(floatingEl.style, {
      left: `${x}px`,
      top: `${y}px`
    })
  }).catch(error => {
    window.console.error(error)
  })
}
