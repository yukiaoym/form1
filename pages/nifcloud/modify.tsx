import Form from '../../components/pages/Form';
import styled from 'styled-components';
import common from '../../components/config/common.json';

const SUB_DIRECTORY = "/form";
//const SUB_DIRECTORY = "";
const isProd = process.env.NODE_ENV == "production"

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
    font-weight: bold;
    line-height: 40px;
    color: ${common.Color.text};
    letter-spacing: 1px;
    text-align: center;
    //margin: 34px 0  0;
    margin: 34px 0 68px 0;
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

const Menu = styled.div<{ type: string }>`
    display: flex;
    justify-content: space-between;
    height: 36px;
    div {
        padding: 0 12px;
        width: fit-content;
        font-size: 1.0rem;
        line-height: 36px;
        color: ${common.Color.text_w};
        background-color: ${(props) => props.type == 'cancel' ? common.ProductColor.MailGates : common.Color.main};
    }
`
const MenuDict = {
    'new': '新規',
    'modify': '変更',
    'cancel': '解約'
}

export default function App() {
    const type = 'modify'
    return (
        <Background>
            <Main>
                <Menu type={type}>
                    <img src={ isProd ? `${SUB_DIRECTORY}/CyberSolutions.png` : "/CyberSolutions.png" } />
                    <div>{MenuDict[type]}</div>
                </Menu>
                <Title>ニフクラ環境作成フォーム</Title>
                <Contents>
                    {/* <Explanation>
                        下記フォームに必要項目を入力して送信してください。<br />
                        3営業日以内に担当者より折り返しご連絡させていただきます。<br />
                        お急ぎの方はお電話にてお問い合わせください。
                    </Explanation> */}
                    <Form type={type} />
                </Contents>
            </Main>
            <Footer>
                <small>©2023 CyberSolutions Inc</small>
            </Footer>
        </Background>
    );
}