import useCreateInstance from './useCreateInstance'

export default function useDate (d?: Date | string | number): Date {
  return useCreateInstance(() => d ? new Date(d) : new Date())
}
