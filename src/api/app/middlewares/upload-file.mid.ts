import multer, { memoryStorage, Multer, Options } from 'multer';

export function getUploadFileMemoryMid(opts: {acceptedMimeTypes?: string[], limits?: Options['limits']} = {}): Multer {
  const { acceptedMimeTypes = [], limits } = opts;
  return multer({
    storage: memoryStorage(),
    limits,
    fileFilter: (req, file, callback) => {
      if (acceptedMimeTypes.length && !acceptedMimeTypes.includes(file.mimetype)) {
        callback(
          new Error(`Unsupported format. Accepted files: ${acceptedMimeTypes.join(', ')}.`)
        );
        return;
      }
      callback(null, true);
    }
  });
}
