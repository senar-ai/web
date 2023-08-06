import * as React from 'react'

export function Duotone({ id, ...props }) {
  return (
    <svg {...props}>
      <use href={`/images/duotone.svg#${id}`} />
    </svg>
  )
}

export function Light({ id, ...props }) {
  return (
    <svg {...props}>
      <use href={`/images/light.svg#${id}`} />
    </svg>
  )
}

export function Solid({ id, ...props }) {
  return (
    <svg {...props}>
      <use href={`/images/solid.svg#${id}`} />
    </svg>
  )
}
