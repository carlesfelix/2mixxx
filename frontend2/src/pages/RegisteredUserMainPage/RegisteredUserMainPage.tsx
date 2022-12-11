import Spinner from '@/components/atoms/Spinner'
import ControlPanelLayout from '@/components/layout/ControlPanelLayout'
import { Routes } from '@/core/core-router'
import useRegisteredUserAuthorizationInterceptor from '@/hooks/useRegisteredUserAuthorizationInterceptor'
import registeredUserMainRoutes from '@/routes/registered-user-main.routes'

export default function RegisteredUserMainPage () {
  useRegisteredUserAuthorizationInterceptor()

  return (
    <ControlPanelLayout>
      <Routes
        loadingElement={
          <div className="_layout _layout--center">
            <Spinner color="primary" />
          </div>
        }
        routes={registeredUserMainRoutes()}
      />
    </ControlPanelLayout>
  )
}
