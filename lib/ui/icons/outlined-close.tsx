import { SVGProps } from 'react'

import { SVGRProps } from '../types'

const OutlinedClose = ({
    title,
    titleId,
    ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        aria-labelledby={titleId}
        {...props}
    >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.7405 13.5589L16.2862 18.1046C16.7883 18.6067 17.6024 18.6067 18.1045 18.1046C18.6066 17.6025 18.6066 16.7884 18.1045 16.2863L13.5588 11.7406L18.1045 7.19491C18.6066 6.69281 18.6066 5.87874 18.1045 5.37664C17.6024 4.87454 16.7883 4.87454 16.2862 5.37664L11.7405 9.92232L7.19485 5.37664C6.69275 4.87454 5.87868 4.87454 5.37658 5.37664C4.87447 5.87874 4.87447 6.69281 5.37658 7.19491L9.92226 11.7406L5.37658 16.2863C4.87447 16.7884 4.87447 17.6025 5.37658 18.1046C5.87868 18.6067 6.69275 18.6067 7.19485 18.1046L11.7405 13.5589Z"
            fill={props.color || '#1C211F'}
        />
    </svg>
)

export default OutlinedClose
