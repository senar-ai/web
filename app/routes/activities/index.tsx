import * as React from 'react'
import { CardsList } from '../../components/cards-list'
import { activities } from '../../model/activities'

export default function Index() {
  return <CardsList activities={activities} />
}
