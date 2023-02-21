import Form from './api/Form';
import styled from 'styled-components';
import common from './api/common.json';

const Background = styled.div`
    background-color: ${common.Color.bg2};
    padding: 24px 24px 12px 24px;
`
const Main = styled.div`
    background-color: ${common.Color.bg};
    max-width:1024px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    font-family: "Arial", "メイリオ", "MS Pゴシック";
`
const Title = styled.h1`
    font-size: 1.6rem;
    line-height: 40px;
    color: ${common.Color.text};
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
    margin: 32px 0;
`
const Contents = styled.main`
    max-width: 800px;
    margin: 0 auto;
    height: 100%;
    color: ${common.Color.text};
    background-color: ${common.Color.bg};
`
const Explanation = styled.p`
    text-align: center;
    margin-bottom: 32px;
    font-size: 0.8rem;
`
const Footer = styled.footer`
    text-align: center;
    font-size: 0.8rem;
    color: ${common.Color.text};
    margin-top: 24px;
`
export default function App() {
    return (
        <Background>
            <Main>  
                <img src='/CyberSolutions.png' height={36} />
                <Contents>
                    <Title>環境作成フォーム</Title>
                    <Explanation>
                        下記フォームに必要項目を入力して送信してください。<br />
                        3営業日以内に担当者より折り返しご連絡させていただきます。<br />
                        お急ぎの方はお電話にてお問い合わせください。
                    </Explanation>
                    <Form />
                </Contents>
            </Main>
            <Footer>
                <small>©2023 CyberSolutions Inc</small>
            </Footer>
        </Background>
    );
}