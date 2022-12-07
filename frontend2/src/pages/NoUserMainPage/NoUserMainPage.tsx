import Spinner from '@/components/atoms/Spinner'
import { Routes } from '@/core/core-router'
import noUserMainRoutes from '@/routes/no-user-main.routes'

export default function NoUserMainPage () {
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
