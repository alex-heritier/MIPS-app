import React from "react";

export default class MemoryPanel extends React.Component {
    componentDidMount() {
        for (let i = 0x00; i < 0xFF; i++) {
            this.props.memory[i] = 0;
        }
    }

    render() {
        return (
            <div class="col-lg-12">
                <div class="memory-tabs">
                    <div class="tab">Bank 1</div>
                    <div class="tab">Bank 2</div>
                </div>
                <div class="memory-panel">
                    <p>0x00: 0x00</p>
                </div>
            </div>
        );
    }
}
