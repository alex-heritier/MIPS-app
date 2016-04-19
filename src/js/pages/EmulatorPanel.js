import React from "react";

import Console from "../components/Console";
import Editor from "../components/Editor";
import InternalsPanel from "../components/InternalsPanel";
import Interpreter from "../Interpreter.js";
import MemoryPanel from "../components/MemoryPanel";

import getClearState from "../clearState";

export default class EmulatorPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            registers: {},
            memory: [],
        };
    }

    changeCode(code) {
        const newRegisters = Interpreter.run(code);
        console.log(newRegisters);
        this.setState({registers: newRegisters});
    }

    // called after the component mounts
    componentDidMount() {
        this.setState({registers: getClearState()});
    }

    render() {
        return (
            <div class={"col-lg-12"}>
                <div class={"row"}>
                    <div class="col-lg-9">
                        <div class="row">
                            <Editor changeCode={this.changeCode.bind(this)} />
                        </div>
                        <div class="row">
                            <Console />
                        </div>
                        <div class="row">
                            <MemoryPanel memory={this.state.memory}/>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="row">
                            <InternalsPanel registers={this.state.registers} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
