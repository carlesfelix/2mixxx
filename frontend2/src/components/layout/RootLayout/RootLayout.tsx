import Spinner from '@/components/atoms/Spinner'
import { AsyncLayout } from '@/core/core-async-layout'
import { Routes } from '@/core/core-router'
import useUserType from '@/hooks/useUserType'
import mainRoutes from '@/routes/main.routes'
import { type ReactElement } from 'react'

export default function RootLayout (): ReactElement {
  const { inProgress, type } = useUserType()

  const progressContent = (
    <div className="g-layout g-layout--center">
      <Spinner color="primary" />
    </div>
  )

  return (
    <AsyncLayout
      inProgress={inProgress}
      inProgressContent={progressContent}
    >
      <Routes
        loadingElement={progressContent}
        routes={mainRoutes(type)}
      />
    </AsyncLayout>
  )
}
