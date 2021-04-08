import {ThemeProvider} from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from "next/head";
import Layout from "../components/layout/Layout";
import {initStore} from "../store";
import {Provider} from "react-redux";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "../components/error-fallback/ErrorFallback";

const theme = createMuiTheme();
const store = initStore({
    alert: {},
    profile: {}
});


export default function MasheenViewer({ Component, pageProps}) {
    return (
        <Provider store={store}>
            <Head>
                <title>MASHEEN Stats Viewer</title>
                <link rel='icon' href='/images/favicon.ico' />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Component {...pageProps} />
                    </ErrorBoundary>
                </Layout>
            </ThemeProvider>
        </Provider>
    )
}
