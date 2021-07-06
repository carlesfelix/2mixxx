import multer, { memoryStorage, Multer, Options } from 'multer';

export function uploadFileMemoryHOM(opts: {acceptedMimeTypes?: string[], limits?: Options['limits']} = {}): Multer {
  const { acceptedMimeTypes, limits } = opts;
  return multer({
    storage: memoryStorage(),
    limits,
    fileFilter: (req, file, callback) => {
      if (acceptedMimeTypes) {
        callback(null, acceptedMimeTypes.includes(file.mimetype));
      }
      callback(null, true);
    }
  });
}
