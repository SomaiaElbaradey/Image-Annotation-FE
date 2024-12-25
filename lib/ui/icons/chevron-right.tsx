import type { SVGProps } from 'react'

import { SVGRProps } from '../types'

const ChevronRight = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.8467 12.0001L8.38228 5.30811C7.87225 4.78013 7.87225 3.9241 8.38228 3.39611C8.89231 2.86813 9.71924 2.86813 10.2293 3.39611L17.6172 11.0441C18.1273 11.5721 18.1273 12.4281 17.6172 12.9561L10.2293 20.6041C9.71924 21.1321 8.89231 21.1321 8.38228 20.6041C7.87225 20.0761 7.87225 19.2201 8.38228 18.6921L14.8467 12.0001Z"
      fill={props.color || '#5E6160'}
    />
  </svg>
)
export default ChevronRight
