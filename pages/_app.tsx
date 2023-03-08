import type { AppProps } from 'next/app'
import { Meta } from '../components/pages/Meta'
import '../styles/reset.css';

App.getInitialProps = async () => ({ pageProps: {} })
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
        <Meta />
        <Component {...pageProps} />
        </>
    )
}
