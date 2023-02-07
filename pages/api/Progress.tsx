import { useForm, SubmitHandler } from "react-hook-form";
import styled from 'styled-components';
import common from './common.json';

type PageProps = {
    page: number;
}
const ProgressArea = styled.div<{ page: number }>`
    margin-bottom: 48px;
    ol {
        display: flex;
        flex-direction: row;
        max-width: 240px;
        margin: 0 auto;
        justify-content: space-between;
    }
    ol li {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: ${common.Color.bg2};
        text-align: center;
        font-size: 1.2rem;
        color: ${common.Color.text_w};
        font-weight: bold;
        position: relative;
        line-height: 48px;
    }
    ol li:nth-child(-n+2)::after {
        content: '';
        width: 8px;
        height: 8px;
        border: 0;
        border-top: solid 1px ${common.Color.text};
        border-right: solid 1px ${common.Color.text};
        transform: rotate(45deg);
        position: absolute;
        top: 20px;
        right: -25px;
    }
    ol li:nth-child(${(props) => props.page}) {
        background-color: ${common.Color.main};
    }
`
export default function Progress({page}:PageProps) {
    return (
        <ProgressArea page={page}>
            <ol>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ol>
        </ProgressArea>
    );
}