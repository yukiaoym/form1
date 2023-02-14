import styled from 'styled-components';
import common from './common.json';

const ButtonArea = styled.div<{ isBack: boolean }>`
    margin: 36px 0;
    display: flex;
    justify-content: center;

    input[type='submit'], button {
        width: 180px;
        border-radius: 100px;
        padding: 8px;
        text-align: center;
        cursor: pointer;
        margin: 0 12px;
    }
    input[type='submit'] {
        color: ${common.Color.text_w};
        background-color: ${common.Color.main};
    }
    button {
        color: ${common.Color.text};
        background-color: ${common.Color.gray};
        display: ${(props) => props.isBack ? 'inline-block' : 'none'};
    }
`
type buttonProps = {
    value: string;
    onBack?: () => void;
    isBack: boolean;
}

export default function Button({value, onBack, isBack}:buttonProps) {
    return (
        <ButtonArea isBack={isBack}>
            <button onClick={onBack}>戻る</button>
            <input type="submit" value={value} />
        </ButtonArea>
    )
}
