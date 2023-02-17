import styled from "styled-components"
import ToolTip from "./ToolTip";

const SectionTitleArea = styled.div<{required:boolean}>`
    margin-bottom: 4px;
    h3 {
        font-weight: bold;
        line-height: 18px;
        display: inline-block;
    }
    h4 {
        display: inline-block;
        font-weight: normal;
        font-size: 0.8rem;
    }
    .required {
        color: #FF0000;
        display: ${(props) => props.required ? 'inline':'none'};
    }
`
type SectionTitleProps = {
    label: string;
    required: boolean;
    sub: boolean;
}

export default function SectionTitle({label, required, sub}:SectionTitleProps) {
    return (
        <SectionTitleArea required={required} >
            { sub ? <h4>{label}</h4> : <h3>{label}</h3> }
            <span className="required"> *</span>
            <ToolTip label={label} />
        </SectionTitleArea>
    )
}


