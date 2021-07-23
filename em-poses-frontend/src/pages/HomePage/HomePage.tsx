import { useState } from 'react';
import { ITrack } from '../../models/ITrack';
import SongRequestQueue from './components/SongRequestQueue';
import './HomePage.scss';

const songListMock: ITrack[] = [];

for (let i = 0; i < 50; i++) {
  songListMock.push({
    id: i,
    name: `Song ${i + 1}`,
    artist: `Artist ${i + 1}`
  })
}
export default function HomePage() {
  const [ songList, setSongList ] = useState<ITrack[]>(songListMock);
  return (
    <div className="HomePage">
      <SongRequestQueue songList={songList} />
    </div>
  );
}