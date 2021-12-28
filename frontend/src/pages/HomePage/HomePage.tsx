import { useForm } from 'react-hook-form';
import ControlledInput from '../../components/forms/ControlledInput';
import LoginButton from '../../components/LoginButton';
import PageLayout from '../../components/PageLayout';
import { useRoomUser } from '../../contexts/room-user';
import { createRoomUserAction } from '../../contexts/room-user';
import { useTranslation } from '../../services/i18n';
import { getRoomFormValidation } from './helpers';

import './HomePage.scss';

export default function HomePage() {
  const { t } = useTranslation('Pages/HomePage');
  const { dispatch } = useRoomUser();
  const { control, handleSubmit } = useForm<{ roomCode?: string }>({ mode: 'onChange' });
  const roomFormValidation = getRoomFormValidation();
  function submitHandler(data: { roomCode: string }): void {
    const { roomCode } = data;
    createRoomUserAction(dispatch, roomCode);
  }
  return (
    <PageLayout toolbarTitle={t('toolbar.title')}>
      <div className="HomePage">
        <div className="HomePage__left">
          <h1 className="welcome-msg">
            {t('title')}
          </h1>
          <p>
            {t('description')}
          </p>
        </div>
        <div className="HomePage__right">
          <div className="login-container">
            <form className="choose-room" onSubmit={handleSubmit(submitHandler)} autoComplete="off">
              <h2>
                {t('loginForm.title')}
              </h2>
              <div className="form-content">
                <ControlledInput
                  className="room-code-input"
                  label={t('loginForm.fields.roomCode.label')}
                  control={control}
                  name="roomCode"
                  defaultValue=""
                  field={{
                    type: 'inputText',
                    props: {
                      placeholder: t('loginForm.fields.roomCode.placeholder')
                    }
                  }}
                  rules={roomFormValidation.roomCode}
                />
                <div className="form-actions">
                  <button className="btn btn-primary btn-lg submit-room-btn" type="submit">
                    {t('loginForm.submitBtn')}
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
