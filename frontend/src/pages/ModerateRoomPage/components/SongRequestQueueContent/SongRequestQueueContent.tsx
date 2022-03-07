import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Socket } from "socket.io-client";
import { SERVER__DELETE_SONG_REQUEST, SERVER__NEW_SONG_REQUEST } from "../../../../constants/server-socket-actions";
import SongRequestQueue from "../../../SongRequestsPage/components/SongRequestQueue";
import { emitDeleteSongRequest, emitGetSongRequests } from "../../../../socket/emitters";
import AsyncState from "../../../../types/AsyncState";
import SocketReponse from "../../../../types/SocketResponse";
import SongRequest from "../../../../types/SongRequest";
import AsyncLayout from "../../../../components/AsyncLayout";

type Props = {
  moderateRoomSocket: Socket;
};

export default function SongRequestQueueContent(props: Props) {
  const { moderateRoomSocket } = props;
  const [ songRequests, setSongRequests ] = useState<
    AsyncState<{ request: SongRequest, deleteInProgress: boolean }[]>
  >({
    inProgress: true, error: false,
    data: []
  });
  const { t } = useTranslation();
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
    setSongRequests({
      inProgress: true, error: false,
      data: []
    });
    emitGetSongRequests(moderateRoomSocket).then(data => {
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
    moderateRoomSocket.on(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
    moderateRoomSocket.on(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
    return () => {
      moderateRoomSocket.off(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
      moderateRoomSocket.off(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
    };
  }, [ moderateRoomSocket ]);
  function setRequestProgress(
    songRequestId: string, inProgress: boolean,
    oldSongRequests: { request: SongRequest, deleteInProgress: boolean }[]
  ): { request: SongRequest, deleteInProgress: boolean }[] {
    return oldSongRequests.map(eachSongRequest => {
      if (eachSongRequest.request.id === songRequestId) {
        return {
          deleteInProgress: inProgress,
          request: eachSongRequest.request
        };
      }
      return eachSongRequest;
    });
  }
  function deleteSongHandler(songRequest: SongRequest): void {
    setSongRequests(old => ({
      ...old,
      data: setRequestProgress(songRequest.id!, true, old.data)
    }));
    emitDeleteSongRequest(moderateRoomSocket, songRequest.id!).finally(() => {
      setSongRequests(old => ({
        ...old,
        data: old.data.filter(({ request }) => request.id !== songRequest.id)
      }));
    });
  }
  return (
    <AsyncLayout
      inProgress={songRequests.inProgress}
      error={songRequests.error}
      errorMessage={t('Pages.ModerateRoomPage.components.SongRequestQueueContent.pendingSongsLoadError')}
    >
      <SongRequestQueue
        className="room-requests"
        songRequests={songRequests.data}
        canDelete
        onDeleteSong={deleteSongHandler}
      />
    </AsyncLayout>
  );
}
