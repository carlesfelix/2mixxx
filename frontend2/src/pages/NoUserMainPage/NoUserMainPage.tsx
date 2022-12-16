import Spinner from '@/components/atoms/Spinner'
import { Routes } from '@/core/core-router'
import noUserMainRoutes from '@/routes/no-user-main.routes'
import { ReactElement } from 'react'

export default function NoUserMainPage (): ReactElement {
  return (
    <div className="NoUserMainPage">
      <Routes
        loadingElement={
          <div className="_layout _layout--center">
            <Spinner color="primary" />
          </div>
        }
        routes={noUserMainRoutes()}
      />
    </div>
  )
}
