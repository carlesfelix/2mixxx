import { useLanguage } from '@/core/core-i18n'
import { type MouseEvent, useState, type ReactElement, useRef } from 'react'
import CalendarLib, { type OnArgs } from 'react-calendar'
import { type CalendarProps } from './types'
import { type Value, type View } from 'react-calendar/dist/cjs/shared/types'
import classNames from 'classnames'
import useFocusCalendar from '../../hooks/useFocusCalendar'
import { getDaysOfMonth } from '@/core/core-date'
import './Calendar.css'

// TODO: Refactor
export default function Calendar (props: CalendarProps): ReactElement {
  const { initialActiveStartDate, value, onChange, className, range } = props
  const [calendarElement, setCalendarElement] = useState<HTMLDivElement | null>(null)
  const [view, setView] = useState<View>('month')
  const [activeStartDate, setActiveStartDate] = useState<Date>(() => (value instanceof Array ? value?.[0] : value) ?? (initialActiveStartDate ?? new Date()))
  const locale = useLanguage()
  const calendarRef = useRef(null)
  useFocusCalendar({
    container: calendarElement,
    activeStartDate,
    view,
    onActiveStartDateChange: nextActiveStartDate => {
      setActiveStartDate(nextActiveStartDate)
    }
  })

  function activeStartDateChangeHandler (activeStartDateData: OnArgs): void {
    setActiveStartDate(oldActiveStartDate => {
      if (!activeStartDateData.activeStartDate) {
        return oldActiveStartDate
      }
      const nextActiveStartDate = new Date(oldActiveStartDate)
      const daysOfMonthActive = getDaysOfMonth(activeStartDateData.activeStartDate)
      const dayActive = oldActiveStartDate.getDate()
      const day = daysOfMonthActive < dayActive ? daysOfMonthActive : dayActive
      nextActiveStartDate.setDate(day)
      if (activeStartDateData.view === 'month') {
        nextActiveStartDate.setMonth(activeStartDateData.activeStartDate.getMonth())
        nextActiveStartDate.setFullYear(activeStartDateData.activeStartDate.getFullYear())
        return nextActiveStartDate
      }
      nextActiveStartDate.setFullYear(activeStartDateData.activeStartDate.getFullYear())
      return nextActiveStartDate
    })
  }

  function viewChangeHandler (viewChangeData: OnArgs): void {
    setView(viewChangeData.view)
  }
  function clickDayHandler (
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {
    setActiveStartDate(date)
  }

  function changeHandler (nextValue: Value): void {
    onChange(nextValue)
  }

  const rootClassName = classNames('c-calendar', className)
  return (
    <CalendarLib
      selectRange={range}
      ref={calendarRef}
      className={rootClassName}
      inputRef={setCalendarElement}
      locale={locale}
      onActiveStartDateChange={activeStartDateChangeHandler}
      activeStartDate={activeStartDate}
      view={view}
      showNeighboringMonth={false}
      onClickDay={clickDayHandler}
      onViewChange={viewChangeHandler}
      value={value}
      onChange={changeHandler}
    />
  )
}
