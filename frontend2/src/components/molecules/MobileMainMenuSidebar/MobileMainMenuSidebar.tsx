import Sidebar from '@/components/atoms/Sidebar'
import classNames from 'classnames'
import MobileMainMenu from './components/MobileMainMenu'
import { MobileMainMenuSidebarProps } from './types'
import './MobileMainMenuSidebar.css'
import { ReactElement } from 'react'

export default function MobileMainMenuSidebar (
  props: MobileMainMenuSidebarProps
): ReactElement {
  const { className, onClose, isOpen } = props
  const rootClassName = classNames('MobileMainMenuSidebar', className)
  return (
    <Sidebar className={rootClassName} isOpen={isOpen} onClose={onClose}>
      <MobileMainMenu
        onClose={onClose}
        className="MobileMainMenuSidebar__menu"
      />
    </Sidebar>
  )
}
