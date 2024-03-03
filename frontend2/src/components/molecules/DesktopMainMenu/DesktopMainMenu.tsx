import { MAIN_MENU_LINKS } from '@/constants/links'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import MainMenuLinks from '../MainMenuLinks'
import './DesktopMainMenu.css'
import { type DesktopMainMenuProps } from './types'

export default function DesktopMainMenu (
  props: DesktopMainMenuProps
): ReactElement {
  const { className } = props
  const rootClassName = classNames('c-desktop-main-menu', className)

  return (
    <div className={rootClassName} tabIndex={0}>
      <div className="c-desktop-main-menu__menu-header">
        <div className="c-desktop-main-menu__title-container">
          <h3 className="g-text g-text--h3 c-desktop-main-menu__title">DJnow</h3>
        </div>
      </div>
      <div className="c-desktop-main-menu__menu-content">
        <MainMenuLinks linkItems={MAIN_MENU_LINKS} />
      </div>
    </div>
  )
}
