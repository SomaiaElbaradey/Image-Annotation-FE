import { SVGProps } from 'react'

import { SVGRProps } from '../types'

const OutlinedCheck = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.99976 19.0001C8.65805 19.0001 8.31634 18.8697 8.05562 18.609L2.39083 12.9442C1.8694 12.4228 1.8694 11.5774 2.39083 11.0559C2.91226 10.5345 3.75766 10.5345 4.27909 11.0559L8.99976 15.7766L19.3852 5.39113C19.9066 4.8697 20.752 4.8697 21.2735 5.39113C21.7949 5.91256 21.7949 6.75797 21.2735 7.2794L9.94389 18.609C9.68317 18.8697 9.34146 19.0001 8.99976 19.0001Z"
      fill={props.color || '#1C211F'}
    />
  </svg>
)

export default OutlinedCheck
