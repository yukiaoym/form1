import React from 'react';
import styled from 'styled-components';

const SubTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
`
const Message = styled.p`
    text-align: center;
    margin-top: 24px;
`

export default function Result({responseCode}:{responseCode: number}) {
    return (
        <>
            { responseCode == 200 ?
            <>
                <SubTitle>送信完了</SubTitle>
                <Message>ご協力いただき、ありがとうございました。</Message>
            </>
            :
            <>
                <SubTitle>送信失敗</SubTitle>
                <Message>お手数ですが、始めからやり直してください。</Message>
            </>
            }
        </>
    )
}