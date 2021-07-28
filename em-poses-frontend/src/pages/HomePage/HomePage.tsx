import { Redirect } from 'react-router-dom';
import './HomePage.scss';

export default function HomePage() {
  return (
    <div className="HomePage">
      <Redirect to="/song-requests"/>
    </div>
  );
}
