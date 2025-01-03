import { MAIN_MENU_LINKS } from '@/constants/links'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import MainMenuLinks from '../MainMenuLinks'
import { type DesktopMainMenuProps } from './types'
import './DesktopMainMenu.css'
import Title from '@/components/atoms/Title'

export default function DesktopMainMenu (
  props: DesktopMainMenuProps
): ReactElement {
  const { className } = props
  const rootClassName = classNames(
    'c-desktop-main-menu',
    'g-elevation',
    'g-elevation--1',
    className
  )

  return (
    <div className={rootClassName}>
      <div className="c-desktop-main-menu__menu-header">
        <div className="c-desktop-main-menu__title-container">
          <Title size='h3' as="h1" className="c-desktop-main-menu__title">DJnow</Title>
        </div>
      </div>
      <div className="c-desktop-main-menu__menu-content">
        <MainMenuLinks linkItems={MAIN_MENU_LINKS} />
      </div>
    </div>
  )
}
