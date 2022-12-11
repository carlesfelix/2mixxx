import BasicButton from '@/components/atoms/BasicButton'
import useOAuth2 from '@/core/core-oauth2/hooks/useOAuth2'

export default function LoginPage () {
  const { loginWithRedirect } = useOAuth2()

  function clickHandler (): void {
    loginWithRedirect().then(() => {
      console.log('login success')
    }).catch(() => {
      console.log('login error')
    })
  }

  return (
    <div className="LoginPage">
      <BasicButton onClick={clickHandler}>
        Login
      </BasicButton>
    </div>
  )
}
