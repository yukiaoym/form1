import styled from 'styled-components';
import common from '../common.json';

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
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: ${common.Color.bg2};
        text-align: center;
        font-size: 1.0rem;
        position: relative;
        line-height: 64px;
        color: ${common.Color.gray3}
    }
    ol li:nth-child(${(props) => props.page}) {
        background-color: ${common.Color.main};
        color: ${common.Color.text_w};
    }
`
export default function Menu({page}:PageProps) {
    return (
        <ProgressArea page={page}>
            <ol>
                <li>新規</li>
                <li>変更</li>
                <li>解約</li>
            </ol>
        </ProgressArea>
    );
}