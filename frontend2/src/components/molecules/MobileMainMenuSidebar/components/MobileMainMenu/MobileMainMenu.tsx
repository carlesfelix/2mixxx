import MenuIcon from '@/assets/svg/Menu.svg?react'
import IconButton from '@/components/atoms/IconButton'
import MainMenuLinks from '@/components/molecules/MainMenuLinks'
import { MAIN_MENU_LINKS } from '@/constants/links'
import classNames from 'classnames'
import { type MouseEvent, type ReactElement } from 'react'
import { type MobileMainMenuProps } from '../../types'
import './MobileMainMenu.css'
import Title from '@/components/atoms/Title'

export default function MobileMainMenu (
  props: MobileMainMenuProps
): ReactElement {
  const { className, onClose } = props

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
        >
          <MenuIcon />
        </IconButton>
        <div className="c-mobile-main-menu__title-container">
          <Title size="h3" as="h1" className="c-mobile-main-menu__title">DJnow</Title>
        </div>
      </div>
      <div className="c-mobile-main-menu__menu-content">
        <MainMenuLinks linkItems={MAIN_MENU_LINKS} />
      </div>
    </div>
  )
}
