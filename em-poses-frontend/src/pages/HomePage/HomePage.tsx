import { NavLink } from 'react-router-dom';
import FormField from '../../components/forms/FormField';
import './HomePage.scss';

export default function HomePage() {
  return (
    <div className="HomePage">
      {/* <Redirect to="/song-requests"/> */}
      <form className="card card-primary choose-room">
        <FormField label="Type a code" errorMessage="Error">
          <input className="input" type="text" placeholder="type a code" />
        </FormField>
        <button className="btn btn-primary">
          Enter
        </button>
      </form>
      <div className="login-link-container">
        <NavLink to="/admin">Enter as registered user</NavLink>
      </div>
    </div>
  );
}
