import { faListAlt, faPaperPlane, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import IAppLink from '../../../models/IAppLink.model';

export function getRoomPageLinks(parentUrl: string = ''): IAppLink[] {
  const links: IAppLink[] = [
    {
      to: '/song-requests',
      icon: faListAlt,
      label: 'Song requests'
    },
    {
      to: '/make-a-song-request',
      icon: faPlusSquare,
      label: 'Make a song request'
    },
    {
      to: '/recommend-song',
      icon: faPaperPlane,
      label: 'Recommend song'
    }
  ];
  return links.map(roomPageLink => ({
    ...roomPageLink, to: `${parentUrl}${roomPageLink.to}`
  }));
}
