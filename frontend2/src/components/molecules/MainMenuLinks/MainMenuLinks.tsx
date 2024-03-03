import MainMenuNavLink from '@/components/atoms/MainMenuNavLink'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import './MainMenuLinks.css'
import { type MainMenuLinksProps } from './types'

export default function MainMenuLinks (
  props: MainMenuLinksProps
): ReactElement {
  const { linkItems, className } = props
  const rootClassName = classNames('c-main-menu-links', className)
  return (
    <ul className={rootClassName}>
      {
        linkItems.map(({ icon, label, to }, iLinkItem) => (
          <li key={`link-item__${iLinkItem}`}>
            <MainMenuNavLink
              to={to}
              icon={icon}
              label={label}
            />
          </li>
        ))
      }
    </ul>
  )
}
