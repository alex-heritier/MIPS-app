import React from "react";

export default class InternalsPanel extends React.Component {
    render() {
        const registerDisplay = { width: "200px" };
        const left = { float: "left" };
        const right = { float: "right" };

        return (
            <div class={"col-md-3"}>
                <div class={"internals-panel"}>
                    <div style={registerDisplay}><span style={left}>$zero: </span><span style={right}>{this.props.registers["$zero"]}</span></div><br />
                    <div style={registerDisplay}><span style={left}>$v0: </span><span style={right}>{this.props.registers["$v0"]}</span></div><br />
                    <div style={registerDisplay}><span style={left}>$v1: </span><span style={right}>{this.props.registers["$v1"]}</span></div><br />
                    <div style={registerDisplay}><span style={left}>$t0: </span><span style={right}>{this.props.registers["$t0"]}</span></div><br />
                    <div style={registerDisplay}><span style={left}>$sp: </span><span style={right}>{this.props.registers["$sp"]}</span></div><br />
                </div>
            </div>
        );
    }
}
