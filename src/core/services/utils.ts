import { parse, PlistValue } from 'plist';
import { ITrackEntity } from '../entities/ITrackEntity';

export function pListFileToJson(fileBuffer: Buffer, encoding: BufferEncoding): Promise<PlistValue> {
  try {
    return Promise.resolve(pListToJson(fileBuffer.toString(encoding)));
  } catch {
    return Promise.reject();
  }
}

export function pListToJson(xml: string): PlistValue {
  return parse(xml);
}

export async function getTracksFromItunesXml(fileBuffer: Buffer, encoding: BufferEncoding): Promise<ITrackEntity[]> {
  const parsedTracks: ITrackEntity[] = [];
  const pListValue = await pListFileToJson(fileBuffer, encoding);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldKeys: any = {
    'Track ID': 'track_id',
    'Size': 'size',
    'Total Time': 'total_time',
    'Year': 'year',
    'Date Modified': 'date_modified',
    'Date Added': 'date_added',
    'Bit Rate': 'bit_rate',
    'Sample Rate': 'sample_rate',
    'Persistent ID': 'persistent_id',
    'Track Type': 'track_type',
    'Name': 'name',
    'Artist': 'artist',
    'Genre': 'genre',
    'Kind': 'kind',
    'Comments': 'comments',
    'Work': 'work'
  };

  if (typeof pListValue === 'object' && 'Tracks' in pListValue) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tracks: any = pListValue.Tracks;
    if (typeof tracks === 'object') {
      for (const trackKey in tracks) {
        const trackItem: Record<string, unknown> = tracks[trackKey];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedTrack: any = {};
        if (typeof trackItem === 'object') {
          for (const fieldKey in fieldKeys) {
            const fieldKeyValue = fieldKeys[fieldKey];
            if (fieldKey in trackItem) {
              parsedTrack[fieldKeyValue] = trackItem[fieldKey];
            }
          }
          parsedTracks.push(parsedTrack);
        } else {
          Promise.reject();
        }
      }
    } else {
      Promise.reject();
    }
  } else {
    Promise.reject();
  }
  return parsedTracks;
}