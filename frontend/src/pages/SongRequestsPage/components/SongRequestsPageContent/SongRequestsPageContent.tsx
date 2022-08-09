import AsyncLayout from "../../../../components/AsyncLayout";
import SongRequestQueue from "../../../../components/SongRequestQueue";
import { useRoomSession } from "../../../../contexts/room-session";
import { useTranslation } from "../../../../services/i18n";

export default function SongRequestsPageContent() {
  const { t } = useTranslation();
  const { songRequests } = useRoomSession();
  return (
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
  );
}
