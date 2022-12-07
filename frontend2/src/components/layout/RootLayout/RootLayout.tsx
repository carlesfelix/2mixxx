import Spinner from '@/components/atoms/Spinner'
import { Routes } from '@/core/core-router'
import mainRoutes from '@/routes/main.routes'
import UserType from '@/types/UserType'

export default function RootLayout () {
  const userType: UserType = 'registered'
  return (
    <Routes
      loadingElement={
        <div className="_layout _layout--center">
          <Spinner color="primary" />
        </div>
      }
      routes={mainRoutes(userType)}
    />
  )
}
