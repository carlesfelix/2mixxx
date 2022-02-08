import { customAlphabet } from 'nanoid';
import { parse, PlistValue } from 'plist';
import SongEntity from '../types/SongEntity';

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

type GetTracksFromItunesXmlProps = {
  fileBuffer: Buffer;
  encoding: BufferEncoding;
  libraryId: string;
};
export async function getTracksFromItunesXml(props: GetTracksFromItunesXmlProps): Promise<SongEntity[]> {
  const { fileBuffer, encoding, libraryId } = props;
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
            artist: track.Artist,
            libraryId
          };
        }
        throw new Error();
      });
    }
  }
  throw new Error();
}

export function getRandomCode(opts: { alphabet: string, size: number }): string {
  const { alphabet, size } = opts;
  const nanoid = customAlphabet(alphabet, size);
  return nanoid();
}
