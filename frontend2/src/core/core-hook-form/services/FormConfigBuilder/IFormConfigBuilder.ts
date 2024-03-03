export default interface IFormConfigBuilder {
  onRebuildSchemas: (callback: () => void) => () => void
}
