import { MutableRefObject } from 'react'
import useCreateInstance from '../useCreateInstance'

export default function useDate (dateCallback?: () => Date | string | number): MutableRefObject<Date> {
  return useCreateInstance(() => dateCallback ? new Date(dateCallback()) : new Date())
}
