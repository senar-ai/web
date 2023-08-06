import * as React from 'react'

type IconProps = React.SVGProps<SVGSVGElement> & {
  set: 'solid' | 'light' | 'duotone'
  id: string
}

export function Icon({ set, id, ...props }: IconProps) {
  return (
    <svg fill="currentColor" {...props}>
      <use href={`/images/${set}.svg#${id}`} />
    </svg>
  )
}
