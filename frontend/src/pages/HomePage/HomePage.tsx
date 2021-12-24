import { useForm } from 'react-hook-form';
import ControlledInput from '../../components/forms/ControlledInput';
import LoginButton from '../../components/LoginButton';
import PageLayout from '../../components/PageLayout';
import { useRoomUser } from '../../contexts/room-user';
import { createRoomUserAction } from '../../contexts/room-user';
import { getRoomFormValidation } from './helpers';

import './HomePage.scss';

export default function HomePage() {
  const { dispatch } = useRoomUser();
  const { control, handleSubmit } = useForm<{ roomCode?: string }>({ mode: 'onChange' });
  const roomFormValidation = getRoomFormValidation();
  function submitHandler(data: { roomCode: string }): void {
    const { roomCode } = data;
    createRoomUserAction(dispatch, roomCode);
  }
  return (
    <PageLayout toolbarTitle="Welcome to 2mixxx">
      <div className="HomePage">
        <div className="HomePage__left">
          <h1 className="welcome-msg">2mixxx</h1>
          <p>The app for requesting songs to the DJ</p>
        </div>
        <div className="HomePage__right">
          <div className="login-container">
            <form className="choose-room" onSubmit={handleSubmit(submitHandler)}>
              <h2>Enter to the room</h2>
              <div className="form-content">
                <ControlledInput
                  className="room-code-input"
                  label="Type a code"
                  control={control}
                  name="roomCode"
                  defaultValue=""
                  field={{
                    type: 'inputText',
                    props: { autoComplete: 'off' }
                  }}
                  rules={roomFormValidation.roomCode}
                />
                <div className="form-actions">
                  <button className="btn btn-primary btn-lg submit-room-btn" type="submit">
                    Enter
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
