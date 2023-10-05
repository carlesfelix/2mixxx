import MenuButtonItem from '@/components/atoms/MenuButtonItem'
import MenuLinkItem from '@/components/atoms/MenuLinkItem'
import { ForwardedRef, forwardRef, MouseEventHandler, ReactElement, Ref, useImperativeHandle, useRef } from 'react'
import { ButtonMenuItem, LinkMenuItem, MenuItemsInstance, MenuItemsProps } from './types'
import './MenuItems.css'

function MenuItemsWithRef (
  props: MenuItemsProps,
  ref: ForwardedRef<MenuItemsInstance>
): ReactElement {
  const { items, onClickItem, focusIndex = 0 } = props
  const menuItemRefs = useRef<Record<number, HTMLElement | null>>({})

  useImperativeHandle(ref,
    () => ({
      focus () {
        const element = menuItemRefs.current[focusIndex]
        element?.focus()
      }
    }),
    [focusIndex])

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

  function menuButtonRefCallback (iButton: number): Ref<HTMLButtonElement> {
    return (element) => {
      menuItemRefs.current[iButton] = element
    }
  }

  function menuAnchorRefCallback (iAnchor: number): Ref<HTMLAnchorElement> {
    return (element) => {
      menuItemRefs.current[iAnchor] = element
    }
  }

  return (
    <ul className="MenuItems">
      {
        items.map((item, iItem) => (
          <li className="MenuItems__item" key={`MenuItem__${iItem}`}>
            {
              item.type === 'button'
                ? (
                <MenuButtonItem
                  onClick={clickButtonItemHandler(item)}
                  className="MenuItems__item"
                  ref={menuButtonRefCallback(iItem)}
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
                  ref={menuAnchorRefCallback(iItem)}
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

const MenuItems = forwardRef(MenuItemsWithRef)

export default MenuItems
