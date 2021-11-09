import { useRouteMatch } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import RoomView from '../../components/RoomView';

export default function RoomByIdPage() {
  const { url: parentUrl, params } = useRouteMatch<{ id: string }>();
  const { id: room } = params;
  return (
    <PageLayout>
      <div className="RoomByIdPage page-content">
        <RoomView room={room} parentUrl={parentUrl} />
      </div>
    </PageLayout>
  );
}