import { faListAlt, faPaperPlane, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ILink from '../models/ILink.model';

export const roomLinks: ILink[] = [
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