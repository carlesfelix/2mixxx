import MainMenuNavLink from '@/components/atoms/MainMenuNavLink'
import classNames from 'classnames'
import { ReactElement } from 'react'
import './MainMenuLinks.css'
import { MainMenuLinksProps } from './types'

export default function MainMenuLinks (
  props: MainMenuLinksProps
): ReactElement {
  const { linkItems, className, itemOnKeyDown } = props
  const rootClassName = classNames('MainMenuLinks', className)
  return (
    <ul className={rootClassName}>
      {
        linkItems.map(({ icon, label, to }, iLinkItem) => (
          <li key={`link-item__${iLinkItem}`}>
            <MainMenuNavLink
              to={to}
              icon={icon}
              label={label}
              onKeyDown={itemOnKeyDown}
            />
          </li>
        ))
      }
    </ul>
  )
}
