/**
 *
 * @param eventTarget Event target
 * @param insideElements Elements considered as the inside place
 * @returns True when the event target does not come from any inside element
 */
export function isEventTargetOutside (
  eventTarget: EventTarget | null,
  insideElements: Array<Element | null>
): boolean {
  return insideElements.every(insideElement => !insideElement?.contains(eventTarget as Node))
}

/**
 *
 * @param eventTarget Event target
 * @param insideElements Elements considered as the inside place
 * @returns True when the event target comes from some inside element
 */
export function isEventTargetInside (
  eventTarget: EventTarget | null,
  insideElements: Array<Element | null>
): boolean {
  return insideElements.some(insideElement => insideElement?.contains(eventTarget as Node))
}
