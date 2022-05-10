// @ts-ignore
import plist from 'plist/dist/plist-parse';
import Song from '../types/Song';

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (() => {
      resolve(fileReader.result as string);
    });
    fileReader.onerror = (() => reject());
    fileReader.readAsText(file);
  });
}

export async function readPlistFileAsJson<
  PlistJSON = any
>(file: File): Promise<PlistJSON>{
  const fileContent = await readFileAsText(file);
  return plist.parse(fileContent) as PlistJSON;
}

export async function loadSongsFromItunesFile(file: File): Promise<Song[]> {
  function getSong(plistObject: Record<string, any>, id: string): Song {
    if (id in plistObject) {
      const track = plistObject[id];
      if (track instanceof Object &&
        !(track instanceof Array) &&
        !(track instanceof Date) &&
        'Name' in track && (
          'Artist' in track || !track.hasOwnProperty('Artist')
        )
      ) {
        const { Name: title, Artist: artist } = track;
        return { title, artist };
      }
    }
    throw new Error();
  }
  const acceptedMimeTypes = ['application/xml', 'text/xml'];
  if (acceptedMimeTypes.includes(file.type)) {
    const library = await readPlistFileAsJson(file);
    if (typeof library === 'object' && 'Tracks' in library) {
      const { Tracks: tracks } = library;
      if (tracks instanceof Object &&
        !(tracks instanceof Array) &&
        !(tracks instanceof Date)
      ) {
        const trackIds = Object.keys(tracks);
        return trackIds.map(
          trackId => getSong(tracks, trackId)
        );
      }
    }
  }
  throw new Error();
}
