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
  let lastSongIndex: number = 0;
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

  function nextChunk(chunkData: Data): void {
    onLoaded({
      chunkData,
      next: () => {
        if (['error', 'success'].includes(status)) {
          return;
        }
        concurrentNow--;
        loadedItems = loadedItems + chunkData.length;
        notifyProgress();
        loadChunks();
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
