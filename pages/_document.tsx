import Document, { Html, Head, Main, NextScript } from "next/document";
import {Container} from "@material-ui/core";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                </Head>
            <body>
                <Container>
                    <Main/>
                    <NextScript/>
                </Container>
            </body>
            </Html>
        )
    }
}

export default MyDocument;
