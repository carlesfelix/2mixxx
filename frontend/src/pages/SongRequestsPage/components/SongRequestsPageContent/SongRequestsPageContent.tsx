import AsyncLayout from "../../../../components/AsyncLayout";
import SocketStatusLayout from "../../../../components/SocketStatusLayout";
import SongRequestQueue from "../../../../components/SongRequestQueue";
import { useRoomSession } from "../../../../contexts/room-session";
import { useTranslation } from "../../../../services/i18n";

export default function SongRequestsPageContent() {
  const { t } = useTranslation();
  const { songRequests, connectionStatus } = useRoomSession();
  return (
    <SocketStatusLayout
      className="page-content SongRequestsPage__content"
      socketConnectionStatus={connectionStatus}
    >
      <AsyncLayout
        inProgress={songRequests.inProgress}
        error={songRequests.error}
        errorMessage={t('Pages.SongRequestsPage.pendingSongsLoadError')}
      >
        <SongRequestQueue
          className="pending-songs"
          songRequests={songRequests.data}
        /> 
      </AsyncLayout>
    </SocketStatusLayout>
  );
}
