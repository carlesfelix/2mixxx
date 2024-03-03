import Spinner from '@/components/atoms/Spinner'
import ControlPanelLayout from '@/components/layout/ControlPanelLayout'
import { Routes } from '@/core/core-router'
import useRegisteredUserAuthorizationInterceptor from '@/hooks/useRegisteredUserAuthorizationInterceptor'
import registeredUserMainRoutes from '@/routes/registered-user-main.routes'
import { type ReactElement } from 'react'

export default function RegisteredUserMainPage (): ReactElement {
  useRegisteredUserAuthorizationInterceptor()

  return (
    <ControlPanelLayout>
      <Routes
        loadingElement={
          <div className="g-layout g-layout--center">
            <Spinner color="primary" />
          </div>
        }
        routes={registeredUserMainRoutes()}
      />
    </ControlPanelLayout>
  )
}
