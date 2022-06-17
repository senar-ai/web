/* eslint-disable-next-line import/no-unresolved */
import timestamp from '../data/timestamp.json'

export type Timestamp = {
  readonly lastUpdated: string
}

export const lastUpdated = (timestamp as unknown as Timestamp).lastUpdated
