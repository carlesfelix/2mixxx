import { ReadCallback, ResourceKey } from 'i18next'

export type TranslationsImportFn =
((language: string, namespace: string, callback: ReadCallback) => void) |
((language: string, namespace: string) => Promise<ResourceKey | boolean | null | undefined>)
