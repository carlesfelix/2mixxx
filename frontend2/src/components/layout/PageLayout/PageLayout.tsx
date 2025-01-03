import { type ReactElement } from 'react'
import { type PageLayoutProps } from './types'
import classNames from 'classnames'
import Title from '@/components/atoms/Title'
import './PageLayout.css'

export default function PageLayout (props: PageLayoutProps): ReactElement {
  const { children, footer, className, title, centerContent } = props
  const baseClassName = classNames(
    'c-page-layout',
    { 'c-page-layout--center-content': centerContent },
    className
  )
  return (
    <div className={baseClassName}>
      <div className='c-page-layout__scroll-container'>
        {
          !!title && (
            <header className="c-page-layout__header">
              <div className="c-page-layout__header-title g-layout g-layout--page-content">
                <Title size="h2">
                  {title}
                </Title>
              </div>
            </header>
          )
        }
        <div className="c-page-layout__content">
          {children}
        </div>
      </div>
      {
        !!footer && (
          <footer className="c-page-layout__footer g-elevation g-elevation--2">
            {footer}
          </footer>
        )
      }
    </div>
  )
}
