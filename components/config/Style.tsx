import styled from "styled-components";
import common from './common.json';

export const Section = styled.section`
    margin-bottom: 16px;
    input[type='text'], 
    input[type='number'], 
    input[type='date'],
    select,
    textarea {
        width: 100%;
        min-height: 40px;
        background-color: ${common.Color.input_bg};
        border-radius: 4px;
        padding: 10px 12px;
        margin-bottom: 8px;
    }
    textarea {
        line-height: 20px;
        height: 120px;
    }
    .error {
        color: #FF0000;
        display: inline-block;
        margin-top: -4px;
        margin-bottom: 4px;
    }
    input[type="file"] {
        width: 100%;
        min-height: 40px;
        margin-bottom: 8px;
    }

    // カレンダーアイコン以外をクリックしてもカレンダーを表示する
    input[type="date"] {
        position: relative;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }


    //Radio
    .radio {
        min-height: 40px;
        padding: 10px 2px;
    }
    .radio span {
        font-size: 1.0rem;
        margin-right: 32px;
        cursor: pointer;
        vertical-align: middle;
        line-height: 18px;
    }
    input[type='radio'], input[type='checkbox'] {
        width: 18px;
        height: 18px;
        background-color: ${common.Color.input_bg};
        border: 1px solid ${common.Color.gray2};
        vertical-align: middle;
        margin-right: 8px;
        cursor: pointer;
        transition: all 200ms ease;
    }
    input[type='radio'] {
        border-radius: 50%;
    }
    input[type='radio']:checked {
        background-color: ${common.Color.main};
        box-shadow: inset 0 0 0 3px ${common.Color.input_bg};
    }

    //Checkbox
    .checkbox {
        display: flex;
        flex-flow: column;
        padding: 10px 2px;
    }
    .checkbox label {
        margin-bottom: 8px;
    }
    .checkbox span {
        font-size: 1.0rem;
        cursor: pointer;
        line-height: 18px;
        vertical-align: middle;
    }
    input[type='checkbox'] {
        position: relative;
    }
    input[type='checkbox'] {
        position: relative;
    }
    input[type='checkbox']:after {
        content: '';
        display: none;
        width: 14px;
        height: 8px;
        border-bottom: solid 3px ${common.Color.text_w};
        border-left: solid 3px ${common.Color.text_w};
        transform rotate(-45deg);
        position: absolute;
        top: 2px;
        left: 1px;
    }
    input[type='checkbox']:checked {
        background-color: ${common.Color.main} !important;
        border: 1px solid ${common.Color.main};
    }
    input[type='checkbox']:checked:after {
        display: inline-block;
    }

    //Disabled
    input[type='text']:disabled, 
    input[type='number']:disabled, 
    input[type='date']:disabled,
    select:disabled, 
    textarea:disabled {
        background-color: ${common.Color.gray};
    }
    input[type='radio']:disabled,
    input[type='checkbox']:disabled {
        background-color: ${common.Color.gray3};
    }
    input::placeholder {
        color: ${common.Color.gray3};
    }
`
