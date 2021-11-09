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
    <PageLayout toolbarTitle="Home">
      <div className="HomePage page-content">
        <form className="card card-primary choose-room" onSubmit={handleSubmit(submitHandler)}>
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
              <button className="btn btn-primary submit-room-btn" type="submit">
                Enter
              </button>
            </div>
          </div>
        </form>
        <div className="login-link-container">
          <LoginButton />
        </div>
      </div>
    </PageLayout>
  );
}