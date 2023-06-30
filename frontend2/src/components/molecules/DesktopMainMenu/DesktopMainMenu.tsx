import { MAIN_MENU_LINKS } from '@/constants/links'
import classNames from 'classnames'
import { ReactElement } from 'react'
import MainMenuLinks from '../MainMenuLinks'
import './DesktopMainMenu.css'
import { DesktopMainMenuProps } from './types'

export default function DesktopMainMenu (
  props: DesktopMainMenuProps
): ReactElement {
  const { className } = props
  const rootClassName = classNames('DesktopMainMenu', className)

  return (
    <div className={rootClassName} tabIndex={0}>
      <div className="DesktopMainMenu__menu-header">
        <div className="DesktopMainMenu__title-container">
          <h3 className="_text _text--h3 DesktopMainMenu__title">2MIXX</h3>
        </div>
      </div>
      <div className="DesktopMainMenu__menu-content">
        <MainMenuLinks linkItems={MAIN_MENU_LINKS} />
      </div>
    </div>
  )
}
