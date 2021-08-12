import { parse, PlistValue } from 'plist';
import { ISongEntity } from '../entities/ISongEntity';

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

export async function getTracksFromItunesXml(fileBuffer: Buffer, encoding: BufferEncoding): Promise<ISongEntity[]> {
  const pListValue = await pListFileToJson(fileBuffer, encoding);

  const library = pListValue.valueOf();
  
  if (typeof library === 'object' && 'Tracks' in library) {
    const { Tracks: tracks } = library;
    if (typeof tracks === 'object') {
      const trackIds = Object.keys(tracks);
      return trackIds.map(trackId => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const track = tracks[trackId] as any;
        if (
          typeof track === 'object' &&
          typeof track.Name === 'string' &&
          (
            typeof track.Artist === 'string' ||
            typeof track.Artist === 'undefined'
          )
        ) {
          return {
            title: track.Name,
            artist: track.Artist
          };
        }
        throw new Error();
      });
    }
  }
  throw new Error();
}
