import { Redirect, useRouteMatch } from 'react-router-dom';

export default function RoomPageHome() {
  const { url } = useRouteMatch();
  return (
    <Redirect to={`${url}/song-requests`} />
  );
}