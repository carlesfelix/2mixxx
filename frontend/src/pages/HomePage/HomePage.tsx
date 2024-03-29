import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { roomCodeExists } from '../../api/rooms';
import FormGroup from '../../components/form/FormGroup';
import InputTextField from '../../components/form/InputTextField';
import LoginButton from '../../components/LoginButton';
import PageLayout from '../../components/PageLayout';
import SubmitButton from '../../components/SubmitButton';
import { createRoomUserAction, useRoomUser } from '../../contexts/room-user';
import { buildMessage } from '../../helpers/validation-rules';
import usePrevious from '../../hooks/usePrevious';
import { isDate } from '../../services/date';
import { useTranslation } from '../../services/i18n';
import AppTitle from './components/AppTitle';
import { getRoomFormValidation } from './helpers';
import './HomePage.scss';

export default function HomePage() {
  const { t } = useTranslation();
  const { dispatch } = useRoomUser();
  const {
    control, handleSubmit, setError, formState,
    setValue
  } = useForm<{ roomCode: string }>({ mode: 'onChange' });
  const { isSubmitting } = formState;
  const [ searchParams ] = useSearchParams();
  const roomCodeParam = searchParams.get('roomCode');
  const roomCodeParamPrev = usePrevious(roomCodeParam);
  const submitRoomRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      submitRoomRef.current && roomCodeParam &&
      roomCodeParam !== roomCodeParamPrev && !isSubmitting
    ) {
      setValue('roomCode', roomCodeParam);
      submitRoomRef.current.click();
    }
  }, [
    roomCodeParam, roomCodeParamPrev, isSubmitting,
    submitRoomRef, setValue
  ]);
  
  const roomFormValidation = getRoomFormValidation();
  async function submitHandler(data: { roomCode: string }): Promise<void> {
    const { roomCode } = data;
    try {
      const exists = await roomCodeExists(roomCode);
      if (exists) {
        createRoomUserAction(dispatch, roomCode);
      } else {
        setError('roomCode', {
          message: buildMessage(
            'Pages.HomePage.loginForm.fields.roomCode.errors.invalidRoomCode'
          )
        });
      }
    } catch (err: any) {
      const { headers, status } = err.response;
      if (status === 429 && headers) {
        const rateLimitReset = headers['x-ratelimit-reset'];
        isDate(rateLimitReset) && (
          setError('roomCode', {
            message: buildMessage(
              'Common.formValidationMessages.tooManyAttempts.generic'
            )
          })
        );
      }
    }
  }
  return (
    <PageLayout toolbarTitle={t('Pages.HomePage.toolbar.title')}>
      <div className="HomePage">
        <div className="HomePage__left">
          <AppTitle />
          <span className="fill-remaining-space"></span>
          <p>
            {t('Pages.HomePage.description')}
          </p>
        </div>
        <div className="HomePage__right">
          <div className="login-container">
            <div className="app-title">
              <AppTitle />
            </div>
            <form className="choose-room" onSubmit={handleSubmit(submitHandler)} autoComplete="off">
              <div >
                <FormGroup
                  className="form-content"
                  legend={
                    <h2>
                      {t('Pages.HomePage.loginForm.title')}
                    </h2>
                  }
                  disabled={isSubmitting}
                >
                  <InputTextField
                    fieldClassName="room-code-input"
                    label={t('Pages.HomePage.loginForm.fields.roomCode.label')}
                    control={control}
                    placeholder={t('Pages.HomePage.loginForm.fields.roomCode.placeholder')}
                    name="roomCode"
                    rules={roomFormValidation.roomCode}
                  />
                </FormGroup>
                <div className="form-actions">
                  <SubmitButton
                    color="primary"
                    size="large"
                    inProgress={isSubmitting}
                    ref={submitRoomRef}
                  >
                    {t('Pages.HomePage.loginForm.submitBtn')}
                  </SubmitButton>
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
