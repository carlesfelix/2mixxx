import { useLanguage } from '@/core/core-i18n'
import { type MouseEvent, useState, type ReactElement, type ForwardedRef, forwardRef } from 'react'
import CalendarLib, { type OnArgs } from 'react-calendar'
import { type CalendarProps } from './types'
import { type Value, type View } from 'react-calendar/dist/cjs/shared/types'
import classNames from 'classnames'

function CalendarWithRef (
  props: CalendarProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const { initialActiveStartDate, value, onChange, className } = props
  const [view, setView] = useState<View>('month')
  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(() => initialActiveStartDate ?? new Date())
  const locale = useLanguage()

  function activeStartDateChangeHandler (activeStartDateData: OnArgs): void {
    setActiveStartDate(activeStartDateData.activeStartDate ?? undefined)
  }

  function viewChangeHandler (viewChangeData: OnArgs): void {
    setView(viewChangeData.view)
  }
  function clickDayHandler (
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {

  }
  function clickDecadeHandler (
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {
    setActiveStartDate(date)
  }
  function clickMonthHandler (
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {
    setActiveStartDate(date)
  }
  function clickWeekNumberHandler (
    weekNumber: number,
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {
    console.log('clickWeekNumberHandler', date, weekNumber)
  }
  function clickYearHandler (
    date: Date,
    event: MouseEvent<HTMLButtonElement>
  ): void {
    setActiveStartDate(date)
  }
  function drillDownHandler (drillDownData: OnArgs): void {
    console.log('drillDownHandler', drillDownData)
  }
  function drillUpHandler (drillUpData: OnArgs): void {
    console.log('drillUpHandler', drillUpData)
  }
  function changeHandler (nextValue: Value): void {
    onChange(nextValue)
  }

  const rootClassName = classNames('c-calendar', className)
  return (
    <CalendarLib
      className={rootClassName}
      ref={ref}
      locale={locale}
      onActiveStartDateChange={activeStartDateChangeHandler}
      activeStartDate={activeStartDate}
      view={view}
      showNeighboringMonth={false}
      onClickDay={clickDayHandler}
      onClickDecade={clickDecadeHandler}
      onClickMonth={clickMonthHandler}
      onClickWeekNumber={clickWeekNumberHandler}
      onClickYear={clickYearHandler}
      onDrillDown={drillDownHandler}
      onDrillUp={drillUpHandler}
      onViewChange={viewChangeHandler}
      value={value}
      onChange={changeHandler}
    />
  )
}

const Calendar = forwardRef(CalendarWithRef)

export default Calendar
