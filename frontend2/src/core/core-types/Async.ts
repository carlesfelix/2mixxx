interface Async<Data = unknown> {
  error?: unknown
  inProgress: boolean
  data: Data
}

export default Async
