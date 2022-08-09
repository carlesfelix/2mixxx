import { useEffect, useState } from "react";
import { SERVER__DELETE_SONG_REQUEST, SERVER__NEW_SONG_REQUEST } from "../../constants/server-socket-actions";
import { emitGetSongRequests } from "../../socket/emitters";
import SocketReponse from "../../types/SocketResponse";
import SongRequest from "../../types/SongRequest";
import RoomSessionContext from "./RoomSessionContext";
import { RoomSessionProviderProps, State } from "./types";

export default function RoomSessionProvider(
  props: RoomSessionProviderProps
) {
  const { children, mainSocket } = props;
  const [ songRequests, setSongRequests ] = useState<State>({
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
    <RoomSessionContext.Provider
      value={{ songRequests }}
    >
      {children}
    </RoomSessionContext.Provider>
  );
}
