import * as React from 'react'

type IconProps = React.SVGProps<SVGSVGElement> & { id: string }

export function Duotone({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/images/duotone.svg#${id}`} />
    </svg>
  )
}

export function Light({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/images/light.svg#${id}`} />
    </svg>
  )
}

export function Solid({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/images/solid.svg#${id}`} />
    </svg>
  )
}
