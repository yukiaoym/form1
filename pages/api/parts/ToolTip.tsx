import styled from 'styled-components';
import common from '../common.json';
import React, { useState } from 'react';
import NamesDict from '../NamesDict.json';

type NamesDictProps = {
    [name: string]: {
        pages: string,
        confirm: string,
        tooltip: string
    }
}
const names_dict:NamesDictProps = NamesDict.Names

const ToolTipArea = styled.div<{ show: boolean }>`
    display: inline-block;
    position: relative;
    white-space: nowrap;
    img {
        height: 18px;
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
export default function ToolTip({label}:labelProps) {
    const [show, setShow] = useState(false)

    return (
        <>
            { label !== "" ?
                <ToolTipArea show={show}>
                    <img 
                        src="/question.png" alt="help" 
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