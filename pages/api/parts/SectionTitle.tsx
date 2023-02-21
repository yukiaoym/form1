import styled from "styled-components"
import ToolTip from "./ToolTip";
import NamesDict from '../NamesDict.json';

type NamesDictProps = {
    [name: string]: {
        pages: string,
        confirm: string,
        tooltip: string
    }
}
const names_dict:NamesDictProps = NamesDict.Names

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
    required?: boolean;
    sub: boolean;
}

export default function SectionTitle({label, required, sub}:SectionTitleProps) {
    if (required == undefined) {
        required = false
    }
    return (
        <SectionTitleArea required={required} >
            { sub ? <h4>{names_dict[label]["pages"]}</h4> : <h3>{names_dict[label]["pages"]}</h3> }
            <span className="required"> *</span>
            <ToolTip label={names_dict[label]["tooltip"]} />
        </SectionTitleArea>
    )
}


