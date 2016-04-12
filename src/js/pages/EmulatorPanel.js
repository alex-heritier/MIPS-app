import React from "react";

import Console from "../components/Console";
import Editor from "../components/Editor";
import InternalsPanel from "../components/InternalsPanel";
import Interpreter from "../Interpreter.js";

export default class EmulatorPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            registers: {},
        };
    }

    changeCode(code) {
        const newRegisters = Interpreter.run(code);
        console.log(newRegisters);
        this.setState({registers: newRegisters});
    }

    // called after the component mounts
    componentDidMount() {
        this.setState({registers: Interpreter.getClearState()});
    }

    render() {
        return (
            <div class={"col-lg-12"}>
                <div class={"row"}>
                    <Editor changeCode={this.changeCode.bind(this)} />
                    <InternalsPanel registers={this.state.registers} />
                </div>
                <div class={"row"}>
                    <Console />
                </div>
            </div>
        );
    }
}
