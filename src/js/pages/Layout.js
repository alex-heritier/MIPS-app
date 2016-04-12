import React from "react";
import { Link } from "react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Layout extends React.Component {
    render() {
        return (
            <div class={"container"}>
                <Header title={"MIPS emulator"}/>
                <div class={"main-content row"}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
