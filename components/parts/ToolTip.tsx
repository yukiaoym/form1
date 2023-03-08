import styled from 'styled-components';
import common from '../config/common.json';
import React, { useState, SVGProps } from 'react';

const ToolTipArea = styled.div<{ show: boolean }>`
    display: inline-block;
    position: relative;
    white-space: nowrap;
    svg {
        cursor: pointer;
        margin-left: 8px;
        vertical-align: middle;
        position: relative;
    }
    span { 
        font-weight: normal;
        font-size: 0.8rem;
        background-color: ${common.Color.bg};
        border: 2px solid ${common.Color.main};
        border-radius: 4px;
        padding: 10px;
        width: fit-content;
        height: fit-content;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 32px;
        display: ${(props) => (props.show ? 'block' : 'none')};
    }
`

type labelProps = {
    label: string
}

const QuestionIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 512 512"
      fill={common.Color.main}
      {...props}
    >
      <path d="M231.5 1.1C171.8 7.2 117.4 32.9 75.2 75-25 175-25 337 75.2 437c40.6 40.5 90.1 64.8 149.3 73.2 11.9 1.7 51.2 1.6 63.5-.1 58-8 108.9-33 148.9-73.2 46.4-46.7 72.3-106.1 74.8-171.9 2.6-71.1-24.2-139.3-74.9-190-39.3-39.4-89.1-64.3-145.3-72.6-12.2-1.8-47.7-2.6-60-1.3zm39 128c46.9 7.9 67.4 47.4 44.4 85.5-5.7 9.4-13.4 17.9-25.5 28-6.7 5.6-12.9 11.8-14.9 14.8-4.3 6.4-6.5 14.8-6.5 24.6 0 13.8-4.9 18.4-19.4 18.4-10.1 0-14-1.8-16.7-7.7-2.6-5.9-2.6-23.5 0-33.9 3.9-15.3 10-23.6 27.6-37.8 17.2-13.9 21.4-19.6 22.3-30.6 1.2-15.8-11.8-25.4-33-24.2-13.5.7-19.7 4.3-28.3 16.4-7.3 10.1-15.3 11.9-25.4 5.6-12.8-7.9-10.9-26.8 4.2-41.6 15.9-15.6 42.9-22.3 71.2-17.5zm-11.1 197.4c8.8 4.2 14.5 13.1 14.6 22.4 0 8.3-1.9 13-7.5 18.8-10.4 10.7-26 10.8-36.2.1-13-13.6-7.7-36 10.2-42.6 4.3-1.6 14.3-.9 18.9 1.3z" />
    </svg>
)

export default function ToolTip({label}:labelProps) {
    const [show, setShow] = useState(false)
    return (
        <>
            { label !== "" ?
                <ToolTipArea show={show}>
                    <QuestionIcon 
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                    />
                    <span>{label.split("\n").map((item, index) => 
                    <React.Fragment key={index}>{item}<br /></React.Fragment>
                    )}
                    </span>
                </ToolTipArea>
            :<></>
            }
        </>
    )
}