import { useForm } from 'react-hook-form';
import { roomCodeExists } from '../../api/rooms';
import ControlledInput from '../../components/forms/ControlledInput';
import LoginButton from '../../components/LoginButton';
import PageLayout from '../../components/PageLayout';
import { createRoomUserAction, useRoomUser } from '../../contexts/room-user';
import { useTranslation } from '../../services/i18n';
import { getRoomFormValidation } from './helpers';
import './HomePage.scss';

export default function HomePage() {
  const { t } = useTranslation();
  const { dispatch } = useRoomUser();
  const {
    control, handleSubmit, setError
  } = useForm<{ roomCode?: string }>({ mode: 'onChange' });
  const roomFormValidation = getRoomFormValidation(t);
  async function submitHandler(data: { roomCode: string }): Promise<void> {
    const { roomCode } = data;
    const exists = await roomCodeExists(roomCode);
    if (exists) {
      createRoomUserAction(dispatch, roomCode);
    } else {
      setError('roomCode', {
        message: t(
          'Pages.HomePage.loginForm.fields.roomCode.errors.invalidRoomCode'
        ) as string
      });
    }
  }
  return (
    <PageLayout toolbarTitle={t('Pages.HomePage.toolbar.title')}>
      <div className="HomePage">
        <div className="HomePage__left">
          <h1 className="welcome-msg">
            {t('Pages.HomePage.title')}
          </h1>
          <p>
            {t('Pages.HomePage.description')}
          </p>
        </div>
        <div className="HomePage__right">
          <div className="login-container">
            <form className="choose-room" onSubmit={handleSubmit(submitHandler)} autoComplete="off">
              <h2>
                {t('Pages.HomePage.loginForm.title')}
              </h2>
              <div className="form-content">
                <ControlledInput
                  className="room-code-input"
                  label={t('Pages.HomePage.loginForm.fields.roomCode.label')}
                  control={control}
                  name="roomCode"
                  defaultValue=""
                  field={{
                    type: 'inputText',
                    props: {
                      placeholder: t('Pages.HomePage.loginForm.fields.roomCode.placeholder')
                    }
                  }}
                  rules={roomFormValidation.roomCode}
                />
                <div className="form-actions">
                  <button className="btn btn-primary btn-lg submit-room-btn" type="submit">
                    {t('Pages.HomePage.loginForm.submitBtn')}
                  </button>
                </div>
              </div>
            </form>
            <hr className="hr hr-primary" />
            <div className="extra-actions">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
