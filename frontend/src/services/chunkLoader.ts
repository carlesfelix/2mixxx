type ChunkProgress = {
  total: number,
  loaded: number
};

type ChunkLoaderStatus = 'progress' | 'success' | 'error';

type ChunkLoaderConfig<
  Data extends any[] = any[]
> = {
  data: Data;
  concurrent?: number;
  chunkSize?: number;
  onLoaded: (
    chunkData: Data,
    next: (chunkProgress?: ChunkProgress) => void,
    error: () => void
  ) => void;
}
export default function chunkLoader<
  Data extends any[] = any[]
>(config: ChunkLoaderConfig<Data>): Promise<void> {
  const {
    data, onLoaded,
    concurrent = 5,
    chunkSize = 100
  } = config;
  let concurrentNow: number = 0;
  let lastSongIndex: number = 0;
  let status: ChunkLoaderStatus = 'progress';
  let onFinish: () => void;
  let onError: () => void;

  loadChunks();

  function loadChunks(): void {
    if (lastSongIndex < data.length) {
      while (concurrentNow < concurrent && status === 'progress') {
        concurrentNow++;
        const startChunk = lastSongIndex;
        const endChunk = lastSongIndex + chunkSize
        const chunk = data.slice(startChunk, endChunk) as Data;
        lastSongIndex = endChunk;
        nextChunk(chunk);
      }
    } else if (!concurrentNow) {
      status = 'success';
      onFinish();
    }
  }

  function nextChunk(data: Data): void {
    onLoaded(data, chunkProgress => {
      if (['error', 'success'].includes(status)) {
        return;
      }
      concurrentNow--;
      loadChunks();
    },
    () => {
      status = 'error';
      onError();
    });
  }

  return new Promise((resolve, reject) => {
    onFinish = () => resolve();
    onError = () => reject();
  });
}
