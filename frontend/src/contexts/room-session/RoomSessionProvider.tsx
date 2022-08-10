import { useCallback, useEffect, useState } from "react";
import { SERVER__DELETE_SONG_REQUEST, SERVER__NEW_SONG_REQUEST } from "../../constants/server-socket-actions";
import useSocketConnectionStatus from "../../hooks/useSocketConnectionStatus";
import { emitGetSongRequests, emitNewSongRequest } from "../../socket/emitters";
import SocketReponse from "../../types/SocketResponse";
import SongRequest from "../../types/SongRequest";
import RoomSessionContext from "./RoomSessionContext";
import { RoomSessionProviderProps, SendNewRequestStatus, SongRequests } from "./types";

export default function RoomSessionProvider(
  props: RoomSessionProviderProps
) {
  const { children, mainSocket } = props;
  const [ songRequests, setSongRequests ] = useState<SongRequests>({
    inProgress: true, error: false,
    data: []
  });
  const [ sendNewRequestStatus, setSendNewRequestStatus ] = useState<
    SendNewRequestStatus
  >({
    error: false, inProgress: false,
    data: { newRequestConfirmed: true }
  });
  const connectionStatus = useSocketConnectionStatus(mainSocket);

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
    return () => {
      mainSocket.off(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
      mainSocket.off(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
    };
  }, [ mainSocket ]);

  const sendNewRequest = useCallback((songId: string) => {
    setSendNewRequestStatus(old => ({
      ...old,
      inProgress: true,
      error: false
    }));
    emitNewSongRequest(mainSocket, songId).then((data) => {
      setSendNewRequestStatus({
        inProgress: false, error: false,
        data: { newRequestConfirmed: false }
      });
      setSongRequests(old => ({
        ...old,
        data: [
          ...old.data,
          { request: data.data, deleteInProgress: false }
        ]
      }));
    }).catch(() => {
      setSendNewRequestStatus(old => ({
        ...old,
        inProgress: false,
        error: true,
      }));
    });
  }, [mainSocket, setSendNewRequestStatus]);

  const confirmNewRequestSent = useCallback(() => {
    setSendNewRequestStatus(old => ({
      ...old,
      data: { newRequestConfirmed: true }
    }));
  }, [ setSendNewRequestStatus ]);

  return (
    <RoomSessionContext.Provider
      value={{
        songRequests,
        connectionStatus,
        sendNewRequest,
        confirmNewRequestSent,
        sendNewRequestStatus
      }}
    >
      {children}
    </RoomSessionContext.Provider>
  );
}
