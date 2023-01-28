import MenuButtonItem from '@/components/atoms/MenuButtonItem'
import MenuLinkItem from '@/components/atoms/MenuLinkItem'
import {
  MouseEventHandler,
  ReactElement,
  useEffect, useState
} from 'react'
import { ButtonMenuItem, LinkMenuItem, MenuItemsProps } from './types'
import './MenuItems.css'
import { useFocusTrap } from '@/core/core-hooks'

export default function MenuItems (props: MenuItemsProps): ReactElement {
  const { items, onClickItem } = props
  const [ref, setRef] = useState<HTMLUListElement | null>(null)
  useFocusTrap(ref)
  useEffect(() => {
    ref?.focus()
  }, [ref])

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
    <ul className="MenuItems" ref={setRef} tabIndex={-1}>
      {
        items.map((item, iItem) => (
          <li className="MenuItems__item" key={`MenuItem__${iItem}`}>
            {
              item.type === 'button'
                ? (
                <MenuButtonItem
                  onClick={clickButtonItemHandler(item)}
                  className="MenuItems__item"
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
                  className="MenuItems__item"
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
