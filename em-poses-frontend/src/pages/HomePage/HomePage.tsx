import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import ControlledInput from '../../components/forms/ControlledInput';
import './HomePage.scss';

export default function HomePage() {
  const { push } = useHistory();
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  function submitHandler(data: { roomCode: string }): void {
    const { roomCode } = data;
    push(`/rooms/${roomCode}`);
  }
  return (
    <div className="HomePage">
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
            rules={{
              required: {
                message: 'This field is mandatory',
                value: true
              }
            }}
          />
          <button className="btn btn-primary submit-room-btn" type="submit">
            Enter
          </button>
        </div>
      </form>
      <div className="login-link-container">
        <NavLink to="/dashboard">
          Enter as registered user
        </NavLink>
      </div>
    </div>
  );
}
