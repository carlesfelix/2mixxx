import { useHTMLElementEventListener } from '@/core/core-events'
import { type FocusableElement, getFocusableElements, matchDefaultPrevKeyboardKeyFilter, matchDefaultNextKeyboardKeyFilter } from '@/core/core-focus'
import useFocusContext from '@/core/core-focus/hooks/useFocusContext'
import { KEY_CODES, matchKeyboardKeyFilter } from '@/core/core-keyboard'
import { getCalendarFocusConfig } from './utils'
import { useEffect, useRef } from 'react'
import { type UseFocusCalendarProps } from './types'
import { getDaysOfMonth } from '@/core/core-date'

// TODO: Refactor
// TODO: Try to avoid setTimeout on "onActiveStartDateChange" function call

export default function useFocusCalendar (props: UseFocusCalendarProps): void {
  const {
    container,
    activeStartDate,
    view,
    onActiveStartDateChange
  } = props
  const { onKeyDown } = useFocusContext()
  const lastActiveViewItemElementRef = useRef<FocusableElement | null>(null)
  const previousActiveHeaderElementRef = useRef<FocusableElement | undefined>()

  useEffect(() => {
    if (!container) {
      return
    }
    const {
      headerItems
    } = getCalendarFocusConfig(activeStartDate, view)
    function getFocusableElement (): FocusableElement | undefined {
      let offsetElement = activeStartDate.getDate() - 1
      if (view === 'year') {
        offsetElement = activeStartDate.getMonth()
      } else if (view === 'decade') {
        offsetElement = Math.max(((activeStartDate.getFullYear() - 1) % 10), 0)
      } else if (view === 'century') {
        offsetElement = Math.max((Math.ceil(activeStartDate.getFullYear() / 10) - 1) % 10, 0)
      }
      return focusableElements.at(headerItems + offsetElement)
    }
    const focusableElements = getFocusableElements(container)
    const focusableElement = getFocusableElement()
    lastActiveViewItemElementRef.current = focusableElement ?? null
    const previousActiveHeaderElement = previousActiveHeaderElementRef.current
    previousActiveHeaderElementRef.current = undefined
    if (previousActiveHeaderElement !== undefined) {
      if (window.document.body.contains(previousActiveHeaderElement) && previousActiveHeaderElement instanceof HTMLButtonElement && !previousActiveHeaderElement.disabled) {
        previousActiveHeaderElement.focus()
        return
      }
      focusableElements.at(0)?.focus()
      return
    }
    if (focusableElement) {
      focusableElement.focus()
    }
  }, [activeStartDate, view, container])

  useHTMLElementEventListener(container, 'click', event => {
    if (!container) {
      return
    }
    const focusableElements = getFocusableElements(container)
    const activeFocusableElementIndex = focusableElements.findIndex(focusableElement => focusableElement === window.document.activeElement)
    const {
      headerItems
    } = getCalendarFocusConfig(activeStartDate, view)

    if (activeFocusableElementIndex < headerItems) {
      previousActiveHeaderElementRef.current = focusableElements.at(activeFocusableElementIndex)
    }
  })

  useHTMLElementEventListener(container, 'keydown', event => {
    if (!container) {
      defaultOnKeyDown()
      return
    }
    const focusableElements = getFocusableElements(container)
    const activeFocusableElementIndex = focusableElements.findIndex(focusableElement => focusableElement === window.document.activeElement)
    const activeFocusableViewElementIndex = focusableElements.findIndex(focusableElement => focusableElement === lastActiveViewItemElementRef.current)
    if (activeFocusableElementIndex === -1) {
      defaultOnKeyDown()
      return
    }
    const {
      headerItems,
      columns,
      viewItems
    } = getCalendarFocusConfig(activeStartDate, view)

    function defaultOnKeyDown (): void {
      onKeyDown({ eventTarget: event.target, match: false, offset: 0 })
    }
    function notifyViewKeyDown (offset: number, activeElementIndex: number): void {
      const totalItems = headerItems + viewItems
      const nextIndex = activeElementIndex + offset
      const nextActiveStartDate = new Date(activeStartDate)
      if (nextIndex < headerItems) {
        if (view === 'month') {
          const nextMonth = activeStartDate.getMonth() - 1
          nextActiveStartDate.setMonth(nextMonth)
          nextActiveStartDate.setDate(getDaysOfMonth(nextActiveStartDate))
          if (nextActiveStartDate.getFullYear() > 0) {
            window.setTimeout(() => {
              onActiveStartDateChange(nextActiveStartDate)
            }, 0)
          }
        } else if (view === 'year') {
          const nextYear = activeStartDate.getFullYear() - 1
          nextActiveStartDate.setFullYear(nextYear)
          nextActiveStartDate.setMonth(11)
          if (nextActiveStartDate.getFullYear() > 0) {
            window.setTimeout(() => {
              onActiveStartDateChange(nextActiveStartDate)
            }, 0)
          }
        } else if (view === 'decade') {
          const nextYear = activeStartDate.getFullYear() - activeStartDate.getFullYear() % 10
          nextActiveStartDate.setFullYear(nextYear)
          const nextDaysOfMonth = getDaysOfMonth(nextActiveStartDate)
          const nextDay = activeStartDate.getDate()
          const day = nextDaysOfMonth < nextDay ? nextDaysOfMonth : nextDay
          nextActiveStartDate.setDate(day)
          if (nextActiveStartDate.getFullYear() > 0) {
            window.setTimeout(() => {
              onActiveStartDateChange(nextActiveStartDate)
            }, 0)
          }
        } else if (view === 'century') {
          const nextYear = activeStartDate.getFullYear() - activeStartDate.getFullYear() % 100
          nextActiveStartDate.setFullYear(nextYear)
          const nextDaysOfMonth = getDaysOfMonth(nextActiveStartDate)
          const nextDay = activeStartDate.getDate()
          const day = nextDaysOfMonth < nextDay ? nextDaysOfMonth : nextDay
          nextActiveStartDate.setDate(day)
          if (nextActiveStartDate.getFullYear() > 0) {
            window.setTimeout(() => {
              onActiveStartDateChange(nextActiveStartDate)
            }, 0)
          }
        }
        defaultOnKeyDown()
        return
      }
      if (nextIndex + 1 > totalItems) {
        if (view === 'month') {
          const nextMonth = activeStartDate.getMonth() + 1
          nextActiveStartDate.setMonth(nextMonth)
          nextActiveStartDate.setDate(1)
          window.setTimeout(() => {
            onActiveStartDateChange(nextActiveStartDate)
          }, 0)
        } else if (view === 'year') {
          const nextYear = activeStartDate.getFullYear() + 1
          nextActiveStartDate.setFullYear(nextYear)
          nextActiveStartDate.setMonth(0)
          window.setTimeout(() => {
            onActiveStartDateChange(nextActiveStartDate)
          }, 0)
        } else if (view === 'decade') {
          const nextYear = activeStartDate.getFullYear() + 10 - Math.max(((activeStartDate.getFullYear() - 1) % 10), 0)
          nextActiveStartDate.setFullYear(nextYear)
          nextActiveStartDate.setMonth(0)
          nextActiveStartDate.setDate(1)
          window.setTimeout(() => {
            onActiveStartDateChange(nextActiveStartDate)
          }, 0)
        } else if (view === 'century') {
          const nextYear = activeStartDate.getFullYear() + 100 - Math.max(((activeStartDate.getFullYear() - 1) % 100), 0)
          nextActiveStartDate.setFullYear(nextYear)
          nextActiveStartDate.setMonth(0)
          nextActiveStartDate.setDate(1)
          window.setTimeout(() => {
            onActiveStartDateChange(nextActiveStartDate)
          }, 0)
        }
        defaultOnKeyDown()
        return
      }
      if (view === 'month') {
        nextActiveStartDate.setDate(nextIndex - headerItems + 1)
        window.setTimeout(() => {
          onActiveStartDateChange(nextActiveStartDate)
        }, 0)
      } else if (view === 'year') {
        nextActiveStartDate.setMonth(nextIndex - headerItems)
        window.setTimeout(() => {
          onActiveStartDateChange(nextActiveStartDate)
        }, 0)
      } else if (view === 'decade') {
        nextActiveStartDate.setFullYear(activeStartDate.getFullYear() + offset)
        window.setTimeout(() => {
          onActiveStartDateChange(nextActiveStartDate)
        }, 0)
      } else if (view === 'century') {
        const aaa = activeStartDate.getFullYear() + offset * 10
        nextActiveStartDate.setFullYear(aaa)
        window.setTimeout(() => {
          onActiveStartDateChange(nextActiveStartDate)
        }, 0)
      }
      onKeyDown({ eventTarget: event.target, match: true, offset })
      lastActiveViewItemElementRef.current = focusableElements[nextIndex]
    }
    if (activeFocusableElementIndex < headerItems) {
      if (matchDefaultPrevKeyboardKeyFilter(event)) {
        onKeyDown({
          eventTarget: event.target,
          match: true,
          offset: activeFocusableElementIndex === 0 ? activeFocusableViewElementIndex : -1
        })
      } else if (matchDefaultNextKeyboardKeyFilter(event)) {
        onKeyDown({
          eventTarget: event.target,
          match: true,
          offset: activeFocusableElementIndex === headerItems - 1 ? -activeFocusableElementIndex + activeFocusableViewElementIndex : 1
        })
      } else {
        defaultOnKeyDown()
      }
      return
    }
    previousActiveHeaderElementRef.current = undefined
    if (matchKeyboardKeyFilter(event, { code: KEY_CODES.ArrowDown })) {
      notifyViewKeyDown(columns, activeFocusableElementIndex)
    } else if (matchKeyboardKeyFilter(event, { code: KEY_CODES.ArrowUp })) {
      notifyViewKeyDown(-columns, activeFocusableElementIndex)
    } else if (matchKeyboardKeyFilter(event, { code: KEY_CODES.ArrowRight })) {
      notifyViewKeyDown(1, activeFocusableElementIndex)
    } else if (matchKeyboardKeyFilter(event, { code: KEY_CODES.ArrowLeft })) {
      notifyViewKeyDown(-1, activeFocusableElementIndex)
    } else if (matchDefaultNextKeyboardKeyFilter(event)) {
      onKeyDown({ eventTarget: event.target, match: true, offset: -activeFocusableElementIndex })
    } else if (matchDefaultPrevKeyboardKeyFilter(event)) {
      onKeyDown({ eventTarget: event.target, match: true, offset: -activeFocusableElementIndex + headerItems - 1 })
    } else {
      defaultOnKeyDown()
    }
  })
}
