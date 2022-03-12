import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import AsyncLayout from "../../../../components/AsyncLayout";
import SongRequestQueue from "../../../../components/SongRequestQueue";
import { SERVER__DELETE_SONG_REQUEST, SERVER__NEW_SONG_REQUEST } from "../../../../constants/server-socket-actions";
import { useTranslation } from "../../../../services/i18n";
import { emitGetSongRequests } from "../../../../socket/emitters";
import AsyncState from "../../../../types/AsyncState";
import SocketReponse from "../../../../types/SocketResponse";
import SongRequest from "../../../../types/SongRequest";

type Props = {
  mainSocket: Socket;
};

export default function SongRequestsPageContent(props: Props) {
  const { mainSocket } = props;
  const { t } = useTranslation();
  const [ songRequests, setSongRequests ] = useState<
    AsyncState<{ request: SongRequest, deleteInProgress: boolean }[]>
  >({
    inProgress: true, error: false,
    data: []
  });

  useEffect(() => {
    function newSongRequestlistener(res: SocketReponse<SongRequest>): void {
      setSongRequests(old => ({
        ...old,
        data: [ ...old.data, { request: res.data, deleteInProgress: false } ]
      }));
    }
    function deleteSongRequestlistener(
      res: SocketReponse<{ songRequestId: string }>
    ): void {
      setSongRequests(old => ({
        ...old,
        data: old.data.filter(
          ({ request }) => request.id !== res.data.songRequestId
        )
      }));
    }
    if (mainSocket) {
      setSongRequests({
        inProgress: true, error: false,
        data: []
      });
      emitGetSongRequests(mainSocket).then(data => {
        setSongRequests({
          inProgress: false, error: false,
          data: data.data.map(request => ({
            request, deleteInProgress: false
          }))
        });
      }).catch(error => {
        setSongRequests({
          inProgress: false, error,
          data: []
        });
      });
      mainSocket.on(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
      mainSocket.on(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
    }
    return () => {
      if (mainSocket) {
        mainSocket.off(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
        mainSocket.off(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
      }
    };
  }, [ mainSocket ]);
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