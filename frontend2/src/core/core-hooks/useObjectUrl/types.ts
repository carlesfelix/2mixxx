export interface ObjectUrlItem {
  url: string
  revokeOnUnmount: boolean
}

export interface UseObjectUrlReturn {
  createObjectURL: (
    obj: Blob | MediaSource,
    revokeOnUnmount?: boolean
  ) => string
  revokeObjectURL: (url: string) => void
}
