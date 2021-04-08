import React, {FunctionComponent} from "react";
import { NavBar } from "../nav-bar/NavBar";
import {Container} from "@material-ui/core";

export const Layout: FunctionComponent = (props) => {
    const { children } = props;
    return (
        <>
            <NavBar/>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;
