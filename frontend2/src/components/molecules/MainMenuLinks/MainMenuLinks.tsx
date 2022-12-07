import MainMenuNavLink from '@/components/atoms/MainMenuNavLink'
import classNames from 'classnames'
import './MainMenuLinks.css'
import { MainMenuLinksProps } from './types'

export default function MainMenuLinks (props: MainMenuLinksProps) {
  const { linkItems, className } = props
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
            />
          </li>
        ))
      }
    </ul>
  )
}
