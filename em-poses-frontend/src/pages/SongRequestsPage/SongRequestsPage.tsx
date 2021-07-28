import { useState } from 'react';
import { ITrack } from '../../models/ITrack';
import SongRequestQueue from './components/SongRequestQueue';

const songListMock: ITrack[] = [];

for (let i = 0; i < 50; i++) {
  songListMock.push({
    id: i,
    name: `Song ${i + 1}`,
    artist: `Artist ${i + 1}`
  })
}
export default function SongRequestsPage() {
  const [ songList ] = useState<ITrack[]>(songListMock);
  return (
    <div className="SongRequestsPage">
      <SongRequestQueue songList={songList} />
    </div>
  );
}