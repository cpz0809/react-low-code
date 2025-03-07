import { v4 as uuid } from 'uuid'
import { PaneItemType } from '@/components/board/_types/util.ts'

export const generateParams = (data: PaneItemType) => ({
  ...data,
  uuid: uuid()
})
