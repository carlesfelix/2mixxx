type ChunkLoaderStatus = 'progress' | 'success' | 'error';

type LoadedEvent<
  Data extends any[] = any[]
> = {
  chunkData: Data,
  next: () => void,
  error: () => void;
};
type ChunkLoaderConfig<
  Data extends any[] = any[]
> = {
  data: Data;
  concurrent?: number;
  chunkSize?: number;
  onLoaded: (event: LoadedEvent) => void;
  chunkProgress?: (progress: number) => void;
}
export default function chunkLoader<
  Data extends any[] = any[]
>(config: ChunkLoaderConfig<Data>): Promise<void> {
  const {
    data, onLoaded,
    concurrent = 5,
    chunkSize = 100,
    chunkProgress
  } = config;
  let concurrentNow: number = 0;
  let nextSongIndex: number = 0;
  let loadedItems: number = 0;
  let status: ChunkLoaderStatus = 'progress';
  let onFinish: () => void;
  let onError: () => void;

  loadChunks();

  function notifyProgress(): void {
    const progress = data.length ? 
      Math.round(loadedItems / data.length * 100) : 0;
    chunkProgress && chunkProgress(progress);
  }

  function loadChunks(): void {
    while (
      concurrentNow < concurrent &&
      nextSongIndex < data.length &&
      status === 'progress'
    ) {
      concurrentNow++;
      const startChunk = nextSongIndex;
      const endChunk = nextSongIndex + chunkSize
      const chunk = data.slice(startChunk, endChunk) as Data;
      nextSongIndex = endChunk;
      nextChunk(chunk);
    }
  }

  function nextChunk(chunkData: Data): void {
    onLoaded({
      chunkData,
      next: () => {
        if (['error', 'success'].includes(status)) {
          return;
        }
        concurrentNow--;
        if (concurrentNow) {
          loadedItems = loadedItems + chunkData.length;
          notifyProgress();
          loadChunks();
        } else {
          status = 'success';
          onFinish();
        }
      },
      error: () => {
        status = 'error';
        onError();
      }
    });
  }

  return new Promise((resolve, reject) => {
    onFinish = () => resolve();
    onError = () => reject();
  });
}
