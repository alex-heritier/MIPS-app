import React from "react";

import Utility from "../Utility.js";

export default class InternalsPanel extends React.Component {
    render() {
        const registersLeft = [];
        const registersRight = [];
        const { registers } = this.props;
        let counter = 0;
        for (const key in registers) {
            // skip loop if the property is from prototype
            if (!registers.hasOwnProperty(key)) continue;

            let value = registers[key];
            if (counter < 17)
                registersLeft.push(<InternalsRow key={counter} index={key} value={value} />);
            else
                registersRight.push(<InternalsRow key={counter} index={key} value={value} />);
            counter++;
        }

        return (
            <div class="col-lg-12">
                <div class="internals-panel">
                    <div class={"left-registers"}>
                        { registersLeft }
                    </div>
                    <div class="right-registers">
                        { registersRight }
                    </div>
                </div>
            </div>
        );
    }
}

class InternalsRow extends React.Component {
    render() {
        const registerDisplay = { width: "90px" };
        const left = { float: "left" };
        const right = { float: "right" };

        return (
            <div>
                <div style={registerDisplay}>
                    <span style={left}>{this.props.index}: </span>
                    <span style={right}>{Utility.toHex(this.props.value)}</span>
                </div>
                <br />
            </div>
        );
    }
}
