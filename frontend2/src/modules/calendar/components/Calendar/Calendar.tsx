import { useLanguage } from '@/core/core-i18n'
import { type MouseEvent, useState, type ReactElement, useRef } from 'react'
import CalendarLib, { type OnArgs } from 'react-calendar'
import { type CalendarProps } from './types'
import { type Value, type View } from 'react-calendar/dist/cjs/shared/types'
import classNames from 'classnames'
import useFocusCalendar from '../../hooks/useFocusCalendar'
import { getDaysOfMonth } from '@/core/core-date'
import './Calendar.css'
import { tileIsDisabled } from './helpers'

// TODO: Refactor
export default function Calendar (props: CalendarProps): ReactElement {
  const {
    initialActiveStartDate,
    value,
    onChange,
    className,
    range,
    max,
    min
  } = props
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
    if (
      viewChangeData.action === 'drillDown' &&
      viewChangeData.activeStartDate &&
      tileIsDisabled({
        date: viewChangeData.activeStartDate,
        view,
        max,
        min
      })
    ) {
      return
    }
    setView(viewChangeData.view)
  }
  function clickDayHandler (
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {
    setActiveStartDate(date)
  }

  function changeHandler (nextValue: Value, event: React.MouseEvent<HTMLButtonElement>): void {
    if (!event.currentTarget.classList.contains('tile-disabled')) {
      onChange(nextValue)
    }
  }

  function tileClassName (date: Date, tileView: View): string {
    return tileIsDisabled({
      date,
      view: tileView,
      max,
      min
    })
      ? 'tile-disabled'
      : ''
  }
  const rootClassName = classNames('c-calendar', 'g-overlay', className)
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
      tileClassName={({ date, view: tileView }) => tileClassName(date, tileView)}
      showNeighboringMonth={false}
      onClickDay={clickDayHandler}
      onViewChange={viewChangeHandler}
      value={value}
      onChange={changeHandler}
    />
  )
}
