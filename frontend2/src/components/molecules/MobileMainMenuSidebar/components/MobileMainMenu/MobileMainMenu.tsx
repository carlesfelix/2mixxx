import { ReactComponent as MenuIcon } from '@/assets/svg/Menu.svg'
import IconButton from '@/components/atoms/IconButton'
import MainMenuLinks from '@/components/molecules/MainMenuLinks'
import { MAIN_MENU_LINKS } from '@/constants/links'
import classNames from 'classnames'
import { MouseEvent, ReactElement } from 'react'
import { MobileMainMenuProps } from '../../types'
import './MobileMainMenu.css'

export default function MobileMainMenu (
  props: MobileMainMenuProps
): ReactElement {
  const { className, onClose, closeButtonRef } = props

  function clickHandler (event: MouseEvent<HTMLButtonElement>): void {
    onClose && onClose(event)
  }

  const rootClassName = classNames('c-mobile-main-menu', className)

  return (
    <div className={rootClassName}>
      <div className="c-mobile-main-menu__menu-header">
        <IconButton
          className="c-mobile-main-menu__menu-btn"
          onClick={clickHandler}
          size="lg"
          ref={closeButtonRef}
        >
          <MenuIcon />
        </IconButton>
        <div className="c-mobile-main-menu__title-container">
          <h3 className="g-text g-text--h3 c-mobile-main-menu__title">DJnow</h3>
        </div>
      </div>
      <div className="c-mobile-main-menu__menu-content">
        <MainMenuLinks linkItems={MAIN_MENU_LINKS} />
      </div>
    </div>
  )
}
