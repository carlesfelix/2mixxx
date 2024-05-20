import MenuButtonItem from '@/components/atoms/MenuButtonItem'
import MenuLinkItem from '@/components/atoms/MenuLinkItem'
import {
  type MouseEventHandler,
  type ReactElement
} from 'react'
import { type ButtonMenuItem, type LinkMenuItem, type MenuItemsProps } from './types'
import './MenuItems.css'

export default function MenuItems (props: MenuItemsProps): ReactElement {
  const { items, onClickItem } = props
  function clickButtonItemHandler (
    item: ButtonMenuItem
  ): MouseEventHandler<HTMLButtonElement> {
    return event => {
      item.onClick && item.onClick(event)
      onClickItem(item, event)
    }
  }

  function clickLinkItemHandler (
    item: LinkMenuItem
  ): MouseEventHandler<HTMLAnchorElement> {
    return event => {
      onClickItem(item, event)
    }
  }

  return (
    <ul className="c-menu-items">
      {
        items.map((item, iItem) => (
          <li className="c-menu-items__item" key={`MenuItem__${iItem}`}>
            {
              item.type === 'button'
                ? (
                <MenuButtonItem
                  onClick={clickButtonItemHandler(item)}
                  className="c-menu-items__item"
                >
                  {item.icon}
                  <span>
                    {item.label}
                  </span>
                </MenuButtonItem>
                  )
                : (
                <MenuLinkItem
                  onClick={clickLinkItemHandler(item)}
                  to={item.to}
                  className="c-menu-items__item"
                >
                  {item.icon}
                  <span>
                    {item.label}
                  </span>
                </MenuLinkItem>
                  )
            }

          </li>
        ))
      }
    </ul>
  )
}
